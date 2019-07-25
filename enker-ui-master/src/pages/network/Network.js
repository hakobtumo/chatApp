import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Widget, addResponseMessage } from 'react-chat-widget';
import Socket from '../../socket';
import 'react-chat-widget/lib/styles.css';
import './network.css';
// TODO: use --> import Socket from '../../socket';

/**
 * Main React Component for the networking page (WYSIWIG, Chat, Video, Canvas)
 */
class NetworkPage extends Component {
  constructor(props) {
    //TODO: set state and handlers for chat message and WYSIWIG
    super(props)
    this.state={}
  }
  componentDidMount() {
    // TODO: connect to socket and emit/recieve messages for chat and editor
    Socket.connect(user=>{
     user.on('messageFromServer',(msg) => {
      addResponseMessage(msg)
     })
    })
  }
  componentWillUnmount() {
    Socket.connect(user => {
      user.removeListener('messageFromServer');
    })

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
            <span>TODO: add tabs for Canvas and WYSIWIG</span>
            { 
              // TODO: add tabs for Canvas and WYSIWIG }
            }
          </Col>
          <Col>
            <div>TODO: add VideoChat element
              {
                // TODO: add video chat element
              }
            </div>
          </Col>
        </Row>
        
      </Container>
    )
  }
}

export default NetworkPage;
