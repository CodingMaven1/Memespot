import React from "react";
import Card from '../../components/card/card';
import './memepage.scss';

class Memepage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            memes: [],
            search: '',
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

    onChangeHandler = (event) => {
        let search = this.state.search;
        search = event.target.value;
        this.setState({search : search})
    }

    render(){

        let memes = this.state.memes;
        let search = this.state.search;
        let filteredmemes = memes.filter(meme => 
            meme.name.toUpperCase().includes(search.toUpperCase())
        )
        
        return(
            <div className="Memepage">
                <div className="Memepage--Search">
                    <h1 className="Memepage--SearchHeading">Generate memes with these trending templates!</h1>
                    <input type="search" placeholder="Search" value={this.state.search} onChange={event => this.onChangeHandler(event)} className="Memepage--SearchBar" /> 
                </div>
                {
                    filteredmemes.map(meme => {
                        return(
                            <Card url={meme.url} id={meme.id} height={meme.height} width={meme.width} text={meme.name} textCount={meme.box_count} />
                        )
                    })
                }
            </div>
        )
    }
}

export default Memepage;