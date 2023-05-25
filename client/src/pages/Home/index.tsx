import { useState } from 'react'
import './home.scss'
import { useQuery, useMutation } from 'react-query'
import { createRoom, getSingleRoom } from '../../api'
import { codeTemplate } from './data'

const Home = () => {
    const [room, setRoom] = useState('')

    //create a new room
    const { mutate } = useMutation(
        'create-room',
        () =>
            createRoom({
                data: {
                    roomId: room,
                    code: codeTemplate,
                },
            }),
        {
            onSuccess: res => {
                window.location.href = `/room/${room}`
            },
            onError: err => {
                console.log(err)
            },
        },
    )

    //check if room exists
    const { refetch } = useQuery('get-single-room', () => getSingleRoom(room), {
        enabled: false,
        retry: false,
        onSuccess: res => {
            window.location.href = `/room/${room}`
        },
        onError: (err: any) => {
            const errorType = err?.response?.data?.error?.name
            if (errorType === 'NotFoundError') {
                mutate()
            } else {
                console.log(err)
            }
        },
    })
    const joinRoom = () => {
        if (room !== '') {
            refetch()
        }
    }
    return (
        <div className="homeWrapper">
            <h1>Collaborative Code Editor</h1>
            <div className="homeEnterSection">
                <p>Enter a room id to join or create a new room</p>
                <input onChange={e => setRoom(e.target.value)} />
                <button onClick={joinRoom}>Create or Join</button>
            </div>
        </div>
    )
}

export default Home
