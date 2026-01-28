import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'

const Connections = () => {

    const [connectionList, setConnectionList] = useState([])

    const dispatch = useDispatch()

    let connections = useSelector((store) => store.connections) || []

    if (connections && connections.length && connections.length === 0) {
        return (<div>No Connections Found</div>)
    }

    // if (!connections) {
    //     return
    // }



    const fetchConnections = async () => {
        try {

            const res = await axios.get(BASE_URL + '/user/connections', {
                withCredentials: true
            });

            console.log(res)

            if (res) {

                dispatch(addConnections(res.data.data))
                // connections = useSelector((store) => store.connections)
                // setConnectionList(res.state)


            }


        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])
    return (
        <>
            <div className='flex justify-center mx-10 my-10'>

                <h1>Connections</h1>
            </div>
            <div>
                <div>
                    {
                        connections.map((connection) => {
                            const { firstName, lastName, photoUrl, about, gender, age,_id } = connection
                            return (
                                <div key={_id} className='flex justify-center'>

                                    <div className='flex justify-center mx-10 my-10  w-1/2'>
                                        <img src={photoUrl} className='w-50 rounded-xl'></img>
                                        <div className='mx-10 flex flex-col justify-center'>
                                            <h2 className="font-bold">{firstName} {lastName}</h2>
                                            <p>{about}</p>
                                            <p>{gender}</p>
                                            <p>{age}</p>
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

export default Connections