import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Form from './Form.jsx'
import { adCreate as adCreateFormConfig } from './../forms'

import actionTypes from './../actionTypes'
import requestDispatcher from './../services/requestDispatcher'

function mapStateToProps(state) {
  return {
    adCreate: state.forms.adCreate
  }
}


class AdCreate extends React.Component {
  constructor(props) {
    super(props)
  }

  onChange(event) {
    this.props.dispatch({
      type: actionTypes.AD_CREATE_FORM_FIELD_CHANGE,
      payload: {
        name: event.target.name,
        value: event.target.value
      }
    })
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.dispatch({
      type: actionTypes.AD_CREATE_REQUEST,
      payload: this.props.adCreate
    })

    requestDispatcher.requestToServer('ads.create', this.props.adCreate).then(response => {
      this.props.dispatch({
        type: actionTypes.AD_CREATE_SUCCESS,
        payload: response
      })
      let nextRoute = '/'

      if (response.id) {
        nextRoute += '/ad/' + response.id
      }

      this.props.history.push(nextRoute)
    }).catch(error => {
      this.props.dispatch({
        type: actionTypes.AD_CREATE_FAILURE,
        payload: error
      })
    })
  }


  render() {
    return (
      <div>
        <Form
          config={adCreateFormConfig}
          formValues={this.props.adCreate}
          onChange={this.onChange.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, (dispatch) => { return { dispatch } })(AdCreate))