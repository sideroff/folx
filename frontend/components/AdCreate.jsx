// import React from 'react'
// import { connect } from 'react-redux'

// import { actionTypes } from './../actions'
// import { adService } from './../services'
// import { forms } from './../config'
// const adCreateFormConfig = forms.adCreate

// import Form from './Form.jsx'


// function mapStateToProps(state) {
//   return {
//     adCreateForm: state.forms.adCreate
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     handleChange: (event) => {
//       dispatch({
//         type: actionTypes.AD_CREATE_FORM_FIELD_CHANGE,
//         payload: {
//           name: event.target.name,
//           value: event.target.value
//         }
//       })
//     },
//     createAd: (params) => {

//     }

//   }
// }

// class AdCreate extends React.Component {
//   constructor(props) {
//     super(props)

//     this.onSubmit = this.onSubmit.bind(this)
//   }

//   onSubmit(event) {
//     event.preventDefault()

//     this.props.createAd(this.props.adCreateForm)

//   }

//   render() {
//     return (
//       <div className="ad-create-form-wrapper">
//         <Form
//           name={adCreateFormConfig.name}
//           fields={adCreateFormConfig.fields}
//           formValues={this.props.adCreateForm}
//           handleChange={this.props.handleChange}
//           onSubmit={this.onSubmit}
//         />
//       </div>
//     )
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AdCreate)


import React from 'react'

export default class AdCreate extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        Ad Create form ay
      </div>
    )
  }
}