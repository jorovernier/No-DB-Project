import React, { Component } from 'react';

export default class Counter extends Component {
    render(){
        return (
            <span>{this.props.property}</span>
        )
    }
}