import React from "react";
import htmlToImage from 'html-to-image';
import download from 'downloadjs';
import Writer from '../writer/writer';
import Input from '../input/input';
import Button from '../button/button';
import { TwitterPicker } from 'react-color';
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

    onClickHandler = (event) => {
        htmlToImage.toPng(document.getElementById('meme'))
        .then(function (dataUrl) {
            download(dataUrl, 'meme');
        });
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

    handleColorSwatch = (color) => {
        let statecolor = this.state.color;
        statecolor = color.hex;
        this.setState({color: statecolor})
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
                <div id="meme" className="Editor--ImgContainer">
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
                    <TwitterPicker triangle="hide" onChangeComplete={this.handleColorSwatch}/>
                    <Input type="text" value={size} placeholder="Font Size in pixels" changed={event => this.onOtherInputHandler(event, "size")} />
                    <Button onClick={e => this.onClickHandler(e)} type="submit">Generate</Button>
                </div>
            </div>
        )
    }
}

export default Editor;