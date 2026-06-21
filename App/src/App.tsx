import React from 'react'
import MainNavigation from './navigation/MainNavigation.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.tsx'
import { ToastContainer } from 'react-toastify'
import { ContextProvider } from './context/authContext.tsx'

const App = () => {
  return (
    <>
      <ContextProvider>
        <Provider store={store}>
          <MainNavigation />
          <ToastContainer />

        </Provider>
      </ContextProvider>
    </>
  )
}

export default App
