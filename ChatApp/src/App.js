import React, { Component } from 'react'
import './index.css'
import ChatMessage from './Component/ChatMessage'
import Signup from './Component/Signup'

import { default as Chatkit} from '@pusher/chatkit-server'
import ChatApp from './Component/ChatApp';

const chatkit = new Chatkit({
  instanceLocator: "v1:us1:03f2f0a6-6111-47c8-b875-1c72761bac1c",
  key: "bcf8c293-b874-48b2-b2f2-f5c43ded74d4:sR7wV2XSM4lFAHMSikL6sG8xBil0QEaP+JelSdVfVyc=",
})
//console.log(chatkit);

export default class App extends Component{
  constructor(props){
    super(props)
    this.state={
      currentId: '',
      currentUsername: '',
      currentView: 'signup'
    }
    this.changeView = this.changeView.bind(this)
    this.createUser = this.createUser.bind(this)
  }

  createUser(username){
    chatkit.createUser({
      id: username,
      name: username,
    })
    .then((currentUser)=>{
      this.setState({
        currentId: username,
        currentUsername: username,
        currentView: 'chatApp'
      })
    }).catch((err)=>{
        if(err.status === 400){
          this.setState({
            currentId: username,
            currentUsername: username,
            currentView: 'chatApp'
          })
        }else{
          console.log(err.status)
        }
      })
  }

  changeView(view){
    this.setState({
      currentView: view
    })
  }
  render(){
    let view = ''
    if(this.state.currentView === 'ChatMessage'){
      view = <ChatMessage changeView={this.changeView}/>
    }else if(this.state.currentView === 'signup'){
      view = <Signup onSubmit={this.createUser}/>
    }else if(this.state.currentView === 'chatApp'){
      view = <ChatApp currentId={this.state.currentId}/>
    }
    return(
      <div className="App">
        {view}
      </div>
    )
  }
}