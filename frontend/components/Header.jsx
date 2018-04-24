import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import actionTypes from './../actionTypes'

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    isMobileMenuActive: state.flags.isMobileMenuActive
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.onHamburgerClick = this.onHamburgerClick.bind(this)
    this.closeMobileMenu = this.closeMobileMenu.bind(this)
    this.logout = this.logout.bind(this)
  }

  onHamburgerClick(event) {
    event.preventDefault()

    this.props.dispatch({ type: actionTypes.TOGGLE_MOBILE_MENU, payload: !this.props.isMobileMenuActive })
  }

  closeMobileMenu(event) {
    event.preventDefault()

    this.props.dispatch({ type: actionTypes.TOGGLE_MOBILE_MENU, payload: false })
  }

  logout(event) {
    event.preventDefault()

    if (this.props.currentUser.isLoggedIn) {
      this.props.dispatch({ type: actionTypes.LOGOUT })
      // TODO add popup
      this.props.history.push('/')
    }
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
              <img className="mobile" src="/mobile-logo.png" alt="mobile.logo" />
            </Link>
          </div>
          <nav className="header-nav">
            <div onClick={this.closeMobileMenu}>
              <Link to='/profile'>Profile</Link>
              <Link to='/ad-create'>New Ad</Link>
              <Link to='/ads'>Posts</Link>
              <Link to='/about'>About</Link>
            </div>
          </nav>
          <div className="greeting">
            <span>Hello, {this.props.currentUser.isLoggedIn ? this.props.currentUser.username : 'guest'}!</span>
            {this.props.currentUser.isLoggedIn ? <span className='logout' onClick={this.logout}> Logout!</span> : ''}
          </div>
          <div onClick={this.closeMobileMenu} className="header-overlay"></div>
        </div>
      </header>
    )
  }
}

export default withRouter(connect(mapStateToProps, (dispatch) => { return { dispatch } })(Header))