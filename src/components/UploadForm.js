import React from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Alert from 'react-bootstrap/Alert';
import './UploadForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.nameInput = React.createRef();
        this.priceInput = React.createRef();
        this.urlInput = React.createRef();
        this.acceptedFileFormats = props.acceptedFileFormats ? props.acceptedFileFormats : ".tiff,.pjp,.jfif,.gif,.svg,.bmp,.png,.jpeg,.svgz,.jpg,.webp,.ico,.xbm,.dib,.tif,.pjpeg,.avif,.m4v,.mp4,.mov,.mp3,.wav,.obj,.mtl,.gltf,.glb,.bin,.fbx,.zip,.csv,.usdz,.svg,.stl";
        this.maxFileSize = props.maxFileSize ? props.maxFileSize : 25000000;
        this.callBack = props.createAsset ? props.createAsset : (price, name, fileURL) => { console.log(`File URL: ${fileURL}, Price: CELLO ${price}, Name: ${name}`) };
    }

    state = {
        uploadProgress: 0,
        showSuccessMessage: false,
        showAlert: false,
        alertMessage: '',
        alertVariant: 'secondary',
        fileInputLabel: "Choose 3D Model",
        CancelTokenSource: axios.CancelToken.source(),
        fileSelected: false,
        selectedFileSize: 0
    }

    ResetForm() {
        this.setState({
            uploadProgress: 0,
            fileInputLabel: "Choose 3D Model",
            CancelTokenSource: axios.CancelToken.source(),
            fileSelected: false
        });
        this.fileInput.current.value = "";
        this.nameInput.current.value = "";
        this.priceInput.current.value = "";
        this.urlInput.current.value = "";
    }

    IsUrlValid(userInput) {
        var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
        if (res == null)
            return false;
        else
            return true;
    }

    ShowAlert(alertVariant, alertMessage = '', alertTimeout = 6000) {
        this.setState({
            showAlert: true,
            alertMessage: alertMessage,
            alertVariant: alertVariant
        });
        setTimeout(() => {
            this.setState({
                showAlert: false,
                alertMessage: '',
                alertVariant: 'secondary'
            });
        }, alertTimeout);
    }

    UploadWithURL = event => {
        event.preventDefault();
        if (this.IsUrlValid(this.urlInput.current.value)) {
            this.ShowAlert('success', '3D Model successfully uploaded');
            this.callBack(this.priceInput.current.value, this.nameInput.current.value, this.urlInput.current.value);
        }
        else {
            this.ShowAlert('danger', `Enter a valid URL`, 3000);
        }
    }

    UploadToEchoAR = event => {
        event.preventDefault();
        if (this.state.fileSelected) {
            var formdata = new FormData();
            formdata.append("key", process.env.REACT_APP_ECHOAR_KEY);
            formdata.append("target_type", "2");
            formdata.append("hologram_type", "2");
            formdata.append("email", process.env.REACT_APP_ECHOAR_EMAIL);
            formdata.append("type", "upload");
            formdata.append("file_model", this.fileInput.current.files[0]);

            const options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength !== null) {
                        this.setState({ uploadProgress: Math.round((progressEvent.loaded * 100) / totalLength) });
                    }
                },
                cancelToken: this.state.CancelTokenSource.token
            }

            axios.post('https://console.echoAR.xyz/upload', formdata, options).then((result) => {
                // console.log(result);
                this.ResetForm();
                if (typeof (result.data) == 'string') {
                    console.log(`Result data: ${result.data}`);
                    this.ShowAlert('secondary', result.data);
                }
                else {
                    this.ShowAlert('success', 'File successfully uploaded');
                    this.callBack(this.priceInput.current.value, this.nameInput.current.value, result.data.id);
                }
            }).catch((error) => {
                console.log('error: ', error.message);
                this.ResetForm();
                this.ShowAlert('danger', error.message);
            });;
        }
        else {
            this.ShowAlert('danger', 'You have to select a file', 3000);
        }
    }

    render() {
        return (
            <div className="upload-form-div">
                <form onSubmit={this.UploadWithURL} className="upload-form">
                    <div className="input-group mb-3">
                        <input ref={this.nameInput} type="text" className="form-control" placeholder="Name" />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">CELLO</span>
                        </div>
                        <input ref={this.priceInput} type="test" className="form-control" placeholder="Price" />
                    </div>
                    <div className="input-group mb-3">
                        <input ref={this.urlInput} type="text" className="form-control" id="basic-url" placeholder="3D Model URL" />
                    </div>
                    {/* <div className="custom-file">
                        <input ref={this.fileInput} type="file" name="file_model" id="customFile" className="custom-file-input" onChange={(event) => {
                            event.preventDefault();
                            if (this.fileInput.current.files[0]) {
                                if (this.fileInput.current.files[0].size > this.maxFileSize) {
                                    this.ShowAlert('danger', `Max file size is ${this.maxFileSize / 1000000} MB`, 3000);
                                    this.ResetForm();
                                } else {
                                    this.setState({ fileSelected: true, fileInputLabel: this.fileInput.current.files[0].name, showAlert: false });
                                }
                            }
                        }} accept={this.acceptedFileFormats} />
                        <label className="custom-file-label" htmlFor="customFile">{this.state.fileInputLabel}</label>
                    </div> */}
                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary">Upload</button>
                        {this.state.uploadProgress > 0 && <button type="button" className="btn btn-danger" onClick={() => {
                            this.state.CancelTokenSource.cancel("Upload canceled by user.");
                            this.fileInput.current.value = "";
                        }}>Cancel</button>}
                    </div>
                </form>
                {this.state.uploadProgress > 0 && <ProgressBar animated now={this.state.uploadProgress} label={`${this.state.uploadProgress}%`} />}
                {this.state.showAlert && <Alert variant={this.state.alertVariant}>{this.state.alertMessage}</Alert>}
            </div>
        )
    }
}
