import { useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { tokenContext } from '../Context/tokenContext'

export const Home = () => {

  const { token } = useContext(tokenContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/profile')
    }
  }, [token, navigate])

  return (
    <div className="container text-center my-5">
      <h4>Sara7a allows you to receive constructive feedback from your friends and co-workers</h4>
      <div className="buttons d-flex justify-content-center align-items-center  flex-column">
        <Link to={'/login'} className="btn btn-default-outline my-4"><i className="fas fa-user" /> Login</Link>
        <Link to={'/register'} className="btn btn-default-outline"><i className="far fa-edit" /> Register</Link>
      </div>
    </div>
  )
}
