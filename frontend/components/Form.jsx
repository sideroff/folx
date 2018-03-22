import React from 'react'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <form action='#' onSubmit={this.props.onSubmit} className={'form ' + (this.props.config.customClasses || '')}>
          {this.props.config.fields.map((f, i) =>
            <div>
              <input
                onChange={this.props.onChange}
                type={f.type || 'text'}
                name={f.name}
                placeholder={f.placeholder}
                key={i}
                className={(this.props.config.fieldCustomClasses || '') + (f.customClasses || '')} />
            </div>)}
        </form>
      </div>
    )
  }
}