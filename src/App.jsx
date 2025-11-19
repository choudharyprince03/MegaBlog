import { useState,useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth';
import { login,logout } from './features/authSlice';
import { Outlet } from 'react-router-dom';


function App() {
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
             <Outlet /> 
        </div>
    </div>
  )        :
  (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
  <div className="h-12 w-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
  <p className="text-lg font-medium text-gray-700">Loading...</p>
</div>

  ); 
}

export default App
