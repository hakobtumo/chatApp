import { connect } from 'react-redux'

import Profile from './Profile';
import { updateUser } from '../../redux/actions';

const mapStateToProps = state => {
  return {
    user: state.user.data,
    userError: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: ({email, password, firstName, lastName, learningTargets, location}) => {
      dispatch(updateUser(email, password, firstName, lastName, learningTargets, location));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);