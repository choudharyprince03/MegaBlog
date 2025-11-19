import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path ='/' element= {<Layout />}>
      <Route path='/' element = {<App />} />
      <Route path='/login' element = {<Login />} />
      <Route path='/signup' element = {<SignUp />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
  </StrictMode>
  
)
