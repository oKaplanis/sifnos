import React from "react";
const uuid = require('uuid');

export default class RadioButton extends React.Component {
    render(){
        return(
            <div className="row radio-div">
                {this.props.options.map(option => 
                    <div key={uuid.v4()}>
                        <input 
                            key={uuid.v4()}
                            onChange={this.props.handleChange} 
                            type="radio" 
                            checked={this.props.published === option}
                            className="radio-inputs" 
                            value={`${option}`} 
                            name={`${this.props.name}`} 
                        />
                        <span>{option}</span>            
                    </div>
                )}
            </div>
        );   
    } 
}
