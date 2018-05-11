import React from 'react'
import { connect } from 'react-redux'


function mapStateToProps(state) {
  return {
    popupMessages: state.messages.general
  }
}

class Popup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>{JSON.stringify(this.props.popupMessages)}</div>
  }
}

export default connect(mapStateToProps, dispatch => { return { dispatch } })(Popup)