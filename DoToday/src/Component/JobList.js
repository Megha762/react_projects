import React from "react"

export default function JobList(props){
  return(
    <div className="container">
      <div className="row">
        <div className="col-12">
          <ul>
            {props.completelist.map((job)=>(
              <li key={job.work}>
                <span onClick={()=>props.onCompleted(job.work)}><strike>{job.work}</strike></span>
                <button className="delete" onClick={()=>{props.onDelete(job.work)}}>X</button>
              </li>
            ))}
            {props.activelist.map((job)=>(
              <li key={job.work}>
                <span onClick={()=>props.onCompleted(job.work)}>{job.work}</span>
                <button className="delete" onClick={()=>{props.onDelete(job.work)}}>X</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}