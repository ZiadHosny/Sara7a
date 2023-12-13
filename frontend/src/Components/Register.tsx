import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signUpUrl } from '../constants/URLS';
import { registerValidationSchema } from '../validations/validationSchema';

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  let navigate = useNavigate()
  const submitRegister = async (values: any) => {
    setIsLoading(true);
    try {
      let { data } = await axios.post(signUpUrl, values);

      if (data.message === 'Success') {
        setApiError("")
        setIsLoading(false);
        navigate('/login')
      }
    } catch (error: any) {
      setApiError(error.response.data.error);
      setIsLoading(false);
    }
  };

  let formik = useFormik({
    initialValues: {
      name: 'ziad',
      email: 'ziadhosny007@gmail.com',
      password: '12345678z',
      rePassword: '12345678z',
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      submitRegister(values);
    },
  });

  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="far fa-edit user-icon" ></i>
        <h4 className="login">Register</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}
        <form onSubmit={formik.handleSubmit}>
          <input
            className="form-control"
            placeholder="Enter your Name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ?
            <div className="alert alert-danger">{formik.errors.name}</div> : ''}
          <input
            className="form-control my-2 "
            placeholder="Enter your email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ?
            <div className="alert alert-danger">{formik.errors.email}</div> : ''}
          <input
            className="form-control my-2"
            placeholder="Enter your Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ?
            <div className="alert alert-danger">{formik.errors.password}</div> : ''}
          <input
            className="form-control my-2 "
            placeholder="Password Confirmation"
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ?
            <div className="alert alert-danger">{formik.errors.rePassword}</div> : ''}
          <button
            type="submit"
            className="btn btn-default-outline my-4 w-100 rounded"
          >
            {isLoading ? <i className="fa fa-spin fa-spinner"></i> :
              <>
                <i className="far fa-edit"></i> Register
              </>
            }
          </button>
          <Link className="btn btn-default-outline" to={'/login'}>
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
