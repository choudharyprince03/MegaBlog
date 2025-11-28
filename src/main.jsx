import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AuthLayout} from './components/index.js'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import EditPosts from './pages/EditPosts.jsx'
import AddPosts from './pages/AddPosts.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Post from "./pages/Post.jsx"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  element={<App />}>
      <Route path='/' element = {<Home />} />
      <Route path='/login' element = {<AuthLayout authentication={false}>  <Login /> </AuthLayout>} />
      <Route path='/signup' element = { <AuthLayout requiredAuth={false}> <SignUp /> </AuthLayout>} />
      <Route path= "/all-posts" element = { <AuthLayout authentication>{" "} <AllPosts /> </AuthLayout>} />
      <Route path='/add-post' element = { <AuthLayout authentication> {" "} <AddPosts /> </AuthLayout>} />
      <Route path='/edit-post/:slug' element = {<AuthLayout authentication>{" "} <EditPosts /> </AuthLayout>} />
      <Route  path= "/post/:slug" element= {<Post/>} />
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
