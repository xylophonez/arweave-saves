import { React, Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default class ArchiveItem extends Component {
    render() {
        return(
            <>
                <Container className="p-2 border-dark">
                    <Row className="">
                        <Col>
                            <code>{this.props.date}</code>
                        </Col>
                        <Col xs={7}>
                            <a className="title-link" rel="noreferrer" target="_blank" href={`https://arweave.net/${this.props.id}`}>
                                {this.props.title}
                            </a>
                        </Col>
                        <Col>
                        <a href={this.props.url} rel="noreferrer" target="_blank">[original]</a>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}