import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants'
import { addFeed, removeFeed } from '../utils/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import UserCard from './UserCard';

const Feed = () => {



  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed) || []
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true
      });

      dispatch(addFeed(res.data));

    }
    catch (error) {

      console.log("Error => " + error)

    }
  }




  useEffect(() => {
    if (!feed || !feed.length) {
      getFeed()
    }
  }, [])


  if(!feed.length){
      return (<div>No Users Available</div>)
  }

  return (
    <>

      <div className="flex justify-center my-10 ">

        {feed && feed[0] && <UserCard user={feed[0]}>
        </UserCard>
        }


      </div>




    </>
  )
}

export default Feed