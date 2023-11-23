import LazyImage from "@/components/shared/LazyImage";
import Loader from "@/components/shared/Loader";
import PostsGrid from "@/components/shared/PostsGrid";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useGetUserPosts } from "@/lib/react-query/queries";
import { Link, useParams } from "react-router-dom"

const Profile = () => {

  const {id} = useParams();
  const {user: currentUser, setShowLoginDialog} = useUserContext();
  const {data: user, isLoading: isUserLoading} = useGetUserById(id);
  const {data: userPosts, isLoading: postsLoading} = useGetUserPosts(id);

  const handleFollowButton = (e: any) => {
    e.stopPropagation();
    setShowLoginDialog(true);
  }

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
      <div className="account-details flex flex-col md:flex-row justify-start items-start gap-8">
        <div className="mr-12 relative overflow-hidden rounded-full">
          <LazyImage 
            imageUrl={user?.imageUrl || '/assets/icons/profile-placeholder.svg'} 
            alt="user profile image" 
            className="rounded-full w-[150px] h-[150px]"
            blur={6}
          />
        </div>

        <div className="flex flex-col gap-8">
          <div className="top-section flex flex-col md:flex-row gap-4 md:gap-12">
            <div className="name-section flex-col">
              <h1 className="text-3xl">{user?.name}</h1>
              <p className="subtle-semibold lg:small-regular text-light-3">@{user?.username}</p>
            </div>
            <div className="action-buttons flex gap-4">
              <Button className="shad-button_primary" onClick={handleFollowButton}>
                Follow
              </Button>
              {
                id === currentUser.id && (
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
              <span className="mr-2 font-medium text-primary-500">123</span>
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