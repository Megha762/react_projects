import React from "react"


export default class MemeGenerator extends React.Component {
    constructor () {
        super () 
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "https://i.imgflip.com/1jwhww.jpg",
            allMemeImgs: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount () {
        fetch("https://api.imgflip.com/get_memes")
             .then(response => response.json())
             .then(response => {
                    const memes = response.data.memes
                    this.setState({
                        allMemeImgs: memes
                    })
                   })
    }        
            
    handleChange (event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit (event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({
            randomImg: randMemeImg
        })

    }

    render () {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                        <input 
                            type="text" 
                            name="topText" 
                            placeholder="Top Text" 
                            onChange={this.handleChange} 
                            value={this.state.topText}
                        />
                        <input 
                            type="text" 
                            name="bottomText" 
                            placeholder="Bottom Text" 
                            onChange={this.handleChange} 
                            value={this.state.bottomText}
                        />
                    <button>Gen</button>
                </form>
                <div>
                    <img src={this.state.randomImg} alt="" className="memeImg"/>
                    <h2 className="toptext">{this.state.topText}</h2>
                    <h2 className="bottomtext">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}