import styles from './LazyImage.module.css';

type LazyImageProps = {
    imageUrl: string;
    alt: string;
    height?: number;
    width?: number;
    className?: string;
    wrapperClassName?: string;
    blur?: number;
}

const LazyImage = ({
    imageUrl, 
    className, 
    alt, 
    wrapperClassName
}: LazyImageProps) => {

    let skeletonImageUrl = `${imageUrl}&width=80&height=80`;
    let actualUrl = `${imageUrl}&quality=50`;

    const handleOriginalImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {        
        let skeletonDiv = (e.target as HTMLImageElement).parentNode;
        
        (skeletonDiv as HTMLDivElement).style.backgroundImage = '';
        (skeletonDiv as HTMLDivElement).classList.add(styles.loaded);
    }

    if(!imageUrl) return;

    return (
        <div 
            className={`${styles.imageSkeleton} ${wrapperClassName}`} 
            style={{
                backgroundImage: `url(${skeletonImageUrl})`,
                filter: `blur(${blur+'px' || '10px'})`
            }}
        >
            <img 
                src={actualUrl || "/assets/icons/profile-placeholder.svg"} 
                alt={alt}
                className={className || ''}
                loading='lazy'
                onLoad={handleOriginalImageLoad}
            />
        </div>
    )
}

export default LazyImage