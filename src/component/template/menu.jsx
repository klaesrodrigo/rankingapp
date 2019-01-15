import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
  <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
    <Link to='/' className='navbar-brand'>Logo</Link>
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <Link to='/users'>User</Link>
      </li>
      <li className='nav-item'>
        <Link to='/championship'>Championship</Link>
      </li>
      <li className='nav-item'>
        <Link to='/users'>Matches</Link>
      </li>
    </ul>
  </nav>
)
