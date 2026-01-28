import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { removeFeed } from '../utils/feedSlice'
import { BASE_URL } from '../utils/constants'


export const UserCard = ({ user }) => {
    console.log(user)
    const {
        firstName,
        lastName,
        age,
        gender,
        photoUrl,
        about,
        skills,
        _id

    } = user

    const dispatch = useDispatch()

    const loggedInUser = useSelector((store) => store.user.data)

    console.log(loggedInUser._id,_id)
    const handleSendRequest = async (status, userId) => {

        try {

            const data = await axios.post(BASE_URL + `/request/send/${status}/${userId}`, {}, {
                withCredentials: true
            })

            dispatch(removeFeed({ id: userId }))
        }
        catch (err) {
            console.log(err)
        }


    }
    return user && (
        <div>
            <div className="card bg-base-400 w-96 shadow-sm">
                <figure>
                    <img
                        src={photoUrl}
                        alt="photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title" >{firstName + " " + lastName}</h2>
                    <p>{about}</p>
                    <p>Skills: {skills?.join(', ')}</p>
                    <p>Gender: {gender}</p>
                    <p>Age: {age}</p>

                    {
                        loggedInUser._id !== _id &&( <div className="card-actions justify-between">
                            <button className="btn btn-secondary" onClick={() => handleSendRequest('ignored', _id)}>Ignore</button>
                            <button className="btn btn-primary" onClick={() => handleSendRequest('interested', _id)}>Interested</button>
                        </div>)
                    }
                    <div className="card-actions justify-start">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard