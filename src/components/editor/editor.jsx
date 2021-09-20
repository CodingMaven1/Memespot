import React from "react";
import htmlToImage from 'html-to-image';
import download from 'downloadjs';
import { TwitterPicker } from 'react-color';

import Writer from '../writer/writer';
import Input from '../input/input';
import Button from '../button/button';

import './editor.scss';

class Editor extends React.Component{

    state = {
        top: [],
        left: [],
        textCount: 0,
        color: '',
        size: '',
        active: 'color'
    }

    onClickHandler = (event) => {
        htmlToImage.toPng(document.getElementById('meme'))
        .then(function (dataUrl) {
            download(dataUrl, 'meme');
        });
    }

    onSizeHandler = (event) => {
        event.preventDefault();
        this.setState({ size: event.target.value })
    }

    onToolHandler = (type) => {
        this.setState({ active: type })
    }

    handleColorSwatch = (color) => {
        let statecolor = color.hex;
        this.setState({color: statecolor})
    }

    onInsertText = (event) => {
        let newleft = [...this.state.left];
        let newtop = [...this.state.top];
        let { textCount } = this.state;

        newleft[textCount] = event.nativeEvent.offsetX;
        newtop[textCount] = event.nativeEvent.offsetY;
        this.setState({ left: newleft, top: newtop, textCount: textCount+1 });
    }

    render(){
        let { textCount, top, left, color, size, active } = this.state;
        let { url, id } = this.props;
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
                                count.map(id => {
                                    return(
                                        <Writer color={color} size={size} current={id} key={id} top={top[id]} left={left[id]} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="Editor--Content">
                    <h1 className="Editor--ContentHeadline">Triple Click to edit the meme!</h1>
                    <div className="Editor--ContentTools">
                        <div className={`Editor--ContentToolType ${active === 'color' ? 'Editor--ContentToolActive' : ''}`}
                            onClick={() => this.onToolHandler('color')}>
                            Color
                        </div>
                        <div className={`Editor--ContentToolType ${active === 'font' ? 'Editor--ContentToolActive' : ''}`}
                            onClick={() => this.onToolHandler('font')}>
                            Font
                        </div>
                        <div className={`Editor--ContentToolType ${active === 'style' ? 'Editor--ContentToolActive' : ''}`}
                            onClick={() => this.onToolHandler('style')}>
                            Style
                        </div>
                    </div>
                    <div style={{marginBottom: '2rem'}}>
                        {
                            active === 'color' ? 
                                <TwitterPicker triangle="hide" color={color} onChangeComplete={this.handleColorSwatch}/> :
                                active === 'style' ? 
                                    <Input type="text" value={size} placeholder="Font Size in pixels" changed={this.onSizeHandler} /> : null
                        }
                    </div>
                    <Button onClick={e => this.onClickHandler(e)}>Generate</Button>
                </div>
            </div>
        )
    }
}

export default Editor;