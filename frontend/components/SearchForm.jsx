import React from 'react'
import { connect } from 'react-redux'

import Form from './Form.jsx'
import { searchAds as searchAdsFormConfig } from './../forms'
import actionTypes from './../actionTypes'

function mapStateToProps(state) {
  console.log('searchAds mstp' + JSON.stringify(state))
  return {
    searchAdsForm: state.forms.searchAds
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
  }
  dismissMessage() {
    console.log('search form dismiss')
  }
  onChange(event) {
    event.preventDefault()
    this.props.dispatch({
      type: actionTypes.FORM_FIELD_CHANGE,
      payload: {
        form: searchAdsFormConfig.name,
        field: {
          name: event.target.name,
          value: event.target.value
        }
      }
    })
  }
  onSubmit(event) {
    event.preventDefault()
    console.log('search form submit')
  }

  render() {
    console.log('search ads form config ' + JSON.stringify(searchAdsFormConfig))
    console.log('search ads form ' + JSON.stringify(this.props.searchAdsForm))
    return (
      <div>
        <Form
          config={searchAdsFormConfig}
          formValues={this.props.searchAdsForm}
          onChange={this.onChange.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
          failureMessage={this.props.failureMessage}
          dismissMessage={this.dismissMessage.bind(this)} />
      </div>
    )
  }
}

export default connect(mapStateToProps, (dispatch) => { return { dispatch } })(SearchForm)