import { Navigate } from 'react-router-dom'

export const ProtectedRoutes = ({ children }: { children: any }) => {

  if (localStorage.getItem("userToken")) {
    return children

  } else {
    return <Navigate to={"/login"} />
  }
}
