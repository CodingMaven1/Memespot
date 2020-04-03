import React from "react";
import Writer from '../writer/writer';
import Input from '../input/input';
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
            textCount: 0,
            color: '',
            size: ''
        }
    }

    onChangeHandler = (event,type) => {
        let value = this.state.value;
        value[type] = event.target.value;
        this.setState({value : value})
    }

    onOtherInputHandler = (event,type) => {
        let dupState = this.state;
        dupState[type] = event.target.value;
        this.setState({dupState})
    }

    onInsertText = (event) => {
        let {left, top, textCount} = this.state;
        left[textCount] = event.nativeEvent.offsetX;
        top[textCount] = event.nativeEvent.offsetY;
        textCount = textCount +1;
        this.setState({left: left, top:top, textCount: textCount}, () => console.log(this.state));
    }

    render(){
        let {id, url, value, textCount, top, left, color, size} = this.state;
        let count = [];
        for(let j=0; j<textCount; j++){
            count[j] = j;
        }

        return(
            <div className="Editor">
                <div className="Editor--ImgContainer">
                    <img src={url} alt={id} className="Editor--Img" />
                    <div className="Editor--ImgInsertText" onDoubleClick={e => this.onInsertText(e)}>
                        <div className="Editor--ImgInsertTextContainer">
                            {
                                count.map((opt,index) => {
                                    return(
                                        <Writer color={color} size={size} key={index} top={top[index]} left={left[index]} changed={event => this.onChangeHandler(event,index)} value={value[index]} />
                                        )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="Editor--Content">
                    <h1 className="Editor--ContentHeadline">Triple Click to edit the meme!</h1>
                    <Input type="text" value={color} placeholder="Choose the color" changed={event => this.onOtherInputHandler(event, "color")} />
                    <Input type="text" value={size} placeholder="Font Size in pixels" changed={event => this.onOtherInputHandler(event, "size")} />
                </div>
            </div>
        )
    }
}

export default Editor;