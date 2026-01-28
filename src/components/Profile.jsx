import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const userProfileData = useSelector((store) => store.user)

  return (
    <div>

      {userProfileData && userProfileData.data && <EditProfile user={userProfileData.data}></EditProfile>}

    </div>
  )
}

export default Profile