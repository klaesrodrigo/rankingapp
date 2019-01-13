import React from 'react'

export default props => (
  <nav className='navbar navbar-inverse bg-inverse'>
    <div className='container'>
      <div className='navbar-header'>
        <p className='navbar-brand'>
          <i className='fa fa-calendar-check-o' /> TodoApp
        </p>
      </div>

      <div id='navbar' className='navbar-collapse collapse'>
        <ul className='nav navbar-nav'>
          <li><p>Tarefas</p></li>
          <li><p>Sobre</p></li>
        </ul>
      </div>
    </div>
  </nav>
)
