import React from 'react'

export default class ErrorMessage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={this.props.form ? this.props.form : '' + 'error'}>
        <div>{this.props.error.message}</div>
      </div>
    )
  }
}