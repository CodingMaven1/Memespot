import React from "react";

import deletelogo from '../../assets/delete.png';
import expandlogo from '../../assets/expand.png';
import rotatelogo from '../../assets/rotate.png';
import movelogo from '../../assets/move.png';
import './writer.scss';

class Writer extends React.Component {

    state = {
        value: '',
        focused: false,
        hovered: false
    }

    onTextHandler = (event) => {
        this.setState({ value : event.target.value })
    }

    onFocusHandler = () => {
        this.setState({ focused: true })
    }

    onBlurHandler = () => {
        this.setState({ focused: false })
    }

    onDeleteHandler = () => {
        let { current } = this.props;

        let currElement = document.getElementById(`Writer--AreaField${current}`);
        currElement.remove();
    }

    onMouseEnterHandler = () => {
        this.setState({ hovered: true })
    }

    onMouseLeaveHandler = () => {
        this.setState({ hovered: false })
    }

    render() {
        let { value, focused, hovered } = this.state;
        let { size, color, top, left, current } = this.props;

        return (
            <div className="Writer" style={{ top: top, left: left }} onFocus={this.onFocusHandler} onBlur={this.onBlurHandler} >
                <textarea className="Writer--Area" id={`Writer--AreaField${current}`} value={value} onChange={this.onTextHandler} 
                    type="text" style={{ fontSize: `${size + "px"}`, color: color, top: top, left: left}} />
                {
                    (( focused || hovered ) && value !== '' ) ? 
                        <div className="Writer--Tools" onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler} >
                            <img src={movelogo} className="Writer--ToolsLogo" alt="move" />
                            <img src={rotatelogo} className="Writer--ToolsLogo" alt="move" />
                            <img src={deletelogo} className="Writer--ToolsLogo" alt="move" onClick={this.onDeleteHandler} />
                            <img src={expandlogo} className="Writer--ToolsLogo" alt="move" />
                        </div> : null
                }
            </div>
        )
    }
}

export default Writer;