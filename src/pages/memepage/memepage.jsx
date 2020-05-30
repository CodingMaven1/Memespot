import React from "react";
import Card from '../../components/card/card';
import Editor from '../../components/editor/editor';
import './memepage.scss';
import Navbar from "../../components/navbar/navbar";

class Memepage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            memes: [],
            search: '',
            id: '',
            url: '',
            textfield: '',
            displayMemeEditor: false
        }
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
        let search = this.state.search;
        search = event.target.value;
        this.setState({search : search})
    }

    onMemeHandler = (event,identity,imgurl,text) => {
        event.preventDefault();
        let id = this.state.id;
        let url = this.state.url;
        let textfield = this.state.textfield;
        let displayMemeEditor = this.state.displayMemeEditor;
        id = identity;
        url = imgurl;
        textfield = text;
        this.setState({id : id, url:url, textfield : textfield, displayMemeEditor: !displayMemeEditor})
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

        let memes = this.state.memes;
        let search = this.state.search;
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
                    this.state.displayMemeEditor ? <Editor key={this.state.url} url={this.state.url} id={this.state.id} options={this.state.textfield} /> : null
                }
                {
                    filteredmemes.map(meme => {
                        return(
                            <Card url={meme.url} id={meme.id} key={meme.id} clicked={event => this.onMemeHandler(event,meme.id,meme.url,meme.box_count)} height={meme.height} width={meme.width} text={meme.name} textCount={meme.box_count} />
                        )
                    })
                }
            </div>
        )
    }
}

export default Memepage;