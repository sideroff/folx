import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import actionTypes from './../actionTypes'

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    isMobileMenuActive: state.flags.isMobileMenuActive
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleMobileMenu(value) {
      dispatch({ type: actionTypes.TOGGLE_MOBILE_MENU, payload: value })
    }
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.onHamburgerClick = this.onHamburgerClick.bind(this)
    this.onOverlayClick = this.onOverlayClick.bind(this)
  }

  onHamburgerClick(event) {
    event.preventDefault()

    this.props.toggleMobileMenu(!this.props.isMobileMenuActive)
  }

  onOverlayClick(event) {
    event.preventDefault()

    this.props.toggleMobileMenu(false)
  }

  render() {
    return (
      <header>
        <div className="header-top-bar"></div>
        <div className={"header-main" + (this.props.isMobileMenuActive ? " active" : "")}>
          <div className="header-mobile-hamburger" onClick={this.onHamburgerClick}><span>☰</span></div>
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
          <div className="greeting">
            <span>Hello, {this.props.currentUser.isLoggedIn ? this.props.currentUser.username : 'guest'}!</span>
          </div>
          <div onClick={this.onOverlayClick} className="header-overlay"></div>
        </div>
      </header>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)