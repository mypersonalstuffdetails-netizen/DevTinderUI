import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'

const Body = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const userData = useSelector(store => store.user)

    const fetchUser = async () => {

        try {
            if (!userData) {
                const res = await axios.get(
                    BASE_URL + '/profile/view',
                    { withCredentials: true }
                )

                console.log(res)
                dispatch(addUser(res.data))
            }

        }
        catch (err) {
            console.log("Err => " + err)
            navigate("/login")

        }


    }

    useEffect(() => {

        fetchUser();

    }, [])

    return (
        <>
            <NavBar></NavBar>

            {/*Any Child Routes on Body will render here  */}
            <Outlet></Outlet>

            <Footer></Footer>

        </>)
}

export default Body