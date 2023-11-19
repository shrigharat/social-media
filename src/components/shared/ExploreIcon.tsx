type ExploreIconProps = {
    filled: boolean;
    width?: number;
    height?: number;
    onClick?: any;
}

const ExploreIcon = ({
    width = 20,
    height = 20,
    filled = false,
    onClick = (_: any) => {}
}: ExploreIconProps) => {
    return (
        <svg
            width={width} 
            height={height} 
            stroke={filled ? '' : '#fff'}
            viewBox="0 0 32 32" 
            fill={filled ? '#F14D4D' : 'none'} 
            onClick={onClick}
            className='cursor-pointer'
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <defs> 
                    <style> .cls-1 { fill: none; } </style> 
                </defs> 
                <path d="M22.707,9.2931a.9992.9992,0,0,0-1.0234-.2417l-9,3a1.001,1.001,0,0,0-.6323.6323l-3,9a1,1,0,0,0,1.2651,1.2651l9-3a1.0013,1.0013,0,0,0,.6323-.6324l3-9A1,1,0,0,0,22.707,9.2931ZM11.5811,20.419l2.2094-6.6284L18.21,18.21Z"></path> 
                <path d="M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z"></path> 
                <rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" class="cls-1" width="32" height="32"></rect> 
            </g>
        </svg>
    )
}

export default ExploreIcon;