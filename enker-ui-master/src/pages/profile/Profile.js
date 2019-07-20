import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {Redirect} from 'react-router-dom';
import { Container } from 'react-bootstrap';

/**
 * React component for Profile page
 */
class Profile extends Component {
  // constructor() {
    // TODO: set state based on props, drop down values for learningTargets, locations, form event handlers
  // }
  handleSubmit(e) {
    // TODO: EXTRA WORK - handle form submit (if doing updates)
  }
  handleChange(type, value) {
    // TODO: EXTRA WORK - handle form change to set state (if doing updates)
  }
  render() {
    // TODO: use to redirect to home page if user not logged in
    // if (this.props.user == null) {
    //   return (
    //     <Redirect to={{
    //       pathname: '/',
    //     }} />
    //   )
    // }
    return (
      <Container className="mt-5">
        <div>Profile</div>
      </Container>      
    )
  }
}

Profile.propTypes = {
  updateUser: PropTypes.func,
  user: PropTypes.object,
  userError: PropTypes.string,
}

export default Profile;
