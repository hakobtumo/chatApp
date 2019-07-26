import React, { Component } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import { Widget, addResponseMessage } from 'react-chat-widget';
import Socket from '../../socket';
import 'react-chat-widget/lib/styles.css';
import './network.css';
import VideoChat from './VideoChat';
// TODO: use --> import Socket from '../../socket';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import debounce from 'debounce';

// Drawing
import Drawing from './Drawing';
/**
 * Main React Component for the networking page (WYSIWIG, Chat, Video, Canvas)
 */
class NetworkPage extends Component {
  constructor(props) {
    //TODO: set state and handlers for chat message and WYSIWIG
    super(props)
    this.state={}

    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  componentDidMount() {
    // TODO: connect to socket and emit/recieve messages for chat and editor
    Socket.connect(user=>{
     user.on('messageFromServer',(msg) => {
      addResponseMessage(msg)
     })
     user.on('editor-message', (fromUser, message) => {
      this.setState({
        editorText: message
      })
    })
    })
  }
  handleEditorChange(source, editor) {
    console.log('source', source);
    if (source === 'user') {
      this.emitEditorMessage(editor.getContents());
    }
  }
  emitEditorMessage(message) {
    Socket.users.emit('editor-message', this.props.withUser, this.props.currentUser, message);
  }
  componentWillUnmount() {
    Socket.connect(user => {
      user.removeListener('messageFromServer');
    })
    Socket.users.removeListener('editor-message');

    // TODO: cleanup listeners for chat/ ed itor sockets
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    console.log(this.props.withUser+' sadasd')
    Socket.connect(user=>{
      user.emit('sendingAMessage', newMessage, this.props.withUser)
    })
    // Now send the message throught the backend API
  }
  render() {
    return (
      <Container fluid={true} className="p-0">
        { 
          // TODO: Add chat widget 
        } 
       <div className="App">
        <Widget 
        handleNewUserMessage={this.handleNewUserMessage}
        title={"TUMO Chat"}
        subtitle={`You are chating with ${this.props.withUser.firstName} ${this.props.withUser.lastName}`}
        />
      </div>
        <Row noGutters={true}>
        <Col>
            <Tabs defaultActiveKey="editor" id="uncontrolled-tab-example">
              <Tab eventKey="editor" title="Editor">
                <ReactQuill
                  id="chat"
                  value={this.state.editorText}
                  onChange={(content, delta, source, editor) => { debounce(this.handleEditorChange(source, editor)) } }
                />
              </Tab>
              <Tab eventKey="canvas" title="Canvas">
                <Drawing withUser={this.props.withUser} user={this.props.user} />
              </Tab>
            </Tabs>            
          </Col>
          <Col>
            <div>
            
                <VideoChat
                  user={this.props.user}
                  caller={this.props.receiver ? this.props.withUser : this.props.user}
                  receiver={this.props.receiver ? this.props.user : this.props.withUser}
                /> 
              
            </div>
          </Col>
        </Row>
        
      </Container>
    )
  }
}

export default NetworkPage;
