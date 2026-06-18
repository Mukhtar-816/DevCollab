import React from 'react'
import MainNavigation from './navigation/MainNavigation.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.tsx'

const App = () => {
  return (
    <>
   <Provider store={store}>
     <MainNavigation/>
   </Provider>
    </>
  )
}

export default App
