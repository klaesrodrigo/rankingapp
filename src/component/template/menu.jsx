import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
  <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <Link className='nav-link' to='/users'>Users</Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/championship'>Championships</Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/users'>Matches</Link>
      </li>
    </ul>
  </nav>
)
