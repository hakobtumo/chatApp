import React from 'react';
import LioWebRTC from 'liowebrtc'
/**
 * VideoChat - WebRTC Workshop: will contain all the logic to start video chat with peer
 */
class VideoChat extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      nick:props.user ? props.user.firstName : null,
      roomID: `tumochat${[props.caller.email, props.reveiver.email].sort().join()}`,
      muted: true,
      camPaused: false,
      peers: [],
      inCall:false
    };
    this.videoRef= React.createRef();
    this.remoteVideos = {};

  }
  componentDidMount() {
    // TODO: Initialize webrtc object and event listeners
    // addVideo, removeVideo handlers when adding/removing peers to room
    // handleConnectionError - error handler
    // startCall/stopCall - trigger for joining and leaving a room
    // readyToJoin -- joining a room
    // generateRemotes - video elements of peers
    this.webrtc = new LioWebRTC({
      // The url for your signaling server. Use your own in production!
      url: 'https://sm1.lio.app:443/',
      // The local video ref set within your render function
      localVideoEl: this.localVid,
      // Immediately request camera access
      autoRequestMedia: true,
      // Optional: nickname
      nick: this.props.user.firstName,
      debug: true,
      localVideo:{
        mirror:false,
        muted:true,
      },
      stunservers:['stun1.l.google.com:19302','stun2.l.google.com:19302'],
      turnservers:['ec2-54-213-136-50.us-west-2.compute.amazonaws.com']
    });

    this.webrtc.on('peerStreamAdded', this.addVideo);
    this.webrtc.on('removedPeer', this.removeVideo);
    // this.webrtc.on('ready', this.readyToJoin);
    this.webrtc.on('iceFailed', this.handleConnectionError);
    this.webrtc.on('connectivityError', this.handleConnectionError);
  }
  componentWillUnmount() {
    // TODO: disconnect when removing component
  }
  addVideo = (stream, peer) => {
    this.setState({ peers: [...this.state.peers, peer] }, () => {
      this.webrtc.attachStream(stream, this.remoteVideos[peer.id]);
      this.setState({
        inCall:true
      })
    });
  }

  removeVideo = (peer) => {
    this.setState({
      peers: this.state.peers.filter(p => !p.closed)
    });
  }

  handleConnectionError = (peer) => {
    const pc = peer.pc;
    console.log('had local relay candidate', pc.hadLocalRelayCandidate);
    console.log('had remote relay candidate', pc.hadRemoteRelayCandidate);
  }
  startCall(){
    this.webrtc.startLocalVideo();
    this.readyToJoin() 
  }
  stopCall(){
   this.webrtc.leave();
   this.setState({
     inCall:false,
   })
  }
  readyToJoin = () => {
    // Starts the process of joining a room.
    this.webrtc.joinRoom(this.state.roomID, (err, desc) => {
    });
  }
  generateRemotes = () => this.state.peers.map((p) => (
    <div key={p.id}>
      <div id={/* The video container needs a special id */ `${this.webrtc.getContainerId(p)}`}>
        <video
          // Important: The video element needs both an id and ref
          id={this.webrtc.getDomId(p)}
          ref={(v) => this.remoteVideos[p.id] = v}
          />
      </div>
        <p>{p.nick}</p>
    </div>
    ));

  render() {
    // TODO: render video element of user and peers
    return (
      <div>
        {this.generateRemotes()}
        <div className="d-flex justify-content-center align-items-center">
          <video controls width={this.state.inCall ? "50%" : "100%"} height="auto" autoPlay ref={(vid) => { this.localVid = vid; }}></video>
          <div style={{position: "absolute", padding: "5px", alignSelf: "baseline"}}>
            <Badge variant="info">{this.props.user.firstName}</Badge>
          </div>
          <div className="position-absolute">
            <Button disabled={this.state.inCall ? true : null} variant="link" onClick={() => {this.startCall()}}><img width="45px" src={callIcon} alt="call" /></Button>
            <Button disabled={this.state.inCall ? null : true} variant="link" onClick={() => {this.stopCall()}}><img width="45px" src={endCallIcon} alt="endcall" /></Button>
          </div>
        </div>
      </div>
    )   
  }
}

export default VideoChat;
