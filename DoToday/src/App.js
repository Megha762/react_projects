import React, { Component } from "react"
import JobList from "./Component/JobList"
import JobInput from "./Component/JobInput"
import Select from "./Component/Select"
import Completed from "./Component/Completed"
import Incomplete from "./Component/Incomplete"
import "./index.css"

export default class App extends Component{
  constructor(props){
    super(props)
    this.state={
      list: [
        {
          work: "attend the class",
          active: false,
        },
        {
          work: "purchase the stationary",
          active: false,
        },
        {
          work: "do the assignments",
          active: true,
        },
        {
          work: "play the game",
          active: true,
        },
      ],
      input: "",
      select: ['All', 'Active', 'Completed'],
      selectone: "All",
      error: "",
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    const work = this.state.input
    if(work !== ""){
      this.setState((currentState)=>{
        return{
          list: currentState.list.concat([{
            work,
            active: false,
          }]),
          input: "",
          error: "",
        }
      })
    }else{
      this.setState({
        error: "Fill this!!!"
      })
    }
  }

  handleInput(e){
    this.setState({input: e.target.value,})
  }

  handleCompleted(value){
    this.setState((currentState)=>{
      const work = currentState.list.find((list)=> list.work === value)
      return{
        list: currentState.list.filter((list)=>list.work !== value).concat([{
          work: value,
          active: !work.active,
        }])
      }
    })
  }

  handleSelect(e){
    this.setState({selectone: e.target.value})
  }

  handleDelete(value){
    this.setState((currentState)=>{
      return{
        list: currentState.list.filter((list)=>list.work !== value)
      }
    })
  }

  render(){
    return(
      <div className="container">
        <div className="row paper">
          <JobInput 
            value={this.state.input}
            onUpdateInput={this.handleInput}
            onSubmitWork={this.handleSubmit}
            error={this.state.error}
          />
          <div className="container">
            <div className="row" className="heading">
              <div className="col-12">
                <h4>What to do?</h4>
              </div>
            </div>
          </div>

          {this.state.selectone === "All"
           ?<JobList 
              completelist={this.state.list.filter((work)=>work.active === true)}
              activelist={this.state.list.filter((work)=>work.active === false)}
              onCompleted={this.handleCompleted}
              onDelete={this.handleDelete}
            />
           : this.state.selectone === "Active"
           ? <Incomplete list={this.state.list.filter((work)=>work.active === false)}/>
           : <Completed list={this.state.list.filter((work)=>work.active === true)} />
          }
          <Select 
            list={this.state.select}
            onSelect={this.handleSelect}
          />
        </div>
      </div>
    )
  }
}