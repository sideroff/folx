import React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header>
        <div>
          <Link to='/'>
            <img src="/logo.png" alt="logo" />
            <img src="mobile-logo.png" alt="mobile.logo" />
          </Link>
        </div>
        <div>
          <Link to='/profile'>Profile</Link>
          <Link to='/ad-create'>New Ad</Link>
          <Link to='/ads'>Posts</Link>
          <Link to='/about'>About</Link>
        </div>

      </header>
    )
  }
}