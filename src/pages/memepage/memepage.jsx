import React from "react";

import './memepage.scss';

class Memepage extends React.Component{
    constructor(){
        super();

        this.state = {
            memes: []
        }
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then(res => {
            let memes = res.data.memes;
            this.setState({memes : memes}, () => console.log(this.state))
        })
    }

    render(){
        return(
            <div className="Memepage">

            </div>
        )
    }
}

export default Memepage;