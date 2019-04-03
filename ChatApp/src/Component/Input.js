import React, { Component } from "react"

export default class Input extends Component{
  constructor(props){
    super(props)
    this.state={
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit(this.state.message)
    this.setState({
      message: '',
    })
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit} className="input-field">
          <input className="message-input" type="text" value={this.state.message} onChange={this.handleChange}/>
          <input className="message-submit" type="submit" value="send"/>
        </form>
      </div>
    )
  }
} 