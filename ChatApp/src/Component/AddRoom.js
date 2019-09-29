import React, { Component } from 'react'


class AddRoom extends Component{
  constructor() {
    super() 
    this.state = {
      roomName: ''
    }
  }
  
  handleChange = (e) => {
    this.setState({
      roomName: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createRoom(this.state.roomName)
    this.setState({
      roomName: ''
    })
  }

  render () {
    return (
      <div className="create-room">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange} 
            value={this.state.roomName}
            type="text"
            placeholder="New Room"
            required
            />
        </form>
      </div>
    )
  }
}

export default AddRoom