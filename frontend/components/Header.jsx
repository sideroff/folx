import React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header>
        <div className="header-top-bar"></div>
        <div className="header-main">
          <div className="header-mobile-hamburger"><span>☰</span></div>
          <div className="header-logo">
            <Link to='/'>
              <img className="full-size" src="/logo.png" alt="logo" />
              <img className="mobile" src="mobile-logo.png" alt="mobile.logo" />
            </Link>
          </div>
          <nav className="header-nav">
            <Link to='/profile'>Profile</Link>
            <Link to='/ad-create'>New Ad</Link>
            <Link to='/ads'>Posts</Link>
            <Link to='/about'>About</Link>
          </nav>
          <div className="header-overlay"></div>
        </div>


      </header>
    )
  }
}