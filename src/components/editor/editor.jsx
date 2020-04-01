import React from "react";
import Input from '../input/input';
import './editor.scss';

class Editor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            url: this.props.url,
            id: this.props.id,
            options: this.props.options,
            value : []
        }
    }

    onChangeHandler = (event,type) => {
        let value = this.state.value;
        value[type] = event.target.value;
        this.setState({value : value})
    }

    render(){
        let {id, url, options, value} = this.state;
        let option = [];
        for(let i=0; i<options; i++){
            option[i] = i
        }
        return(
            <div className="Editor">
                <img src={url} alt={id} className="Editor--Img" />
                <div className="Editor--Content">
                    {
                        option.map((opt,index) => {
                            return(
                                <Input key={index} changed={event => this.onChangeHandler(event,index)} type="text" placeholder={`Text ` + String(index+1)} value={value[index]} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Editor;