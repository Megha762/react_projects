import React, { Component } from 'react'

class Status extends Component{
  render(){
    const users = this.props.status
    return(
      <div>
          <h5>Status</h5>
          {users.map((user, index) => {
            return (
              <div key={index}>
                {user[1] === 'online'?
                  <span style={{color: 'green'}} className="sign">+</span>:
                  <span style={{color: 'red'}} className="sign">-</span>
                }
                <span>{user[0]}</span>
              </div>
            )
          })}
      </div>
    )
  }
}

export default Status