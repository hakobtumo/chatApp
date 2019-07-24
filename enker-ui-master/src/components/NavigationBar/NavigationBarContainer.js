import { connect } from 'react-redux'
import { withRouter } from "react-router";
import {logoutUser} from '../../redux/actions'
import NavigationBar from './NavigationBar';

export const mapStateToProps = state => ({
  // TODO: Provide user data from state
    user: state.user,
})

const mapDispatchToProps = dispatch => {
  // TODO: Provide logout to user
  return {
    logoutUser:(user)=>{
      dispatch(logoutUser(user))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationBar));
