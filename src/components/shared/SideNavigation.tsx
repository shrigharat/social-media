import { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useSignOut } from '@/lib/react-query/queries';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';

const SideNavigation = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {mutate: signOut, isSuccess} = useSignOut();
  const {user} = useUserContext();
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
            width={130}
            height={325}
          />
        </Link>
        <Link to={`/profile/${userId}`} className='flex-start gap-3'>
          <img 
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} 
            alt="profile picture" 
            width={32}
            height={32}
            className='rounded-full'
          />
          <div className='flex flex-col'>
            <p className='body-bold'>{user.name || "Anonymous User"}</p>
            <p className='small-regular text-light-3'>@{user.username || "anonymous"}</p>
          </div>
        </Link>

        <ul className='flex flex-col gap-3'>
          {
            sidebarLinks.map((link: INavLink) => {
              const isActive = pathname === link.route;

              return (
                <li className={`leftsidebar-link ${isActive && 'bg-primary-500/10 text-primary-500'}`} key={link.label}> 
                  <NavLink to={link.route} className="flex gap-2 items-center px-4 py-3">
                    <img 
                      src={link.imgURL} 
                      alt={`${link.label} icon`} 
                      className={`group-hover:invert-white`}
                    />
                    {link.label}
                  </NavLink>
                </li>
              )
            })
          }
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
      </Button>
    </nav>
  )
}

export default SideNavigation