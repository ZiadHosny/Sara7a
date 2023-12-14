import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik"
import axios from 'axios'
import { tokenContext } from '../Context/tokenContext';
import { loginValidationSchema } from '../validations/validationSchema';
import { signInUrl } from '../constants/URLS';

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  let navigate = useNavigate()
  let { setToken } = useContext(tokenContext)

  const submitLogin = async (values: any) => {
    setIsLoading(true);
    try {
      let { data } = await axios.post(signInUrl, values);

      if (data.token) {
        setApiError("")
        setIsLoading(false);
        localStorage.setItem("userToken", data.token)
        setToken(data.token)
        navigate('/profile')
      }
    } catch (error: any) {

      setApiError(error.response.data.error);
      setIsLoading(false);
    }
  };

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      submitLogin(values);
    },
  });

  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Login</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}
        <form onSubmit={formik.handleSubmit}>
          <input className="form-control" placeholder="Enter your email" type="text" name="email" value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email ?
            <div className="alert alert-danger">{formik.errors.email}</div> : ''}
          <input className="form-control my-4 " placeholder="Enter your Password" type="password" name="password" value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          {formik.errors.password && formik.touched.password ?
            <div className="alert alert-danger">{formik.errors.password}</div> : ''}
          <button type="submit" className="btn btn-default-outline my-4 w-100 rounded">{isLoading ? <i className="fa fa-spin fa-spinner"></i> : <><i className="far fa-edit"></i> Login</>}</button>
          <p><a className="text-muted forgot btn" >I Forgot My Password</a></p>
          <Link className="btn btn-default-outline" to={'/register'}>Register</Link>
        </form>
      </div>
    </div>

  )
}
