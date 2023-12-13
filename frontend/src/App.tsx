import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './Components/Home';
import { Layout } from './Components/Layout';
import { Register } from './Components/Register';
import { Login } from './Components/Login';
import { Profile } from './Components/Profile';
import { NotFound } from './Components/NotFound';
import { SendMessage } from './Components/SendMessage'
import { useContext, useEffect } from 'react';
import { tokenContext } from './Context/tokenContext';
import { ProtectedRoutes } from './Components/ProtectedRoutes';

function App() {

  const { setToken } = useContext(tokenContext)

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken")!)
    }
  }, [setToken])

  const routes = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "profile", element: <ProtectedRoutes><Profile /></ProtectedRoutes> },
        { path: "message", element: <ProtectedRoutes><SendMessage /></ProtectedRoutes> }, { path: "*", element: <NotFound /> }
      ]
    }, { path: "message/:userID", element: <SendMessage /> }
  ])

  return (
    <RouterProvider router={routes}></RouterProvider>
  );
}

export default App;
