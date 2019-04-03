import React from "react"
import MemeGenerator from "./Compnents/MemeGenerator"
import Header from "./Compnents/Header"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"

export default class App extends React.Component {
    render () {
        return (
            <div>
                <Header />
                <MemeGenerator/>
            </div>
        )
    }
}