import './globals.css';
import { Route, Routes } from 'react-router-dom';
import { AllUsers, CreatePost, EditPost, Explore, HomePage, PostDetails, Profile, Saved } from './pages';
import AuthLayout from './auth/AuthLayout';
import SignInForm from './auth/forms/SignInForm';
import SignUpForm from './auth/forms/SignUpForm';
import RootLayout from './root/RootLayout';
import { Toaster } from './components/ui/toaster';
import UpdateProfile from './pages/UpdateProfile';
import Notifications from './pages/Notifications';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const App = () => {

  return (
    <main className='flex h-screen'>
        <Routes>
            
            {/* private routes */}
            <Route element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/all-users" element={<AllUsers />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/update-post/:id" element={<EditPost />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/profile/:id/*" element={<Profile />} />
                <Route path="/update-profile/" element={<UpdateProfile />} />
                <Route path="/notifications/" element={<Notifications />} />
            </Route>

            {/* public Routes */}
            <Route element={<AuthLayout />}>
                <Route path='/sign-in' element ={<SignInForm />} />
                <Route path='/sign-up' element={<SignUpForm />} />
            </Route>

        </Routes>
        <Toaster />
    </main>
  )
}

export default App