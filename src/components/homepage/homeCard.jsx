import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Container, Row
} from 'reactstrap';
import Axios from 'axios';


export default class HomeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: []
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:6780/api/user/komoditas/')
            .then(res => {
                this.setState({
                    datas: res.data.result
                })
            })
    }

    render() {
        return (
            <div>
                <Container>
                    <div>
                        <h2>Content</h2>
                    </div>
                    <Row>
                        {
                            this.state.datas.map(data =>
                                <Card className='col-md-4'>
                                    <CardImg className="card-img" top width="100%" src={data.foto} alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>{data.nama_ternak}</CardTitle>
                                        <CardText>{data.content}</CardText>
                                    </CardBody>
                                </Card>
                            )
                        }
                    </Row>
                </Container>
            </div>
        )
    }
}
