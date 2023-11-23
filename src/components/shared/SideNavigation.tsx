import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useSignOut } from '@/lib/react-query/queries';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import LazyImage from './LazyImage';
import { LoginDialog } from './LoginDialog';

const SideNavigation = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {mutate: signOut, isSuccess} = useSignOut();
  const {user, isAuthenticated, handleRouteChange, showLoginDialog} = useUserContext();
  const userId = user.id;

  useEffect(() => {
    if(isSuccess) {
      navigate('/sign-in');
    }
  }, [isSuccess])

  return (
    <nav className='leftsidebar'>
      <div className="flex flex-col gap-11">
        <Link to='/' className='flex gap-3 items-center'>
          <img 
            src="/assets/images/logo.svg" 
            alt="website logo" 
            width={40}
            height={40}
          />
          <h2 className='text-xl font-bold'>Media Social</h2>
        </Link>
        {
          isAuthenticated ? (
            <Link to={`/profile/${userId}`} className='flex-start gap-3 relative overflow-hidden'>
              <>
                <LazyImage 
                  imageUrl={user.imageUrl || '/assets/icons/profile-placeholder.svg'} 
                  alt='profile picture'
                  className='rounded-full w-[32px] h-[32px]'
                />
                <div className='flex flex-col'>
                  <p className='text-sm font-bold'>{user.name || "Anonymous User"}</p>
                  <p className='small-regular text-light-3'>@{user.username || "anonymous"}</p>
                </div>
              </>
            </Link>
          ) : (
            <Link to='/sign-in' className='w-full border border-primary-500 bg-primary-500/10 mb-8 text-center text-primary-500 font-semibold rounded-md p-2'>
              Login
            </Link>
          )
        }

        <ul className='flex flex-col gap-3'>
          {
            sidebarLinks.map((link: INavLink) => {
              const isActive = pathname === link.route;

              return (
                <li onClick={() => handleRouteChange(link)} className={`leftsidebar-link cursor-pointer ${isActive && 'bg-primary-500/10 text-primary-500'}`} key={link.label}> 
                  <Button className="flex gap-2 items-center px-4 py-6">
                    <img 
                      src={link.imgURL} 
                      alt={`${link.label} icon`} 
                      className={`group-hover:invert-white`}
                    />
                    {link.label}
                  </Button>
                </li>
              )
            })
          }
        </ul>
      </div>

      {
        isAuthenticated && (
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" /> Logout
          </Button>
        )
      }

      {
        showLoginDialog && (
          <LoginDialog />
        )
      }
    </nav>
  )
}

export default SideNavigation