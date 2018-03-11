import React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <header>
          <div className='header-foreground'>
            <Link to="/">
              <img className='logo' src='/logo.png' alt='logo' />
              <img className='mobile-logo' src='/mobile-logo.png' alt='logo' />
            </Link>
          </div>
          <h1>header</h1>
          <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque amet ab a laudantium praesentium.
          Sint excepturi velit doloribus impedit in.</div>
        </header>

      </div>
    )
  }
}