import { connect } from 'react-redux'
import { withRouter } from "react-router";

import NavigationBar from './NavigationBar';

export const mapStateToProps = state => ({
  // TODO: Provide user data from state
  
    user: state.user.data,
   
  
})

const mapDispatchToProps = dispatch => {
  // TODO: Provide logout to user
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationBar));
