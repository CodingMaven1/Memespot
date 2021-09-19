import React from "react";
import Card from '../../components/card/card';
import Editor from '../../components/editor/editor';
import './memepage.scss';
import Navbar from "../../components/navbar/navbar";

class Memepage extends React.Component{


    state = {
        memes: [],
        search: '',
        id: '',
        url: '',
        displayMemeEditor: false
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then(res => {
            let memes = res.data.memes;
            this.setState({memes : memes})
        })
    }

    onChangeHandler = (event) => {
        let value = event.target.value;
        this.setState({search : value})
    }

    onMemeHandler = (identity, imgurl) => {
        this.setState({ id : identity, url: imgurl, displayMemeEditor: true })
        window.scrollTo(0,0);
    }

    onImageUploadHandler = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onload = () => {
          this.setState({
            file: file,
            url: reader.result,
            displayMemeEditor: true
          }, () => console.log(this.state));
        }
    
        reader.readAsDataURL(file)
      }

    render(){

        let { memes, search} = this.state;
        let filteredmemes = memes.filter(meme => 
            meme.name.toUpperCase().includes(search.toUpperCase())
        )
        
        return(
            <div className="Memepage">
                <Navbar clicked={e => this.onImageUploadHandler(e)} />
                <div className="Memepage--Search">
                    <h1 className="Memepage--SearchHeading">Generate memes with these trending templates!</h1>
                    <input type="search" placeholder="Search" value={this.state.search} onChange={event => this.onChangeHandler(event)} className="Memepage--SearchBar" /> 
                </div>
                {
                    this.state.displayMemeEditor ? 
                        <Editor key={this.state.url} url={this.state.url} id={this.state.id} /> : null
                }
                {
                    filteredmemes.map((meme, idx) => {
                        return(
                            <Card meme={meme} key={idx} clicked={() => this.onMemeHandler(meme.id, meme.url)} />
                        )
                    })
                }
            </div>
        )
    }
}

export default Memepage;