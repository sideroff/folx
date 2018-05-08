import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Form from './Form.jsx'
import { adCreate as adCreateFormConfig } from './../forms'
import ErrorMessage from './ErrorMessage.jsx'

import actionTypes from './../actionTypes'
import requestDispatcher from './../services/requestDispatcher'

function mapStateToProps(state) {
  return {
    adCreate: state.forms.adCreate,
    errorMessage: state.messages.adCreate.error
  }
}

class AdCreate extends React.Component {
  constructor(props) {
    super(props)
  }

  onChange(event) {
    let value = event.target.value
    if (event.target.type === 'number') {
      try {
        value = Number(event.target.value)
      } catch (error) {
        value = event.target.value
      }
    } else if (event.target.type === 'file') {
      console.log('ayy lmao')
    }

    this.props.dispatch({
      type: actionTypes.FORM_FIELD_CHANGE,
      payload: {
        form: adCreateFormConfig.name,
        field: {
          name: event.target.name,
          value
        }
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
        nextRoute = '/ad/' + response.id
      }

      this.props.history.push(nextRoute)
    }).catch(error => {
      this.props.dispatch({
        type: actionTypes.ADD_MESSAGE,
        payload: {
          message: error,
          messageType: 'error',
          messageIndex: adCreateFormConfig.name
        }
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

        {this.props.errorMessage && <ErrorMessage form={adCreateFormConfig.name} error={this.props.errorMessage} />}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, (dispatch) => { return { dispatch } })(AdCreate))