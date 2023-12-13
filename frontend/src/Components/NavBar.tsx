import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo300.png'
import { tokenContext } from '../Context/tokenContext'

export const NavBar = () => {
  let { token, setToken } = useContext(tokenContext)
  let navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("userToken")
    setToken('')
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg bg-custom navbar-dark bg-dark">
      <div className="container">

        {
          token ?
            <img src={logo} width={54} alt="logo" />
            :
            <Link to={''} className="navbar-brand">
              <img src={logo} width={54} alt="logo" />
            </Link>
        }
        <button className="navbar-toggler"
          type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          Menu <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={'/message'} className="nav-link" >Send Message</Link>
            </li>
            {token ?
              <>
                <li className="nav-item">
                  <Link to={'/profile'} className="nav-link" >Profile</Link>
                </li><button className='nav-link' onClick={logout}>Logout</button></> : <><li className="nav-item">
                  <Link to={'/register'} className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link" >Login</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>

  )
}
