import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite"
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import LazyImage from "./LazyImage";

type PostsGridProps = {
    posts: Models.Document[];
    showUser?: boolean;
    showStats?: boolean;
}

const PostsGrid = ({
    posts,
    showUser = true,
    showStats = true,
}: PostsGridProps) => {
    const {user} = useUserContext();

    return (
        <ul className="grid-container">
            {
                posts?.map((post: Models.Document) => (
                    <li className="relative min-w-80 h-80" key={post.$id}>
                        <Link to={`/posts/${post.$id}`} className="grid-post_link">
                            <LazyImage 
                                imageUrl={post.imageUrl}
                                alt="post image" 
                                className="h-full w-full object-cover"
                            />
                        </Link>

                        <div className={showStats || showUser ? `grid-post_user` : ''}>
                            {
                                showUser && (
                                    <div className="flex items-center justify-start gap-2 flex-1">
                                        <img 
                                            src={post.creator.imageUrl || 
                                                "/assets/icons/profile-placeholder.svg"
                                            } 
                                            alt="profile picture" 
                                            className="w-8 h-8 rounded-full" 
                                        />
                                        <p className="line-clamp-1">
                                            {post.creator.name}
                                        </p>
                                    </div>
                                )
                            }

                            {
                                showStats && (
                                    <PostStats 
                                        post={post} 
                                        userId={user.id}
                                    />
                                )
                            }
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default PostsGrid