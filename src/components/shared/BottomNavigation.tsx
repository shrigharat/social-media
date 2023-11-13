import { bottombarLinks } from '@/constants'
import { Link, useLocation } from 'react-router-dom'

const BottomNavigation = () => {
    const { pathname } = useLocation();

    return (
        <section className='bottom-bar'>
            {
                bottombarLinks.map((link) => {
                    const isActive = pathname === link.route;
                    return (
                        <Link 
                            className={`${isActive && 'rounded-[10px] bg-primary-500'} flex-center flex-col p-2 transition`} 
                            key={`bottombar-${link.label}`} 
                            to={link.route}
                        >
                            <img 
                                src={link.imgURL} 
                                alt={link.label} 
                                width={16}
                                height={16}
                                className={`${isActive && 'invert-white'}`}
                            />
                            <p className='tiny-medium text-medium-2'>{link.label}</p>
                        </Link>
                    )
                })
            }
        </section>
    )
}

export default BottomNavigation