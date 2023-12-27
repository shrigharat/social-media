import './globals.css';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './auth/AuthLayout';
import SignInForm from './auth/forms/SignInForm';
import SignUpForm from './auth/forms/SignUpForm';
import RootLayout from './root/RootLayout';
import { Toaster } from './components/ui/toaster';
import Modal from 'react-modal';
import { Suspense, lazy } from 'react';

Modal.setAppElement('#root');

const AllUsers = lazy(() => import('./pages/AllUsers'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const EditPost = lazy(() => import('./pages/EditPost'));
const Explore = lazy(() => import('./pages/Explore'));
const HomePage = lazy(() => import('./pages/HomePage'));
const PostDetails = lazy(() => import('./pages/PostDetails'));
const Profile = lazy(() => import('./pages/Profile'));
const Saved = lazy(() => import('./pages/Saved'));
const UpdateProfile = lazy(() => import('./pages/UpdateProfile'));
const Notifications = lazy(() => import('./pages/Notifications'));

const App = () => {

  return (
    <main className='flex h-screen'>
        <Routes>
            
            {/* private routes */}
            <Route element={<RootLayout />}>
                <Route index element={
                  <Suspense>
                    <HomePage />
                  </Suspense>
                } />
                <Route path="/explore" element={
                    <Suspense>
                      <Explore />
                    </Suspense>
                  } 
                />
                <Route path="/saved" element={
                  <Suspense>
                    <Saved />
                  </Suspense>
                } />
                <Route path="/all-users" element={
                  <Suspense>
                    <AllUsers />
                  </Suspense>
                } />
                <Route path="/create-post" element={
                  <Suspense>
                    <CreatePost />
                  </Suspense>
                } />
                <Route path="/update-post/:id" element={
                  <Suspense>
                    <EditPost />
                  </Suspense>
                } />
                <Route path="/posts/:id" element={
                  <Suspense>
                    <PostDetails />
                  </Suspense>
                } />
                <Route path="/profile/:id/*" element={
                  <Suspense>
                    <Profile />
                  </Suspense>
                } />
                <Route path="/update-profile/" element={
                  <Suspense>
                    <UpdateProfile />
                  </Suspense>
                } />
                <Route path="/notifications/" element={
                  <Suspense>
                    <Notifications />
                  </Suspense>
                } />
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