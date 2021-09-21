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
        value: [],
        top: [],
        left: [],
        pressed: [],
        currentindex: null,
        color: '#000',
        size: '25',
        font: "'Impact', sans-serif",
        active: 'color',
        bold: false,
        italic: false,
        uppercase: false,
    }

    onDownloadHandler = (event) => {
        htmlToImage.toPng(document.getElementById('meme'))
        .then(function (dataUrl) {
            download(dataUrl, 'meme');
        });
    }

    onChangeHandler = (event, type, index) => {
        event.preventDefault();
        let newvalue = [...this.state.value];
        let newpress = [...this.state.pressed];

        switch (type) {
            case "size":
                this.setState({ size: event.target.value });
                break;
            case "value":
                newvalue[index] = event.target.value;
                this.setState({ value: newvalue });
                break;
            case "activate":
                newpress[index] = true;
                this.setState({ pressed: newpress, currentindex: index });
                break;
            case "deactivate":
                newpress[index] = false;
                this.setState({ pressed: newpress, currentindex: null });
                break;
            default:
                break;
        }
    }

    onFontHandler = (value) => {
        this.setState({ font: value });
    }

    onStyleHandler = (type) => {
        let { bold, italic, uppercase } = this.state;

        switch(type) {
            case 'bold':
                this.setState({ bold: !bold });
                break;
            case 'italic':
                this.setState({ italic: !italic });
                break;
            case 'uppercase':
                this.setState({ uppercase: !uppercase });
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
        let newval = [...this.state.value];
        let newpress = [...this.state.pressed];
        let arrlen = newval.length;

        newleft[arrlen] = event.nativeEvent.offsetX;
        newtop[arrlen] = event.nativeEvent.offsetY;
        newpress.push(false)
        newval.push('')
        this.setState({ left: newleft, top: newtop, value: newval, pressed: newpress});
    }

    onDeleteHandler = (index) => {
        let newleft = [...this.state.left];
        let newtop = [...this.state.top];
        let newvalue = [...this.state.value];
        let newpress = [...this.state.pressed];

        newleft.splice(index, 1);
        newtop.splice(index, 1);
        newvalue.splice(index, 1)
        newpress.splice(index, 1)

        this.setState({ left: newleft, top: newtop, value: newvalue, pressed: newpress });
    }

    onMoveHandler = (event) => {
        event.preventDefault();
        let { pressed, currentindex } = this.state;

        if (pressed[currentindex] && currentindex !== null) {
            let newleft = [...this.state.left];
            let newtop = [...this.state.top];

            newleft[currentindex] = event.nativeEvent.offsetX;
            newtop[currentindex] = event.nativeEvent.offsetY;

            this.setState({ left: newleft, top: newtop })
        }
    }

    render(){
        let { top, left, value, color, size, active, font, bold, italic, uppercase, currentindex } = this.state;
        let { url, id } = this.props;
        let writerstyles = {
            color: color,
            fontSize: `${size}px`,
            fontFamily: font,
            fontWeight: bold ? '700' : '400',
            fontStyle: italic ? 'italic' : 'normal',
            textTransform: uppercase ? 'uppercase' : 'lowercase'
        }

        return(
            <div className="Editor">
                <div id="meme" className="Editor--ImgContainer" onMouseMove={this.onMoveHandler} 
                    onMouseUp={(e) => this.onChangeHandler(e,"deactivate",currentindex)}>
                    <img src={url} alt={id} className="Editor--Img" />
                    <div className="Editor--ImgInsertText" onDoubleClick={e => this.onInsertText(e)}>
                        <div className="Editor--ImgInsertTextContainer">
                            {
                                value.map((val, id) => {
                                    return(
                                        <Writer style={writerstyles} current={id} key={id} top={top[id]} left={left[id]}
                                            value={val} ondelete={() => this.onDeleteHandler(id)} 
                                            ontext={(e) => this.onChangeHandler(e,"value",id)}
                                            onactivate={(e) => this.onChangeHandler(e,"activate",id)}
                                            ondeactivate={(e) => this.onChangeHandler(e,"deactivate",id)} />
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
                                            onClick={() => this.onFontHandler("'Montserrat', sans-serif")} style={{ fontFamily: "'Montserrat', sans-serif" }} >
                                                Montserrat
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Roboto', sans-serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onFontHandler("'Roboto', sans-serif")} style={{ fontFamily: "'Roboto', sans-serif" }} >
                                                Roboto
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Open Sans', sans-serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onFontHandler("'Open Sans', sans-serif")} style={{ fontFamily: "'Open Sans', sans-serif" }} >
                                                Open Sans
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Stick No Bills', sans-serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onFontHandler("'Stick No Bills', sans-serif")} style={{ fontFamily: "'Stick No Bills', sans-serif" }} >
                                                Stick No Bills
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Oswald', sans-serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onFontHandler("'Oswald', sans-serif")} style={{ fontFamily: "'Oswald', sans-serif" }} >
                                                Oswald
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Grechen Fuemen', cursive" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onFontHandler("'Grechen Fuemen', cursive")} style={{ fontFamily: "'Grechen Fuemen', cursive" }} >
                                                Grechen Fuemen
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Gluten', cursive" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onFontHandler("'Gluten', cursive")} style={{ fontFamily: "'Gluten', cursive" }} >
                                                Gluten
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Amatic SC', cursive" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onFontHandler("'Amatic SC', cursive")} style={{ fontFamily: "'Amatic SC', cursive" }} >
                                                Amatic SC
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Cinzel', serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onFontHandler("'Cinzel', serif")} style={{ fontFamily: "'Cinzel', serif" }} >
                                                Cinzel
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Orbitron', sans-serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onFontHandler("'Orbitron', sans-serif")} style={{ fontFamily: "'Orbitron', sans-serif" }} >
                                                Orbitron
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Bungee', cursive" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onFontHandler("'Bungee', cursive")} style={{ fontFamily: "'Bungee', cursive" }} >
                                                Bungee
                                        </div>
                                        <div className={`Editor--ContentFontType ${font === "'Impact', sans-serif" ? 'Editor--ContentFontActive' : ''}`}
                                            onClick={() => this.onFontHandler("'Impact', sans-serif")} style={{ fontFamily: "'Impact', sans-serif" }} >
                                                Impact
                                        </div>
                                    </div> :
                                    active === 'style' ? 
                                        <div className="Editor--ContentStyle">
                                            <div className="Editor--ContentStyleType">
                                                <h1 className="Editor--ContentStyleTitle">Font Size (in px) - </h1>
                                                <Input type="text" value={size} changed={(e) => this.onChangeHandler(e,"size",0)} />
                                            </div>
                                            <div className="Editor--ContentStyleType">
                                                <div className={`Editor--ContentStyleTypeTrait ${italic === true ? 'Editor--ContentStyleTypeActive' : ''}`}
                                                    onClick={() => this.onStyleHandler('italic')} style={{ fontStyle: 'italic'}} >
                                                        Italic
                                                </div>
                                                <div className={`Editor--ContentStyleTypeTrait ${uppercase === true ? 'Editor--ContentStyleTypeActive' : ''}`}
                                                    onClick={() => this.onStyleHandler('uppercase')} style={{ textTransform: 'uppercase'}} >
                                                        Uppercase
                                                </div>
                                                <div className={`Editor--ContentStyleTypeTrait ${bold === true ? 'Editor--ContentStyleTypeActive' : ''}`}
                                                    onClick={() => this.onStyleHandler('bold')} style={{ fontWeight: 'bold'}} >
                                                        Bold
                                                </div>
                                            </div>
                                        </div> : null
                        }
                    </div>
                    <Button onClick={e => this.onDownloadHandler(e)}>Generate</Button>
                </div>
            </div>
        )
    }
}

export default Editor;