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
    return (<div className="popup">
      {this.props.popupMessages.map((pm, i) => <div key={i}>heyy</div>)}
    </div>)
  }
}

export default connect(mapStateToProps, dispatch => { return { dispatch } })(Popup)