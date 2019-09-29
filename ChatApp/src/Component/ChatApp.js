import React, {Component} from "react"
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import Input from "./Input"
import MessageList from "./MessageList"
import Status from "./Status"
import RoomList from './RoomList'
import AddRoom from './AddRoom'

export default class ChatApp extends Component{
  constructor(props){
    super(props)
    this.state={
      roomId: '19554261',
      currentUser: null,
      currentRoom: {users:[]},
      messages: [],
      users: [],
      status: null,
      height: '50px',
      joinableRooms: [],
      joinedRooms: [],

    }
    this.addMessage = this.addMessage.bind(this)
  }

  componentDidMount(){
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:03f2f0a6-6111-47c8-b875-1c72761bac1c',
      userId: this.props.currentId,
      tokenProvider: new TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/03f2f0a6-6111-47c8-b875-1c72761bac1c/token",
      })
    })
    chatManager
      .connect()
      .then(currentUser=>{
          this.setState({currentUser})
          
          this.getRooms();

          this.subscribeToRoom(this.state.roomId);
          
      })
      .catch(error=>console.log('chatkit connecting error', error))
  }


  getRooms = () => {
      this.state.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        // do something with the rooms
        this.setState({
          joinableRooms,
          joinedRooms: this.state.currentUser.rooms
        })
      })
      .catch(err => {
        console.log(`Error getting joinable rooms: ${err}`)
      })
  }
  
  componentDidUpdate() {
    
  }

  subscribeToRoom = (roomId) => {
      this.setState({ 
        messages: [],
        roomId,
      })
      return this.state.currentUser.subscribeToRoom({
        roomId,
        messageLimit: 100,
        hooks: {
          onMessage: message=>{
            this.setState({
                messages: [...this.state.messages, message]
            })
          }
        }
      })
      .then(currentRoom=>{
        this.setState({
          currentRoom,
          users: currentRoom.userIds
        })
        this.getRooms()
        return currentRoom.userStore.presenceStore
      })
      .then(data => {
        setTimeout(() => {
          this.setState({
            status: Object.entries(data),
          })
        }, 5000)
        
      })
      .catch(error=>console.log("subscribe error", error))
  }

  addMessage(text){
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id,
    })
    .catch(error=>console.error('error',error))
  }

  createRoom = (name) => {
    this.state.currentUser.createRoom({
      name
    })
    .then(room => 
      this.subscribeToRoom(room.id)
    )
    .catch(err => console.log("new room error", err))
  }
 
  render(){
    return(
      <div className="chat-box">

          <div className="side-body">

            <div className="room-body">
              <div  className="room-list" id="room-list-id">
                {this.state.joinableRooms && this.state.joinedRooms  === [] ? 
                  <h5 className="load">LOADING</h5> : 
                  <RoomList 
                    roomId = {this.state.roomId}
                    subscribeToRoom = {this.subscribeToRoom}
                    rooms = {[...this.state.joinableRooms, ...this.state.joinedRooms]}
                  />
                }
              </div>
              <AddRoom createRoom = {this.createRoom}/>
            </div>
          
            <div className="status">
              {this.state.status === null ? <h5 className="load">LOADING</h5> : <Status status = {this.state.status}/>}
            </div>

          </div>

          <div className="message-box">

            <div className="message-body">
              {this.state.messages === null ? <h5 className="load">{console.log('load')}LOADING</h5> : <MessageList messages={this.state.messages}/>}
            </div>

            <div className="text">
              <Input onSubmit={this.addMessage}/>
            </div>
          </div>
        
      </div>
    )
  }
}