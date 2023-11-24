import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOut } from '@/lib/react-query/queries'
import { useUserContext } from '@/context/AuthContext'

const TopNavigation = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOut();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={40}
            height={40}
          />
        </Link>
        {
          isAuthenticated ? (
            <div className="flex gap-4">
              <Button
                variant="ghost"
                className="shad-button_ghost"
                onClick={() => signOut()}>
                <img src="/assets/icons/logout.svg" alt="logout" />
              </Button>
              <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                <img
                  src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  alt="profile"
                  className="h-8 w-8 rounded-full"
                />
              </Link>
            </div>   
          ) : (
            <Link to='/sign-in' className='bg-dark-4 text-primary-500 text-sm px-3 py-2 rounded-md border border-slate-800'>
              Login
            </Link>
          )
        }
      </div>
    </section>
  );
}

export default TopNavigation