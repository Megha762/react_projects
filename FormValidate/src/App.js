import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBatteryHalf, faBatteryFull } from '@fortawesome/free-solid-svg-icons'

library.add(faBatteryHalf, faBatteryFull)

const emailRegex = RegExp(/^[a-zA-Z0-9.!#%&'*+/=?^_`{|}~-]+@\w+(?:\.\w+)*$/)
const strongRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
const mediumRegex = RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)

const formValidation = ({formErrors, ...rest}) => {
    let valid = true

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false)
    })

    Object.values(rest).forEach(val => {
        val == "" && (valid = false)
    })
    return valid
}


export default class App extends React.Component {
  constructor () {
    super ()

    this.state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        formErrors: {
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        }
    }
  }
  

  handleSubmit = e => {
      e.preventDefault()

      if(formValidation(this.state)){
          console.log(`
             ---SUBMIT---
             Firstname: ${this.state.firstName}
             Lastname: ${this.state.lastName}
             Email: ${this.state.email}
             Password: ${this.state.password}
          `)
      }
      else {
          console.error('INVALID FORM!!!');
      }
  }


  handleChange = e => {
      e.preventDefault()
      const { name, value } = e.target
      let formErrors = this.state.formErrors

      switch (name) {
        case 'firstName':
          formErrors.firstName = 
            value.length < 3 ?
            "Minimum 3 characters required":
            ""
            break
        case 'lastName':
          formErrors.lastName = 
            value.length < 3 ?
            "Minimum 3 characters required":
            ""
            break
        case 'email':
          formErrors.email = 
            emailRegex.test(value) ?
            "":
            "Invalid Email"
            break
        case 'password':
          if(value.length < 6) {
            formErrors.password = "Minimum 6 characters required"
          }else if(value.length >= 6 && value.length < 8) {
            formErrors.password = 
              mediumRegex.test(value) ? "" : "Invalid Characters"
          }else if(value.length >= 8) {
            formErrors.password = 
              strongRegex.test(value) ? "" : "Invalid Characters"
          }
            break
        default:
          break
      }

      this.setState({ formErrors, [name]: value}, () => console.log(this.state))
  }


  render () {
    const formErrors = this.state.formErrors
    const password = this.state.password
    return (
      <div className="wrapper">
          <div className="form-wrapper">
            <h2 className="title">SIGN UP</h2>
            <hr/>
            <form onSubmit={this.handleSubmit}>
              <div className="firstname">
                <label htmlFor="firstname">First name</label>
                <input 
                  type="text" 
                  className=""
                  name="firstName" 
                  placeholder="First name" 
                  onChange={this.handleChange} 
                  noValidate/>
                <div>{formErrors.firstName.length > 0 && 
                    (<span className="errMessage">{formErrors.firstName}</span>)
                }</div>
              </div>
              <div className="lastname">
                <label htmlFor="lastname">Last name</label>
                <input 
                  type="text" 
                  className=""
                  name="lastName" 
                  placeholder="Last name" 
                  onChange={this.handleChange} 
                  noValidate/>
                <div>{formErrors.lastName.length > 0 && 
                    (<span className="errMessage">{formErrors.lastName}</span>)
                }</div>
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  className=""
                  name="email" 
                  placeholder="Username" 
                  onChange={this.handleChange} 
                  noValidate/>
                <div>{formErrors.email.length > 0 && 
                    (<span className="errMessage">{formErrors.email}</span>)
                }</div>
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  className=""
                  name="password" 
                  placeholder="Password" 
                  onChange={this.handleChange} 
                  noValidate/>
                <div>
                  {   
                    formErrors.password.length > 0 
                    ? <p className="errMessage">{formErrors.password}</p> : ""
                  }
                  {
                    password.length >= 6 && password.length < 8 && formErrors.password.length == 0
                    ? <p className="midMessage">medium <FontAwesomeIcon icon="battery-half" size="lg"/> </p> : ""
                  }
                  {
                    password.length >= 8 && formErrors.password.length == 0
                    ? <p className="stroMessage">strong <FontAwesomeIcon icon="battery-full" size="lg"/> </p> : ""
                  }
                    
                  
                </div>
                <div className="validPassword">Valid Paasword:Use at least 1 lowercase, 1 uppercase alphabet, 1 number and 1 special character</div>
              </div>
              <div className="button">
                <button type="submit">submit</button>
              </div>
            </form>
          </div>
      </div>
    )
  }
}