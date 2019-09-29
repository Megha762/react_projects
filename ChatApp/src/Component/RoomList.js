import React, { Component } from 'react'

class RoomList extends Component{
  render() {
    const orderedRooms = this.props.rooms.sort((a, b) => a.id - b.id)
    return (
      <div>
        <h5>Rooms</h5>
        <ul>
        {orderedRooms.map(room => {
          const changeColor = this.props.roomId === room.id ? { color: '#fff' } : {}
          return(
            <li key={room.id} className='room'>
              <a onClick= {() => this.props.subscribeToRoom(room.id)} href="#" style={changeColor}>{room.name}</a>
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}

export default RoomList