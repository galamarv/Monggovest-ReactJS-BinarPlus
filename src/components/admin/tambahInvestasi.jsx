import React, { Component, createRef } from 'react'
import Dropzone from 'react-dropzone'
import AppHeader from '../common/AppHeader';
import { Container, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from 'axios';
 
const dropzoneRef = createRef()


export default class addInvest extends Component {
 
    constructor(props) {
       
        super(props);
        this.state = {
            image: '',
            nama_ternak: '',
            asal: '',
            datasWithImg:[]
        };
        this.handleChangenama_ternak = this.handleChangenama_ternak.bind(this)
        this.handleChangeasal= this.handleChangeasal.bind(this)
        this.sendData = this.sendData.bind(this)
    }
 
    sendData(e){
        e.preventDefault();
        //let tok = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXJuYWsiOltdLCJfaWQiOiI1ZDIwNGRiZjcwNzY5NzY3OTQ1YzFlYWQiLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR6elNkT24uZUNiNDVIeVFkMVMub1RPY2dyVlpoRjdHZXpkRTJTTWJsZnNmUlNQejBrdC90TyIsIl9fdiI6MCwiaWF0IjoxNTYzNDM0ODk3fQ.zt8_K8Z4p2H_TjRVhwifY2WrmxEe4_5SxgPHTT2prjA"
        Axios.post('http://localhost:6780/api/admin/post', 
                {
                nama_ternak: this.state.nama_ternak, foto: this.state.image.url, asal: this.state.asal
        },
        {
            headers: {
                'Authorization': localStorage.getItem("TOKEN")
            }} ).then(res => {
            this.setState({
                datasWithImg: res.data
            })
        })
    }
 
 
    handleUploadImages = images => {
        // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()
        const uploads = images.map(image => {
            // our formdata
            const formData = new FormData();
            formData.append("file", image);
            formData.append("tags", 'TAGS'); // Add tags for the images - {Array}
            formData.append("upload_preset", 'bpv2dvup'); // Replace the preset name with your own
            formData.append("api_key", "936722557831115"); // Replace API key with your own Cloudinary API key
            formData.append("timestamp", (Date.now() / 1000) | 0);
 
            // Replace cloudinary upload URL with yours
            return Axios.post(
                "https://api.cloudinary.com/v1_1/galamarv/image/upload",
                formData,
                { headers: { "X-Requested-With": "XMLHttpRequest" } })
                .then(response => {
                    this.setState({
                        image: response.data
                    })
                })
        });
 
        // We would use axios `.all()` method to perform concurrent image upload to cloudinary.
        Axios.all(uploads).then(() => {
            // ... do anything after successful upload. You can setState() or save the data
            console.log(uploads.url)
        });
    }
 
    handleChangenama_ternak(event) {
        this.setState({nama_ternak: event.target.value});
    }
 
    handleChangeasal(event) {
        this.setState({asal: event.target.value});
    }
 
    render() {
        console.log('images', this.state.image.url)
        //console.log(dataheader)
 
        let imageUpload
        if (this.state.image.url === undefined) {
            imageUpload =
            <Dropzone ref={dropzoneRef}
                onDrop={this.handleUploadImages}
            >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <img style={{width: 100}} src="https://image.flaticon.com/icons/png/512/3/3901.png" alt="" srcset=""/>
                    </div>
                )}
            </Dropzone>
        } else {
            imageUpload = <img style={{width: 100}} src={this.state.image.url} alt="" srcset="" />
        }
 
        return (
            <div>
                <AppHeader />
                <Container>
                    <div>
                        <Form onSubmit={this.sendData}>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>Images</Label>
                                <Col sm={2}>
                                    {imageUpload}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>nama_ternak</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.nama_ternak} onChange={this.handleChangenama_ternak} placeholder="nama_ternak" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleText" sm={2}>asal</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.asal} onChange={this.handleChangeasal} />
                                </Col>
                            </FormGroup>
                            <Col sm={{ size: 10, offset: 2 }}>
                                <Button>Submit</Button>
                            </Col>
                        </Form>
                    </div>
                </Container>
 
            </div>
        )
    }
}