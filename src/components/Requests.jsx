import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addRequests, removeRequests } from '../utils/requestsSlice'

const Requests = () => {

  const dispatch = useDispatch()

  let requests = useSelector((store) => store.requests) || []


  



  const reviewRequest = async (status, reqId) => {
    try {

      await axios.post(BASE_URL + `/request/review/${status}/` + reqId, {}, {
        withCredentials: true
      })

      dispatch(removeRequests({id:reqId}))



    }
    catch (err) {

    }
  }

  const getConnectionRequests = async () => {

    try {
      const data = await axios.get(BASE_URL + '/user/requests/received', {
        withCredentials: true
      })

      dispatch(addRequests(data.data.data))

    }
    catch (err) {
      console.log(err)
    }

  }


  useEffect(() => {
    getConnectionRequests()
  }, [])

  if (!requests.length) return (<><h1>No Pending Connection Requests</h1></>)


  return (
    <>
      <div className='flex justify-center mx-10 my-10'>

        <h1>Requests</h1>
      </div>
      <div>
        <div>
          {
            requests.map((request) => {
              const { firstName, lastName, photoUrl, about, gender, age, _id } = request.fromUserId
              const requestId=request._id
              return (
                <div key={_id} className='flex justify-center'>
                  <div>
                    <div className='flex justify-center mx-10 my-10  w-1/2'>
                      <img src={photoUrl} className='w-50 rounded-xl'></img>
                      <div className='mx-10 flex flex-col justify-center'>
                        <h2 className="font-bold">{firstName} {lastName}</h2>
                        <p>{about}</p>
                        <p>{gender}</p>
                        <p>{age}</p>
                      </div>

                    </div>
                    <div className='w-1/2 flex justify-around'>
                      <button onClick={() => reviewRequest('rejected', requestId)} className="btn btn-warning">Ignore</button>
                      <button onClick={() => reviewRequest('accepted', requestId)} className="btn btn-success">Accept</button>

                    </div>
                  </div>
                  <hr />
                </div>

              )

            })
          }

        </div>
      </div>
    </>

  )
}

export default Requests