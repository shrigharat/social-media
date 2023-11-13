import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '@/lib/react-query/queries';
import { Models } from 'appwrite'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import LikeIcon from './LikeIcon';
import { checkIsLiked } from '@/lib/utils';
import CommentIcon from './CommentIcon';
import { Input } from '../ui/input';
import EmojiIcon from './EmojiPickerIcon';
import { Button } from '../ui/button';
import { IComment } from '@/types';
import SendIcon from './SendIcon';

type PostStatsProps = {
    post: Models.Document;
    userId: string;
}

const PostStats = ({post, userId}: PostStatsProps) => {
    const location = useLocation();
    const likesList = post.likes.map((user: Models.Document) => user.$id)

    const [likes, setLikes] = useState<string[]>(likesList);
    const [isSaved, setIsSaved] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<IComment[]>([]);

    const {data: currentUser} = useGetCurrentUser();

    const {mutate: likePost} = useLikePost();
    const {mutate: savePost} = useSavePost();
    const {mutate: unSavePost} = useDeleteSavedPost();

    const savedPostRecord = currentUser?.save.find(
        (record: Models.Document) => record.post.$id === post.$id
    )

    useEffect(() => {
        setIsSaved(!!savedPostRecord);
    }, [currentUser])

    const handleLikePost = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
        e.stopPropagation();

        let likesArray = [...likes];

        if(likesArray.includes(userId)) {
            likesArray = likesArray.filter(currentUserId => currentUserId !== userId)
        } else {
            likesArray.push(userId);
        }

        setLikes(likesArray);
        likePost({postId: post.$id, likesArray});
    }

    const handleCommentClick = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
        e.stopPropagation();
        setShowComments((prev) => !prev);
    }

    const handlePostComment = (e: any) => {
        e.stopPropagation();
        if(!commentText) return;
        
        let newComment: IComment = {
            userImage: currentUser?.imageUrl,
            userName: currentUser?.name,
            text: commentText
        };
        let commentsArray: IComment[] = [...comments, newComment];
        setComments(commentsArray);
    }

    const handleSavePost = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
        e.stopPropagation();

        if(savedPostRecord) {
            setIsSaved(false);
            return unSavePost(savedPostRecord.$id);
        }

        savePost({userId, postId: post.$id});
        setIsSaved(true);
    }

    const containerStyles = location.pathname.startsWith('/profile') ? 'w-full' : '';

    return (
        <div className="flex flex-col">
            <div className={`flex justify-between items-center z-20 px-3 pb-5 ${containerStyles} ${showComments ? 'pb-3' : 'pb-5'}`}>
                <div className="flex items-center gap-2 mr-5">
                    <LikeIcon 
                        width={24}
                        height={24}
                        filled={checkIsLiked(likes, userId)}
                        onClick={handleLikePost}
                    />
                    <p className="small-medium lg:base-medium mr-2">
                        {likes.length}
                    </p>
                    <CommentIcon
                        width={32}
                        height={28}
                        onClick={handleCommentClick}
                    />
                </div>
                <div className="flex gap-2">
                    <img
                        src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                        alt="share"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={(e) => handleSavePost(e)}
                    />
                </div>
            </div>

            {/* comments section */}
            {
                showComments && (
                    <div className="comments-input-section px-3 pt-3 pb-5 flex flex-row gap-3 items-center border-t border-t-gray-800">
                        <div>
                            <img 
                                width={32}
                                height={32}
                                src={currentUser?.imageUrl} 
                                alt="" 
                                className='rounded-full'
                            />
                        </div>
                        <Input 
                            className='comments-input' 
                            placeholder='Post your comments ...'
                            height={24}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <SendIcon
                            width={28}
                            height={28}
                            onClick={handlePostComment}
                        />
                    </div>
                )
            }

            {
                comments.length > 0 && (
                    <div className="comments-section px-3 pb-5 flex-col gap-3 items-start">
                        {
                            comments.map((comment) => (
                                <div className='comment flex justify-left items-center gap-3'>
                                    <img 
                                        width={24}
                                        height={24}
                                        src={comment.userImage} 
                                        alt="" 
                                        className='inline rounded-full'
                                    />
                                    <span className='font-semibold text-sm tracking-tight'>{comment.userName}</span>
                                    <p className='font-light text-sm tracking-tight'>{comment.text}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default PostStats