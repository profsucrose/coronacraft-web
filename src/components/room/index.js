import React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import Logo from '../../static/callcraft-logo.png'
import ChannelSelect from './ChannelSelect'

// Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCPCS7ILSdEKM_pylT4jovrRmgZO8t1NVk",
    authDomain: "coronacraft-0.firebaseapp.com",
    databaseURL: "https://coronacraft-0.firebaseio.com",
    projectId: "coronacraft-0",
    storageBucket: "coronacraft-0.appspot.com",
    messagingSenderId: "2801991931",
    appId: "1:2801991931:web:d764de528a51e24bcc305e",
    measurementId: "G-WVXQ17B2SZ"
})

const db = firebase.firestore()

// Speech recognition
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continuous = true
recognition.interimResults = false
recognition.lang = 'en-US'

export default class Room extends React.Component {

    roomId = this.props.match.params.id
    state = { 
        isStreaming: true, 
        channel: 'none', 
        stream: null,
        imageCapture: null,
        lastMessage: null,
        roomExists: null
    }

    constructor(props) {
        super(props)

        this.video = React.createRef()
        this.extractImage = React.createRef()
    }

    componentDidMount() {
        console.log(`rooms/${this.roomId}`)
        db.doc(`rooms/${this.roomId}`).get()
        .then((snapshot) => {
            this.setState({ roomExists: snapshot.exists })
        })


        navigator.mediaDevices.getUserMedia({video: true})
        .then(mediaStream => {
            const stream = mediaStream
            const imageCapture = new ImageCapture(mediaStream.getVideoTracks()[0])
            this.setState({ stream, imageCapture })
        })
        .catch(console.log)

        console.log(recognition)

        recognition.start()
        recognition.onnomatch = () => console.log('Word not recognized')
        recognition.onerror = ({ error }) => {
            console.log(error)
        }

        recognition.onresult = ({ results }) => {
            console.log(results[results.length - 1][0].transcript.trim())
            if (this.state.channel === 'none' || !this.state.isStreaming) return
            const message = results[results.length - 1][0].transcript.trim()
            console.log(message)
            db.collection(`rooms/${this.roomId}/chat`).add({
                message, channel: this.state.channel
            })
        }
    }

    startStreaming() {
        if (this.state.channel === 'none' || !this.state.isStreaming) return
        const img = this.extractImage.current
        const reader = new FileReader()
        const c = this.video.current
        const ctx = c.getContext('2d')

        this.state.imageCapture.takePhoto()
        .then(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                img.src = reader.result
                setTimeout(() => {
                    c.height = img.clientHeight
                    c.width = img.clientWidth
                    ctx.drawImage(img, 0, 0, img.width, img.height)
                    c.toBlob(blob => {
                        reader.readAsDataURL(blob)
                        reader.onloadend = () => {
                            db.doc(`rooms/${this.roomId}/videostreams/${this.state.channel}`).set({
                                image: reader.result
                            }).then(this.startStreaming.bind(this)) 
                        }
                    }, 'image/jpeg')
                }, 1)
            }
        })
        .catch(console.log)
    }

    onIsStreamingClicked() {
        if (!this.state.isStreaming) db.doc(`rooms/${this.roomId}/videostreams/${this.state.channel}`).set({ image: '' })
        this.setState({ isStreaming: !this.state.isStreaming })
    }

    onChannelSelect(e) {
        console.log("Channel: " + e.target.value)
        this.setState({ channel: e.target.value })
    }

    getRender() {
        if (this.state.roomExists == null) return <></>
        if (this.state.roomExists) { 
            return (
                <div className="container-ui">
                    <img className="logo" src={Logo} alt="CallCraft" />
                    <h3 className="subtitle">Room <strong>{this.roomId}</strong></h3>
                    <canvas ref={this.video} />
                    <label className="checkbox">
                        <input 
                            type="checkbox" 
                            checked={this.state.isStreaming}
                            onChange={this.onIsStreamingClicked.bind(this)}
                        />
                        Is Streaming
                    </label>
                    <ChannelSelect
                        value={this.state.channel}
                        onChannelSelect={this.onChannelSelect.bind(this)} 
                    />
                    <img className="extract-img" ref={this.extractImage} alt="" />
                    <button className="menu-button" onClick={this.startStreaming.bind(this)}>Start Streaming to Channel</button>
                </div>
            )
        } else {
            return (
                <div className="container-ui">
                     <h1 className="title">Uh oh!</h1>
                    <h1>Room does not exist!</h1>
                </div>
            )
        }
    }

    render() {
        return this.getRender()
    }
    
}