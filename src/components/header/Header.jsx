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
<header className="py-4 bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm top-0 z-50">
  <Container>
    <nav className="flex items-center">

      {/* Logo */}
      <div className="mr-8 cursor-pointer">
        <Link to="/">
          <Logo width="70px" />
        </Link>
      </div>

      {/* Navigation Items */}
      <ul className="flex ml-auto items-center space-x-1 sm:space-x-2">

        {navItems.map((item) =>
          item.active ? (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.slug)}
                className="
                  relative px-5 py-2 text-sm font-medium text-gray-700
                  transition-all duration-200 rounded-full
                  hover:text-blue-600
                  hover:bg-blue-50
                "
              >
                {item.name}

                {/* Animated Underline */}
                <span className="
                  absolute bottom-0 left-1/2 -translate-x-1/2 w-0
                  h-2px bg-blue-600 rounded-full
                  transition-all duration-300 group-hover:w-4/5
                "></span>
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