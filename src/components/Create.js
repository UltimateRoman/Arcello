import React, { Component } from 'react';
import './App.css';
import UploadForm from './UploadForm.js';

class Create extends Component {
    render() {
        return (
            <div className="contain">
                <h1 align="center" class="w3-tangerine">Upload 3D content</h1>
                <UploadForm />
            </div>
        );
    }
}

export default Create;