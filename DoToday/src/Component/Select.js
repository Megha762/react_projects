import React from  "react"

export default function Select(props){
  return(
    <div className="container">
      <div className="row">
        <div className="col-12">
          <select onClick={props.onSelect}>
            {props.list.map((select)=>(
              <option key={select}>{select}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}