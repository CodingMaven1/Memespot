import React from "react";
import Writer from '../writer/writer';
import './editor.scss';

class Editor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            url: this.props.url,
            id: this.props.id,
            options: this.props.options,
            value : [],
            top: [],
            left: [],
            textCount: 0
        }
    }

    onChangeHandler = (event,type) => {
        let value = this.state.value;
        value[type] = event.target.value;
        this.setState({value : value})
    }

    onInsertText = (event) => {
        let {left, top, textCount} = this.state;
        left[textCount] = event.nativeEvent.offsetX;
        top[textCount] = event.nativeEvent.offsetY;
        textCount = textCount +1;
        this.setState({left: left, top:top, textCount: textCount}, () => console.log(this.state));
    }

    render(){
        let {id, url, options, value, textCount, top, left} = this.state;
        let option = [];
        let count = [];
        for(let i=0; i<options; i++){
            option[i] = i
        }
        for(let j=0; j<textCount; j++){
            count[j] = j
        }

        return(
            <div className="Editor">
                <div className="Editor--ImgContainer">
                    <img src={url} alt={id} className="Editor--Img" />
                    <div className="Editor--ImgInsertText" onClick={e => this.onInsertText(e)}>
                        <div className="Editor--ImgInsertTextContainer">
                            {
                                count.map((opt,index) => {
                                    return(
                                        <Writer key={index} top={top[index]} left={left[index]} changed={event => this.onChangeHandler(event,index)} value={value[index]} />
                                        )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="Editor--Content">

                </div>
            </div>
        )
    }
}

export default Editor;