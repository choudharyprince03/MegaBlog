
import { useDispatch } from 'react-redux'
import authService, { AuthService } from '../../appwrite/auth'
import { logout } from '../../features/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const logoutHandler =()=>{
        //logout is a promise provided by the auth.js, appwrite, which returns the logout. 
        authService.logout().then(()=>{
            //agar logout succesfully hogya toh ye dispatch hojayega taaki store ko pata chl jye 
            dispatch(logout()); 
        })
        .catch((error)=>{
            console.log("this is error :: logout",error); 
        })
    }
  return (
    <button className='relative px-5 py-2 text-lg font-semibold font-stretch-125% text-gray-800/80
                    transition-all duration-200 rounded-full
                    hover:text-xl
                    hover:text-black cursor-pointer
    '
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn