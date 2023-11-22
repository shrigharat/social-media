type LikeIconProps = {
    filled: boolean;
    width?: number;
    height?: number;
    onClick?: any;
}

const LikeIcon = ({
    width = 20,
    height = 20,
    filled = false,
    onClick = (_: any) => {}
}: LikeIconProps) => {
    return (
        <svg
            width={width} 
            height={height} 
            stroke={filled ? '' : '#fff'}
            viewBox="0 0 24 24" 
            fill={filled ? '#F14D4D' : 'none'} 
            onClick={onClick}
            className='cursor-pointer'
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="1"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path 
                    d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" 
                    stroke={filled ? '' : '#fff'} 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                </path>
            </g>
        </svg>
    )
}

export default LikeIcon