import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import PostsGrid from "@/components/shared/PostsGrid";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useGetCurrentUser, useGetSavedPosts } from "@/lib/react-query/queries"
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom"

const Saved = () => {

  const navigate = useNavigate();
  const {toast} = useToast();
  const {data: currentUser, isLoading} = useGetCurrentUser();

  if(!currentUser) {
    return 'No posts';
  }

  let savedPosts = currentUser.save.map((document: Models.Document) => document.post);
  
  return (
    <div className="saved-container">
      <div className="saved-posts">
          <h2 className='h3-bold md:h2-bold text-left w-full'>
            Saved Posts
          </h2>
            {
              isLoading && !savedPosts?.length ? (
                <div className='w-full mt-4'>
                  <Loader />
                </div>
              ) : (
                <PostsGrid 
                  posts={savedPosts} 
                  showStats={false}
                  showUser={false}
                />
              )
            }
        </div>
    </div>
  )
}

export default Saved