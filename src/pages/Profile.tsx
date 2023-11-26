import LazyImage from "@/components/shared/LazyImage";
import Loader from "@/components/shared/Loader";
import PostsGrid from "@/components/shared/PostsGrid";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useFollowUser, useGetFollowers, useGetUserById, useGetUserPosts, useUnFollowUser } from "@/lib/react-query/queries";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom"

const Profile = () => {

  const {id: currentProfileId} = useParams();
  const [searchParams]  = useSearchParams();
  const {user: currentUser, setShowLoginDialog, isAuthenticated} = useUserContext();
  const {data: user, isLoading: isUserLoading} = useGetUserById(currentProfileId);
  const {data: userPosts, isLoading: postsLoading} = useGetUserPosts(currentProfileId);
  const {mutateAsync: followUser, isPending: isFollowPending} = useFollowUser();
  const {mutateAsync: unFollowUser, isPending: isUnFollowPending} = useUnFollowUser();
  const {data: followers} = useGetFollowers(currentProfileId);
  const [isAlreadyFollowing, setIsAlreadyFollowing] = useState<boolean>(false);

  console.log({followers, isAlreadyFollowing});
  console.log({searchParams});
  
  const handleFollowButton = (e: any) => {
    e.stopPropagation();
    if(!currentProfileId) return;

    if(isAuthenticated) {
      followUser({
        followerId: currentUser.id,
        followingId: currentProfileId,
        followerUsername: currentUser.username,
        ref: searchParams.get('ref') || '',
        refId: searchParams.get('refId') || '',
      });
      setIsAlreadyFollowing(true);
    } else {
      setShowLoginDialog(true);
    }
  }

  const handleUnfollowButton = (e: any) => {
    e.stopPropagation();
    if(!currentProfileId) return;

    if(isAuthenticated) {
      unFollowUser({
        followerId: currentUser.id,
        followingId: currentProfileId,
        followerUsername: currentUser.username,
      });
      setIsAlreadyFollowing(false);
    } else {
      setShowLoginDialog(true);
    }
  }

  useEffect(() => {
    let alreadyFollowing = followers?.some && followers.some(
      (followerDoc: Models.Document) => followerDoc.follower === currentUser.id
    ) || false;
    setIsAlreadyFollowing(alreadyFollowing);
  }, [followers])

  if(isUserLoading) {
    return (
      <Loader />
    )
  } else if(!isUserLoading && !user) {
    return (
      <h3>Could not load user profile. Please refresh the page.</h3>
    )
  }

  return (
    <div className="profile-container">
      <div className="account-details flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:mr-12 relative overflow-hidden rounded-full">
          <LazyImage 
            imageUrl={user?.imageUrl || '/assets/icons/profile-placeholder.svg'} 
            alt="user profile image" 
            className="rounded-full w-[150px] h-[150px]"
            blur={6}
          />
        </div>

        <div className="flex flex-col gap-8 items-center md:items-start">
          <div className="top-section flex flex-col md:flex-row gap-4 md:gap-12">
            <div className="name-section flex flex-col items-center md:items-start">
              <h1 className="text-3xl">{user?.name}</h1>
              <p className="text-[16px] font-semibold text-light-3">@{user?.username}</p>
            </div>
            <div className="action-buttons flex gap-4 justify-center md:justify-start">
              {
                isAlreadyFollowing ? (
                  <Button className="bg-primary-500/20 text-primary-500 border border-primary-500" onClick={handleUnfollowButton}>
                    { isUnFollowPending ? <Loader size={16} /> : 'Following'}
                  </Button>
                ) : (
                  <Button className="shad-button_primary" onClick={handleFollowButton}>
                    {  isFollowPending ? <Loader size={16} /> : 'Follow' }
                  </Button>
                )
              }
              {
                currentProfileId === currentUser.id && (
                  <Link to='/update-profile'>
                    <Button className="border-slate-300 border-2">
                      Edit profile
                    </Button>
                  </Link>
                )
              }
            </div>
          </div>

          <div className="follower-info flex gap-8 justify-start items-center">
            <div className="followers">
              <span className="mr-2 font-medium text-primary-500">{ postsLoading ? '' : userPosts?.length  }</span>
              <span>posts</span>
            </div>
            <div className="posts">
              <span className="mr-2 font-medium text-primary-500">1.1k</span>
              <span>followers</span>
            </div>
          </div>

          <div className="bio">
            { user?.bio.split('\n').map((str: string) => {
              return (
                <>
                  <div className="text-sm">{str}</div>
                </>
              )
            }) || '' }
          </div>
        </div>
      </div>

      <div className="posts-grid">
        {
          postsLoading ? (
            <Loader />
          ) : !postsLoading && userPosts && (
            <PostsGrid 
              posts={userPosts} 
              showStats={false}
              showUser={false}
            />
          )
        }
        {
          !postsLoading && userPosts && !userPosts?.length && (
            <div className="flex flex-col items-center justify-center">
                <div className="text-2xl text-slate-500 font-semibold">
                    <img 
                        src="/assets/icons/camera.svg" 
                        alt="no posts icon" 
                        width={32}
                        height={32}
                    />
                </div>
                <div>No posts yet</div>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default Profile