import React from 'react'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
  }
  getCorrectInputDomElement(field) {
    switch (field.type) {
      case 'select':
        return <select
          name={field.name}
          onChange={this.props.onChange} >
          <option key={field.name + 'Default'} value={''}>{''}</option>
          {field.options.map((o, j) =>
            <option key={field.name + o.key + j} value={o.value}>{o.label}</option>)}
        </select>
      default:
        return <input
          required={!field.notRequired}
          onChange={this.props.onChange}
          type={field.type || 'text'}
          name={field.name}
          value={this.props.formValues[field.name]}
          placeholder={field.placeholder}
          className={(this.props.config.fieldCustomClasses || '') + (field.customClasses || '')} />
    }
  }

  render() {
    return (
      <div className="form">
        <form action='#' onSubmit={this.props.onSubmit} className={'form ' + (this.props.config.customClasses || '')}>
          {this.props.config.fields.map((field, index) =>
            <div key={index}>
              {this.getCorrectInputDomElement(field)}
            </div>)}
          <input type="submit" value={this.props.config.submitButtonLabel || 'Submit'} />
        </form>
        {this.props.failureMessage &&
          <div
            className="form-failure-message"
            onClick={this.props.dismissMessage}
            title="Click to dismiss">
            {this.props.failureMessage.message}
          </div>
        }
      </div>
    )
  }
}