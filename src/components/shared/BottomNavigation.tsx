import { bottombarLinks } from '@/constants'
import { useLocation } from 'react-router-dom'
import { Button } from '../ui/button';
import { INavLink } from '@/types';
import { useUserContext } from '@/context/AuthContext';

const BottomNavigation = () => {
    const { pathname } = useLocation();
    const { handleRouteChange } = useUserContext();

    return (
        <section className='bottom-bar'>
            {
                bottombarLinks.map((link: INavLink) => {
                    const isActive = pathname === link.route;
                    return (
                        <Button 
                            className={`${isActive && 'rounded-[10px] bg-primary-500/20'} flex-center flex-col p-3 transition`} 
                            key={`bottombar-${link.label}`} 
                            onClick={() => handleRouteChange(link)}
                        >
                            <img 
                                src={link.imgURL} 
                                alt={link.label} 
                                width={20}
                                height={20}
                                className={`${isActive && 'filled'}`}
                            />
                            {/* <p className='tiny-medium text-medium-2'>{link.label}</p> */}
                        </Button>
                    )
                })
            }
        </section>
    )
}

export default BottomNavigation