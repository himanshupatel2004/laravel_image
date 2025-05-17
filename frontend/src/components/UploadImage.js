import React, { Component } from 'react';
import axios from 'axios';

export default class UploadImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: '',
            images: []

        }

    }
    componentDidMount() {
        this.getImages();
    }


    getImages = () => {
        axios.get('http://localhost:8000/api/images')
        .then(res => {
            const imageData = Array.isArray(res.data) ? res.data : res.data.images;

            if (imageData) {
                this.setState({
                    images: imageData
                });
            }
        })
        .catch(err => {
            console.error('Error fetching images:', err);
        });
    };

    handleChange = (e) => {
        this.setState({
            image: e.target.files[0]
        });
    }

    submitForm = (e) => {
        e.preventDefault();
        const url = "http://localhost:8000/api/upload";
        const data = new FormData();
        data.append('image', this.state.image);
        console.log('This is http', url);

        // axios
        axios.post(url, data)
        .then(res => {
            console.log(res);
            this.getImages(); 
        })
        .catch(err => {
            console.error('Upload error:', err);
        });

    }

    render() {
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-sm-4">
                        <div className="card p-4">
                            <form onSubmit={this.submitForm}>
                                <input type="file" className="form-control" onChange={this.handleChange}></input>
                                <button className="btn btn-success mt-3" type='submit'>Upload</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {
                        this.state.images.map((image, index) => (
                            <div className="col-sm-3" key={index}>
                                <img className="img-thumbnail" src={"http://localhost:8000/images/" + image.name} alt="Uploaded" />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}