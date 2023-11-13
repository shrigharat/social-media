import EditProfileForm from '@/components/forms/EditProfileForm'
import Loader from '@/components/shared/Loader';
import { useGetCurrentUser } from '@/lib/react-query/queries';

const UpdateProfile = () => {
  const {data: user, isLoading: isUserLoading} = useGetCurrentUser();

  return (
    <div className='flex flex-1'>
      <div className='profile-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img 
            src="/assets/icons/edit.svg" 
            alt="create post icon"
            width={36}
            height={36}  
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>
            Edit Profile
          </h2>
        </div>
        {
          isUserLoading || !user ? (
            <Loader />
          ) : (
            <EditProfileForm user={user} />
          )
        }
      </div>
    </div>
  )
}

export default UpdateProfile