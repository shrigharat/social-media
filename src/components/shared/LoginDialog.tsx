import { useUserContext } from '@/context/AuthContext';
import Modal from 'react-modal';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    borderRadius: '8px',
    border: 'none'
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export function LoginDialog() {
    const {showLoginDialog, setShowLoginDialog} = useUserContext();
    const navigate = useNavigate();

    return (
        <Modal
            isOpen={showLoginDialog}
            style={customStyles}
            contentLabel="Login Modal"
        >
            <div className='bg-dark-3 p-4 w-[300px] lg:w-[400px] h-[250px] flex flex-col gap-4 justify-center rounded-md border-2 border-dark-4'>
                <h2 className='h3-bold text-gray-50 text-center'>Sign in to continue</h2>
                <p className='text-center mt-2 text-gray-100'>In order to complete this action you must login to your account</p>
                <div className='flex gap-8 justify-center items-center'>
                    <Button 
                        className='bg-dark-4 px-8' 
                        onClick={() => setShowLoginDialog(false)}
                    >
                        Close
                    </Button>
                    <Button 
                        className='bg-white text-dark-3 px-8' 
                        onClick={() => {
                            setShowLoginDialog(false);
                            navigate('/sign-in');
                        }}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
