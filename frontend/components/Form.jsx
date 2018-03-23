import React from 'react'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="form">
        <form action='#' onSubmit={this.props.onSubmit} className={'form ' + (this.props.config.customClasses || '')}>
          {this.props.config.fields.map((f, i) =>
            <div key={i}>
              <input
                onChange={this.props.onChange}
                type={f.type || 'text'}
                name={f.name}
                value={this.props.formValues[f.name]}
                placeholder={f.placeholder}
                className={(this.props.config.fieldCustomClasses || '') + (f.customClasses || '')} />
            </div>)}
          <input type="submit" value={this.props.config.submitButtonLabel || 'Submit'} />
        </form>
      </div>
    )
  }
}