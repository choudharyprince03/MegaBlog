import {Container,LogoutBtn,Logo} from "../index"
import { Link,useNavigate } from "react-router-dom"

//useSelector for the information, if the user is logged in or not. 
import { useSelector } from "react-redux"
const Header = () => {
  const authStatus = useSelector((state)=>state.auth.status); 
  const navigate = useNavigate(); 
  const navItems = [ 
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  }

  ]

  return (
<header className="py-4 bg-white/10 mt-5 mx-10 rounded-[2.5rem] shadow-sm border border-gray-100 top-0 z-50">
  <Container>
    <nav className="flex items-center justify-between text-gray-800 font-bold">  

      {/* Logo */}
      <div className="mr-8 cursor-pointer">
        <Link to="/">
          <Logo width="150px"/>
        </Link>
      </div>

      {/* Navigation Items */}
      <ul className="flex items-center mr-10 ">

        {navItems.map((item) =>
          item.active ? (
            <li key={item.name}>
              <button
                  onClick={() => navigate(item.slug)}
                  className="
                    relative px-5 py-2 text-lg font-semibold font-stretch-125% text-gray-800/80
                    transition-all duration-200 rounded-full
                    hover:text-xl
                    hover:text-black cursor-pointer
                  "
                >
                {item.name}
              </button>
            </li>
          ) : null
        )}

        {/* Logout Button */}
        {authStatus && (
          <li>
            <LogoutBtn />
          </li>
        )}
      </ul>
    </nav>
  </Container>
</header>


  )
}

export default Header