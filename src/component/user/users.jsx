import React from 'react'
import Menu from '../template/menu'
import PageHeader from '../template/pageHeader'
import ListUsers from '../user/listUsers'

export default props => (
  <div>
    <Menu />
    <div className='container'>
      <PageHeader name='Lista' small='usuários' />
      <ListUsers />
    </div>
  </div>
)
