import React from 'react'

import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <div>
          <div><span>Username: {this.props.currentUser.username}</span></div>
          <div><span>Email: {this.props.currentUser.email}</span></div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Profile)