type ShareIconProps = {
    width?: number;
    height?: number;
    onClick?: any;
}

const ShareIcon = ({
    width = 17,
    height = 20,
    onClick = (_: any) => {}
}: ShareIconProps) => {
    return (
        <svg
            width={width} 
            height={height} 
            stroke={'#fff'}
            viewBox="0 0 17 20"
            fill={'none'} 
            onClick={onClick}
            className='cursor-pointer'
        >
            <path d="M6 9.5C6 10.8807 4.88071 12 3.5 12C2.11929 12 1 10.8807 1 9.5C1 8.1193 2.11929 7 3.5 7C4.88071 7 6 8.1193 6 9.5Z" stroke="white" strokeWidth="1.5"/>
            <path d="M11.3206 14.8017L6 11.29" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M11.4202 4.83984L6.09961 8.3515" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M16 16.5C16 17.8807 14.8807 19 13.5 19C12.1193 19 11 17.8807 11 16.5C11 15.1193 12.1193 14 13.5 14C14.8807 14 16 15.1193 16 16.5Z" stroke="white" strokeWidth="1.5"/>
            <path d="M16 3.5C16 4.88071 14.8807 6 13.5 6C12.1193 6 11 4.88071 11 3.5C11 2.11929 12.1193 1 13.5 1C14.8807 1 16 2.11929 16 3.5Z" stroke="white" strokeWidth="1.5"/>
        </svg>
    )
}

export default ShareIcon;