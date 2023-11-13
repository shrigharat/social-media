import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = false;


  return (
    <>
      {
        isAuthenticated ? (
          <Navigate to='/' />
        ) : (
          <>
            <section className='flex flex-1 justify-center items-center flex-col py-10'>
              <Outlet />
            </section>
            <img 
              src='/assets/images/side-img.png'
              alt='sign-up banner image'
              className='hidden xl:block h-screen w-1/2 object-cover ng-no-repeat'
            />
          </>
        )
      }
    </>
  )
}

export default AuthLayout