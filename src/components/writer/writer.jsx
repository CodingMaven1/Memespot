import React from "react";
import './writer.scss';

class Writer extends React.Component {

    state = {
        value: '',
        focused: false
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

    render() {
        let { value, focused } = this.state;
        let { size, color, top, left, current } = this.props;

        return (
            <div className="Writer" style={{ top: top, left: left }} >
                <textarea className="Writer--Area" id={`Writer--AreaField${current}`} value={value} onChange={this.onTextHandler} type="text"
                    style={{ fontSize: `${size + "px"}`, color: color, top: top, left: left}} 
                    onFocus={this.onFocusHandler} onBlur={this.onBlurHandler} />
                {
                    ( focused && value !== '' ) ? <div className="Writer--Tools"></div> : null
                }
            </div>
        )
    }
}

export default Writer;