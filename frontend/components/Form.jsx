import React from 'react'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>{JSON.stringify(this.props)}</div>
        <form action="#"></form>
      </div>
    )
  }
}