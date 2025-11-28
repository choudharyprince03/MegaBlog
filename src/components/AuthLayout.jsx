import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"


const Protected = ({children,requiredAuth = true}) => {
    const [loader, setLoader] = useState(true); 
    const navigate = useNavigate(); 
    const isLoggedIn = useSelector(state => state.auth.status)
    
    useEffect(()=>{
       if(requiredAuth && !isLoggedIn) navigate('/login'); 

       else if(!requiredAuth&& isLoggedIn) navigate('/'); 
    
       setLoader(false); 
    },[requiredAuth, isLoggedIn, navigate]); 


  return loader? 
   <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
         <p className="text-lg font-medium text-gray-700">Loading...</p>
    </div>
  : 
  <>
  {children}
  </> 
}

export default Protected
