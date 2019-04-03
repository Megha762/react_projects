import React from "react"

export default function Completed(props){
  return(
    <div className="container">
      <div className="row">
        <div className="col-12">
          <ul>
            {props.list.map((job)=>(
              <li key={job.work}>
                <span>{job.work}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}