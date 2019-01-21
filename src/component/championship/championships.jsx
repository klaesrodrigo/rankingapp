import React from 'react'

import Menu from '../template/menu'
import PageHeader from '../template/pageHeader'
import List from './championshipList'
import Create from './championshipCreate'
import Edit from './championshipEdit'

export default props => {
  if (window.location.href === 'http://localhost:3000/championship') {
    return (
      <div>
        <Menu />
        <div className='container'>
          <PageHeader name='Listar' small='Campeonatos' className='w-50' />
          <List />
        </div>
      </div>
    )
  } else if (window.location.href === 'http://localhost:3000/championship/create') {
    return (<div>
      <Menu />
      <div className='container'>
        <PageHeader name='Criar' small='Campeonatos' />
        <Create />
      </div>
    </div>
    )
  } else {
    return (<div>
      <Menu />
      <div className='container'>
        <PageHeader name='Criar' small='Campeonatos' />
        <Edit />
      </div>
    </div>)
  }
}
