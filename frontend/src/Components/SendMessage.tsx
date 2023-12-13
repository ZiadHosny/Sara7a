import { useState } from 'react'
import avatar from '../images/avatar.png'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { messagesUrl } from '../constants/URLS'


export const SendMessage = () => {
  let [apiError, setApiError] = useState('')
  let [apiSuccess, setApiSuccess] = useState('')

  let params = useParams()

  const SendMessage = async (values: any) => {
    try {

      let data = {
        ...values
      }
      console.log('sent data is ', data)
      let res = await axios.post(messagesUrl, data)
      console.log(res)
      setApiError('')
      setApiSuccess(res.data.messaged)
      setTimeout(() => {
        setApiSuccess("")
      }, 2000);
    } catch (error: any) {
      console.log(error.response.data.error)
      setApiError(error.response.data.error)
      setApiSuccess("")
      setTimeout(() => {
        setApiError("")
      }, 2000);
    }
  }

  let formik = useFormik({
    initialValues: {
      message: "",
      userId: params.userID
    }
    , onSubmit: (values) => {
      SendMessage(values)
      formik.values.message = ""
      formik.values.userId = ""
    }

  })

  return (
    <div>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card py-5 mb-5">
          <a data-toggle="modal" data-target="#profile">
            <img src={avatar} className="avatar " alt="profile pic" />
          </a>
          <h3 className="py-2">profile name</h3>
          <div className="container w-50 m-auto">
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="userId" className='mb-2'>Enter the user id you want to send message to:</label>
              <input name='userId' id='userId' value={formik.values.userId} placeholder="Enter the user id you want to send message to" className="form-control mb-2" type="text" onChange={formik.handleChange} />
              {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}
              {apiSuccess ? <div className="alert alert-success">{apiSuccess}</div> : ''}
              <textarea className="form-control" name="message" value={formik.values.message} onChange={formik.handleChange} cols={10} rows={9} placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)" defaultValue={""} />
              <button className="btn btn-outline-info mt-3" type='submit'><i className="far fa-paper-plane" /> Send</button>
            </form>
          </div>
        </div>
      </div>
      {/*  Share profile Modal */}

    </div>
  )
}
