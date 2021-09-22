import React from "react";

import deletelogo from '../../assets/delete.png';
import rotatelogo from '../../assets/rotate.png';
import movelogo from '../../assets/move.png';
import './writer.scss';

class Writer extends React.Component {

    state = {
        focused: false,
        hovered: false,
        pressed: false,
    }

    onActivateHandler = (type) => {
        let dupstate = {...this.state};
        dupstate[type] = true;
        this.setState(dupstate);
    }

    onDeactivateHandler = (type) => {
        let dupstate = {...this.state};
        dupstate[type] = false;
        this.setState(dupstate);
    }

    onRotateHandler = (event) => {
        let { pressed } = this.state;
        let { current } = this.props;
        let currElement = document.getElementById(`Writer${current}`);
        let {left, top, width, height} = currElement.getBoundingClientRect();

        if (pressed) {
            let x = left + width / 2;
            let y = top + height / 2;
            const angle = Math.atan2(event.clientY - y, event.clientX - x);
            currElement.style.transform = `rotate(${angle}rad)`;
        }
    }

    render() {
        let { focused, hovered } = this.state;
        let { style, top, left, current, value, ondelete, ontext, onactivate } = this.props;

        return (
            <div className="Writer" id={`Writer${current}`} style={{ top: top, left: left }} 
                onMouseMove={this.onRotateHandler}
                onFocus={() => this.onActivateHandler("focused")} onBlur={() => this.onDeactivateHandler("focused")} >
                <textarea className="Writer--Area" id={`Writer--AreaField${current}`} value={value} 
                    onChange={ontext} onMouseUp={() => this.onDeactivateHandler("pressed")}
                    type="text" style={{...style}} />
                {
                    (( focused || hovered ) && value !== '' ) ? 
                        <div className="Writer--Tools" onMouseEnter={() => this.onActivateHandler("hovered")} 
                            onMouseLeave={() => this.onDeactivateHandler("hovered")} >
                            {
                                window.innerWidth < 500 ? null :
                                    <React.Fragment>
                                        <img src={movelogo} className="Writer--ToolsLogo" alt="move" draggable={false}
                                            onMouseDown={onactivate} />
                                        <img src={rotatelogo} className="Writer--ToolsLogo" alt="rotate" draggable={false}
                                            onMouseDown={() => this.onActivateHandler("pressed")} 
                                            onMouseUp={() => this.onDeactivateHandler("pressed")} />
                                    </React.Fragment>
                            }
                            <img src={deletelogo} className="Writer--ToolsLogo" alt="delete" draggable={false} 
                                onClick={ondelete} style={{ marginRight: '10px' }} />
                        </div> : null
                }
            </div>
        )
    }
}

export default Writer;