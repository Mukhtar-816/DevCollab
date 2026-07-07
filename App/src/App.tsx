import { useEffect } from 'react'
import MainNavigation from './navigation/MainNavigation.tsx'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { initAuth } from './redux/slices/authSlice/auth.actions.tsx'

const App = () => {
  const dispatch = useDispatch();

  //init App
  useEffect(() => {
    dispatch(initAuth() as any);
  }, []);

  return (
    <>
      <MainNavigation />
      <ToastContainer />
    </>
  )
}

export default App
