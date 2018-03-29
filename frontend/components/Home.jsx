
import React from 'react'

import SearchForm from './SearchForm.jsx'
import Cards from './Cards.jsx'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {/* <SearchForm /> */}
        <Cards ads={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]} />
      </div>
    )
  }
}