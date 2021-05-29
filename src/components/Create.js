import React, { Component } from 'react';
import './App.css';
import UploadForm from './UploadForm.js';

class Create extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="contain">
                <h1 align="center" class="w3-tangerine">Upload 3D content</h1>
                <UploadForm createAsset = {this.props.createAsset}/>
            </div>
        );
    }
}

export default Create;