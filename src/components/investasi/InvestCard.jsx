import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Container, Row, Spinner
} from 'reactstrap';
import Axios from 'axios';

import { Link } from 'react-router-dom';

export default class InvestCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            isLoading: true
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:6780/api/user/komoditas/`)
            .then(res => {
                this.setState({
                    datas: res.data.result,
                    isLoading: false
                })
            })
    }

    render() {
        let Spin;
        if (this.state.isLoading === true) {
            Spin = <Spinner color="primary" />
        } else {
            Spin = <Container>
                <div>
                    <h2>Content</h2>
                </div>
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
