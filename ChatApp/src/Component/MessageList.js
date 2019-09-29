import React, { Component } from "react"
import ReactDOM from 'react-dom'
import gravatar from 'gravatar'

export default class MessageList extends Component{

  componentWillUpdate () {
    const node = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
  }

  componentDidUpdate() {
    if(this.shouldScrollToBottom){
    const node = ReactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
    }
  }

  render(){
    const messages = this.props.messages;
    function changeTime(value){
      const date = new Date(value);
      return (
        date.getFullYear()+'-' + 
        (date.getMonth()+1) + '-'+
        date.getDate() + '  ' +
        date.getUTCHours() + ':' +
        date.getUTCMinutes()
      );
    }
    
    return(
      <div>
        <ul className="message-list">
          { messages === [] ?
            <div className="load">LOADING</div> :
            messages.map((message, index)=>(
            <li key={index}>
              
              <h4 className="message-sender">
                <img src={gravatar.url(message.senderId, {s: '30', r: 'pg', d: 'mm'})} alt="I"/>
                <span className="user-id">{message.senderId}</span>
              </h4>
              <p className="message-time">{changeTime(message.createdAt)}</p>
              <p className="message-text">{message.text}</p>
            </li>
          ))}
          <li></li>
        </ul>
      </div>
    )
  }
}
