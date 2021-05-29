import React, { Component } from 'react';
import './App.css';
import UploadForm from './UploadForm.js';

class Create extends Component {
    render() {
        return (
            <div className="contain">
                <h1 align="center" className="w3-tangerine">Upload 3D content</h1>
                <UploadForm createAsset={this.props.createAsset} />
            </div>
        );
    }
}

export default Create;