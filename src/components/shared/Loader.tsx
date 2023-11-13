type LoaderProps = {
  size?: number;
  thickness?: number;
  color?: string;
}

const Loader = ({
  size = 32,
  thickness = 2,
  color = '#fff',
}: LoaderProps) => {
  return (
    <div className='flex-center w-full'>
        <span 
          className='loader' 
          style={{
            width: size, 
            height: size, 
            borderWidth: thickness,
            borderColor: color,
            borderBottomColor: 'transparent'
          }}
        >
        </span>
    </div>
  )
}

export default Loader