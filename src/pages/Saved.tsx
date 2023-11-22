import Loader from "@/components/shared/Loader";
import PostsGrid from "@/components/shared/PostsGrid";
import SaveIcon from "@/components/shared/SaveIcon";
import { useGetCurrentUser} from "@/lib/react-query/queries"
import { Models } from "appwrite";

const Saved = () => {
  const {data: currentUser, isLoading} = useGetCurrentUser();

  let savedPosts = currentUser?.save.map((document: Models.Document) => document.post) || [];
  
  return (
    <div className="saved-container">
      <div className="saved-posts">
          <h2 className='h3-bold md:h2-bold text-left w-full'>
            Saved Posts
          </h2>
            {
              isLoading ?  (
                <div className='w-full mt-4'>
                  <Loader />
                </div>
              ) : savedPosts?.length ? (
                <PostsGrid 
                  posts={savedPosts} 
                  showStats={false}
                  showUser={false}
                />
              ) : (
                <div className="w-full h-60 flex flex-col justify-center items-center gap-6">
                  <SaveIcon 
                    width={64}
                    height={64}
                    color="#424242"
                    filled={false}
                  />
                  <p>No saved posts</p>
                </div>
              )
            }
        </div>
    </div>
  )
}

export default Saved