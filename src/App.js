import { React, Component } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import ArchiveItem from './components/archive_item.jsx'
import './App.css';
import Arweave from "arweave";
import ArDB from "ardb";
import 'bootstrap/dist/css/bootstrap.min.css';

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 100000,
  logging: false,
});

const ardb = new ArDB(arweave);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      archives: [],
    };
  }

  componentDidMount() {
    ardb
      .search("transactions")
      .tag('User-Agent', 'ArweaveChrome/2.3.1')
      .limit(100)
      .find()
      .then((Txs) => {
        this.setState({archives: Txs})
      });
  }

  loadArchives = () => {
    let archives = []
    let a = this.state.archives
    for (let i in a) {
      try {
        let id = a[i].node.id
        let title = a[i].node.tags[3].value
        let url = a[i].node.tags[2].value
        let timestamp = a[i].node.tags[4].value
        let date = new Date(timestamp*1000).toDateString()
        archives.push(<ArchiveItem title={title} url={url} date={date} id={id}/>)
      } catch { }
    }
    return archives
  }

  render() {
    const archives = this.loadArchives()
    return (
      <div className="App">
        <header className="App-header">
          <Container className="m-4">
            <Row>
              <Col xs={9} className="justify-content-start">
                <h5 className="mt-2">Recently Archived with <a className="title-link" target="_blank" rel="noreferrer" href="https://arweave.org">Arweave</a></h5>
              </Col>
              <Col className="pull-right justify-content-end">
                <Button variant="outline-primary" target="_blank" href="https://chrome.google.com/webstore/detail/arweave/iplppiggblloelhoglpmkmbinggcaaoc/related?hl=en-GB">Archive a page</Button>
              </Col>
            </Row>
            <hr></hr>
          </Container>
          <p>
            { archives }
          </p>
        </header>
      </div>
    );
  }
}

export default App;
