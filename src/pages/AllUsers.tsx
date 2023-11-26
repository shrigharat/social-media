import LazyImage from "@/components/shared/LazyImage"
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button"
import { useGetUsers } from "@/lib/react-query/queries";
import { Link } from "react-router-dom"

const AllUsers = () => {
  const {data: allUsers, isLoading} = useGetUsers();

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img 
            src="/assets/icons/people.svg" 
            alt="create post icon"
            width={36}
            height={36}  
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>
            People
          </h2>
        </div>

        {/* card-grid */}
        {
          isLoading && !allUsers?.documents?.length ? (
            <div className="w-full h-20 flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <ul className="grid-container">
              {
                allUsers?.documents.map((user: any) => {
                  return (
                    <div className="flex flex-col p-4 justify-start items-center gap-4 bg-dark-3 border border-slate-800 rounded-md" key={user.$id}>
                      <LazyImage
                        imageUrl={user.imageUrl}
                        alt={`${user.name}'s profile picture`}
                        className="rounded-full w-20 h-20"
                      />
                      <Link to={`/profile/${user.$id}?ref=explore`} className="text-center">
                        <p className="text-lg font-semibold">{user.name}</p>
                        <p className="text-sm font-medium text-gray-400">@{user.username}</p>
                      </Link>
                      <div className="flex flex-row gap-4">
                        <Link to={`/profile/${user.$id}?ref=explore`} className="px-4 py-2 text-sm rounded-md border border-slate-700  text-primary-500">
                          View Profile
                        </Link>
                        <Button className="border border-primary-500 bg-primary-500/20 text-primary-500">
                          Follow
                          <img className="ml-2" src="/assets/icons/follow.svg" width={16} height={16} alt="" />
                        </Button>
                      </div>
                    </div>
                  )
                })
              }
            </ul>
          )
        }
      </div>
    </div>
  )
}

export default AllUsers