import React from 'react'


export default class ErrorMessage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    <div className='error-message-wrapper'>
      <div className='error-message'>{this.props.error.message}</div>
    </div>
  }
}