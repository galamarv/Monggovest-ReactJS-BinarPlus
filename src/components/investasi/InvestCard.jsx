import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Container, Row, Spinner,
    Form,FormGroup,Label,Col, Input
} from 'reactstrap';
import Axios from 'axios';

import { Link } from 'react-router-dom';

export default class InvestCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            datas: [],
            isLoading: true
        };
        this.handleChangesearch = this.handleChangesearch.bind(this)
        this.sendData = this.sendData.bind(this)
    }

    componentDidMount() {
        Axios.post(`http://localhost:6780/api/user/komoditas/cari`,
        {
            text: this.state.search,
        })
            .then(res => {
                this.setState({
                    datas: res.data.result,
                    isLoading: false
                })
            })
    }
    sendData(e) {
        e.preventDefault();
        Axios.post(`http://localhost:6780/api/user/komoditas/cari`,
        {
            text: this.state.search,
        })
            .then(res => {
                this.setState({
                    datas: res.data.result,
                    isLoading: false
                })
            })
    }
    handleChangesearch(event) {
        this.setState({search: event.target.value});
    }


    render() {
        let Spin;
        if (this.state.isLoading === true) {
            Spin = <Spinner color="primary" />
        } else {
            Spin = <Container>
                <div>
                    <h2>Daftar Investasi</h2>
                </div>
                <Form onSubmit={this.sendData}>
                <FormGroup row>
                                <Label for="exampleEmail" sm={2}>cari</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.search} onChange={this.handleChangesearch} placeholder="cari" />
                                </Col>
                            </FormGroup>
                </Form>
                <Row>
                    {
                        this.state.datas.map(data =>
                            <Card className='col-md-4'>
                                <Link to={`/investasi/${data._id}`}>
                                    <CardImg className="card-img" top width="100%" src={data.foto} alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>{data.nama_ternak}</CardTitle>
                                        <CardText>{data.content}</CardText>
                                    </CardBody>
                                </Link>
                            </Card>
                        )
                    }
                </Row>
            </Container>
        }
        return (
            <div>
                {Spin}
            </div>
        )
    }
}
