import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import UserCard from '@/components/shared/UserCard';
import { useGetRecentPosts, useGetUsers } from '@/lib/react-query/queries'
import { Models } from 'appwrite'
import React from 'react'

const HomePage = () => {
  
  const {data: posts, isLoading, isError} = useGetRecentPosts();
  const {data: creators, isLoading: isCreatorsLoading} = useGetUsers();

  return (
    <div className='flex flex-1'>
      <div className="home-container">
        <div className="home-posts">
          <h2 className='h3-bold md:h2-bold text-left w-full'>
            Home Feed
            {
              isLoading && !posts ? (
                <div className='w-full mt-4'>
                  <Loader />
                </div>
              ) : (
                <ul className='flex flex-col flex-1 gap-9 w-full mt-4'>
                  {
                    posts?.documents?.map((post: Models.Document) => (
                      <PostCard key={post.$id} post={post} />
                    ))
                  }
                </ul>
              )
            }
          </h2>
        </div>
      </div>
      <div className="home-creators">
        <h3 className="h3-bold text-light-1">
          Top Creators
        </h3>
        {
          isCreatorsLoading && !creators ? (
            <Loader />
          ) : (
            <ul className='grid 2xl:grid-cols-2 gap-3'>
              {
                creators?.documents.map((creator: Models.Document) => (
                  <li key={creator?.$id}>
                    <UserCard user={creator} />
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
    </div>
  )
}

export default HomePage