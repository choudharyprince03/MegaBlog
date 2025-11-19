
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
    <button className='inline-block px-6 py-2 duration-100
    hover:bg-blue-100 rounded-full '
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn