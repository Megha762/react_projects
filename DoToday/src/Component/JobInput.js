import React from "react"

export default function JobInput(props){
  return(
    <div>
      <form className="form-group" onSubmit={props.onSubmitWork}>
        <div className="container">
          <div className="row">
            <div className="col-8 col-lg-4  mt-4">
              <input className="form-control" type="text" placeholder="Enter your work" onChange={props.onUpdateInput} value={props.value}/>
              {props.error}
            </div>
            <div className="col-4 col-lg-4  mt-4">
              <button>ADD</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}