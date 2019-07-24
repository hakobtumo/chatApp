import { connect } from 'react-redux'

import Profile from './Profile';

const mapStateToProps = state => {
  return {}; // TODO: pass logged in user data
}

const mapDispatchToProps = dispatch => {
  return {};
  // TODO: EXTRA WORK - pass update user action 
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
