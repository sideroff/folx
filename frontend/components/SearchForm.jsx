import React from 'react'
import { connect } from 'react-redux'

import Form from './Form.jsx'
import {searchAds as searchAdsConfig} from './../forms'

function mapStateToProps(state) {
  return {
    searchAdsFormConfig: state.forms.searchAds
  }
}

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
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