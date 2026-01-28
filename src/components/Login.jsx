import React, { useState } from 'react'

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const navigate = useNavigate()

  const [emailId, setEmailId] = useState('')


  const [password, setPassword] = useState('')

  const [firstName, setFirstName] = useState('')

  const [lastName, setLastName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [isLoginForm, setIsLoginForm] = useState(false)

  const dispatch = useDispatch()


  const handleSignUp = async () => {
    try {

      await axios.post(BASE_URL + '/signup', {
        firstName, lastName, emailId, password
      },
        {
          withCredentials: true
        }).then((res) => {
          console.log(res.data);
          dispatch(addUser(res.data))
          return navigate("/profile")
        })
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleLogin = async (event) => {

    try {
      await axios.post('http://localhost:3000/login', {
        emailId,
        password
      }, {
        withCredentials: true             //needed to set cookie on browser
      })
        .then((res) => {
          console.log(res.data);
          dispatch(addUser(res.data))
          return navigate("/")
        })

    }
    catch (err) {
      console.log("error while login ", err)
      setErrorMessage(err?.response?.data || "Something went wrong")
    }

  }
  return (
    <>
      <div className="flex justify-center my-10 ">
        <div className="fcard bg-primary text-primary-content w-96 rounded-xl">
          <div className="card-body">
            <div className="flex justify-center "><h2 className="card-title">{isLoginForm ? "Login" : "Sign Up"}</h2></div>

            <div className="p-10">
              {
                !isLoginForm && <>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name </legend>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="Type here" />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" placeholder="Type here" />
                  </fieldset>
                </>
              }

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email Id </legend>
                <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input" placeholder="Type here" />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Type here" />
              </fieldset>
            </div>

            {errorMessage && <p className="text-red-300">Error: {errorMessage}</p>}
            <div className="card-actions justify-end">
              <button onClick={isLoginForm ? handleLogin : handleSignUp} className="btn">{isLoginForm ? "Login" : "Sign Up"}</button>
            </div>

            <p className='m-auto pointer' onClick={() => setIsLoginForm(value => !value)}>{
              isLoginForm ? "New User, Sign Up Here" : "Existing User, Login here"
            }
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login