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
        font: '',
        active: 'color'
    }

    onDownloadHandler = (event) => {
        htmlToImage.toPng(document.getElementById('meme'))
        .then(function (dataUrl) {
            download(dataUrl, 'meme');
        });
    }

    onChangeHandler = (event) => {
        event.preventDefault();
        this.setState({ size: event.target.value })
    }

    onSelectHandler = (type, value) => {
        switch(type) {
            case 'font':
                this.setState({ font: value });
                break;
            default:
                break;
        }
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
        let { textCount, top, left, color, size, active, font } = this.state;
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
                    <div className="Editor--ContentOptions">
                        {
                            active === 'color' ? 
                                <TwitterPicker triangle="hide" color={color} onChangeComplete={this.handleColorSwatch}/> :
                                active === 'font' ? 
                                    <div className="Editor--ContentFont">
                                        <div className={`Editor--ContentFontType ${font === "'Montserrat', sans-serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onSelectHandler('font',"'Montserrat', sans-serif")} style={{ fontFamily: "'Montserrat', sans-serif" }} >
                                            Montserrat
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Roboto', sans-serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onSelectHandler('font',"'Roboto', sans-serif")} style={{ fontFamily: "'Roboto', sans-serif" }} >
                                                Roboto
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Open Sans', sans-serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onSelectHandler('font',"'Open Sans', sans-serif")} style={{ fontFamily: "'Open Sans', sans-serif" }} >
                                                Open Sans
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Stick No Bills', sans-serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onSelectHandler('font',"'Stick No Bills', sans-serif")} style={{ fontFamily: "'Stick No Bills', sans-serif" }} >
                                                Stick No Bills
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Oswald', sans-serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onSelectHandler('font',"'Oswald', sans-serif")} style={{ fontFamily: "'Oswald', sans-serif" }} >
                                                Oswald
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Grechen Fuemen', cursive" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onSelectHandler('font',"'Grechen Fuemen', cursive")} style={{ fontFamily: "'Grechen Fuemen', cursive" }} >
                                                Grechen Fuemen
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Gluten', cursive" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onSelectHandler('font',"'Gluten', cursive")} style={{ fontFamily: "'Gluten', cursive" }} >
                                                Gluten
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Amatic SC', cursive" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onSelectHandler('font',"'Amatic SC', cursive")} style={{ fontFamily: "'Amatic SC', cursive" }} >
                                                Amatic SC
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Cinzel', serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onSelectHandler('font',"'Cinzel', serif")} style={{ fontFamily: "'Cinzel', serif" }} >
                                                Cinzel
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Orbitron', sans-serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onSelectHandler('font',"'Orbitron', sans-serif")} style={{ fontFamily: "'Orbitron', sans-serif" }} >
                                                Orbitron
                                        </div>
                                    </div> :
                                    active === 'style' ? 
                                        <Input type="text" value={size} placeholder="Font Size in pixels" changed={this.onChangeHandler} /> : null
                        }
                    </div>
                    <Button onClick={e => this.onDownloadHandler(e)}>Generate</Button>
                </div>
            </div>
        )
    }
}

export default Editor;