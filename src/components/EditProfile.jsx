import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from './UserCard'
import { BASE_URL } from '../utils/constants';
import axios from 'axios'
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {


    console.log(user)
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [errorMessage, setErrorMessage] = useState('')
    const [showToast, setShowToast] = useState(false)
    const saveProfile = async () => {

        try {
            setErrorMessage('')
            const res = await axios.patch(BASE_URL + '/profile/edit',
                {
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    photoUrl

                },

                {
                    withCredentials: true
                })

            if (res) {
                dispatch(addUser(res.data.data))

            }

        }
        catch (err) {
            console.error("error in saving profile", err)
            setErrorMessage(err.response.data)
        }
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
        }, 3000)

    }


    return (
        <>
            <div class="flex justify-between  mx-10">
                <div className="flex justify-center my-10">
                    <div className="fcard bg-primary text-primary-content w-96">
                        <div className="card-body">
                            <div className="flex justify-center "><h2 className="card-title">Edit Profile</h2></div>

                            <div className="p-10">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">First Name: </legend>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="Type here" />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Last Name:</legend>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" placeholder="Type here" />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Age:</legend>
                                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="input" placeholder="Type here" />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Gender:</legend>
                                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="input" placeholder="Type here" />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">About:</legend>
                                    <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} className="input" placeholder="Type here" />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Photo URL:</legend>
                                    <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input" placeholder="Type here" />
                                </fieldset>

                            </div>

                            {
                                errorMessage &&
                                <p className="text-red-300">Error: {errorMessage}</p>
                            }
                            <div className="card-actions justify-end">
                                <button onClick={saveProfile} className="btn">Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  */}

                <UserCard user={{
                    firstName,
                    lastName,
                    age,
                    gender,
                    photoUrl,
                    about,
                    _id:user._id
                }}></UserCard>


            </div>

            {showToast && <div className="toast toast-top toast-start">
                {/* <div className="alert alert-info">
                    <span>New mail arrived.</span>
                </div> */}
                <div className={'alert' + (errorMessage ? ' alert-error' : ' alert-success')}>
                    <span>{errorMessage || 'Profile Saved Successfully'}</span>
                </div>
            </div>}

        </>
    )
}

export default EditProfile