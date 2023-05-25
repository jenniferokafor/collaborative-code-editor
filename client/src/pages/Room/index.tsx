import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { debounce } from 'lodash'
import Editor from '../../components/Editor'
import { langs } from '@uiw/codemirror-extensions-langs'
import io from 'socket.io-client'
import './room.scss'
import RoomNav from '../../components/RoomNav'
import { useMutation, useQuery } from 'react-query'
import { getSingleRoom, updateCode } from '../../api'
const Room = () => {
    const [html, setHtml] = useState('')
    const [css, setCss] = useState('')
    const [js, setJs] = useState('')
    const [userCount, setUserCount] = useState(0)
    const [lastUpdated, setLastUpdated] = useState(Date.now())
    // const socket = io('http://localhost:1337')
    const { id } = useParams<{ id: string }>()
    const [dbId, setDbId] = useState('')

    const over250ms = lastUpdated ? Date.now() - lastUpdated > 250 : null
    const payload = { html, js, css }

    //fetch the room data
    const { isLoading } = useQuery(
        'get-room-data',
        () => getSingleRoom(id || ''),
        {
            refetchOnWindowFocus: false,
            onSuccess: res => {
                const code = res?.data?.data?.attributes?.code
                setHtml(code?.html || '')
                setCss(code?.css || '')
                setJs(code?.js || '')
                setDbId(res?.data?.data?.id || '')
            },
            onError: (err: any) => {
                console.log(err)
            },
        },
    )

    const { mutate } = useMutation(
        'update-code',
        () => updateCode(dbId, { data: { code: payload } }),
        {
            retry: false,
            onSuccess: res => {
                console.log(res)
                setLastUpdated(Date.now())
            },
        },
    )

    //handle code change
    const handleCodeChange = (value: string, lang: 'html' | 'js' | 'css') => {
        payload[`${lang}`] = value
        if (lang === 'html') {
            setHtml(value)
        } else if (lang === 'css') {
            setCss(value)
        } else if (lang === 'js') {
            setJs(value)
        }
        //todo: fix how this prevents the last update from being sent
        if (over250ms) {
            mutate()
        }
    }
    return (
        <div>
            <RoomNav roomName={id || ''} userCount={userCount} />
            <section className="CodeInputWrapper">
                <Editor
                    name={'HTML'}
                    value={html}
                    onChange={value => {
                        handleCodeChange(value, 'html')
                    }}
                    extensions={[langs.html()]}
                />
                <Editor
                    name={'CSS'}
                    value={css}
                    onChange={value => {
                        handleCodeChange(value, 'css')
                    }}
                    extensions={[langs.css()]}
                />
                <Editor
                    name={'JS'}
                    value={js}
                    onChange={value => {
                        handleCodeChange(value, 'js')
                    }}
                    extensions={[langs.javascript()]}
                />
            </section>
            <section className="CodeOutputWrapper">
                <iframe
                    srcDoc={`<html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
        </html>`}
                    title="output"
                    sandbox="allow-scripts"
                />
            </section>
        </div>
    )
}
export default Room
