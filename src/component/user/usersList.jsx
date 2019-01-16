import React, { Component } from 'react'
import IconButton from '../template/iconButton'
import If from '../helpers/if'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import GenericList from '../template/genericList'

const baseURL = 'http://api-navetest.herokuapp.com/v1'
const token = window.localStorage.getItem('token')
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

const initialState = {
  list: [],
  id: '',
  redirect: false,
  update: false,
  ok: false
}

export default class ListUsers extends Component {
  constructor (props) {
    super(props)
    this.state = { ...initialState }

    this.renderRows = this.renderRows.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)

    this.handleSearch()
  }

  componentDidMount () {
    this.handleSearch()
  }

  handleSearch () {
    axios.get(`${baseURL}/users`, config).then(resp => {
      console.log(resp.data)
      this.setState({ ...this.state, list: resp.data, ok: true })
    })
  }

  handleRemove (user) {
    axios.delete(`${baseURL}/users/${user.id}`, config)
      .then(resp => this.handleSearch())
  }

  handleUpdate (user) {
    this.setState({ ...this.state, update: true, id: user.id })
  }

  // renderRows () {
  //   const list = this.state.list || []

  //   return list.map(user => (
  //     <tr key={user.id}>
  //       <td>{user.name}</td>
  //       <td>{user.rating}</td>
  //       <td>
  //         <IconButton estilo='warning' icon='edit' onClick={() => this.handleUpdate(user)} />
  //         <IconButton estilo='danger' icon='trash-o' onClick={() => this.handleRemove(user)} />
  //       </td>
  //     </tr>
  //   ))
  // }

  renderRows () {
    const list = this.state.list || []
    const btConfig = [{
      estilo: 'warning',
      icon: 'edit',
      func: this.handleUpdate
    }, {
      estilo: 'danger',
      icon: 'trash-o',
      func: this.handleRemove
    }]
    const keys = ['name', 'rating']
    return <GenericList dado={list || []} btConfig={btConfig} keys={keys} />
  }

  render () {
    if (this.state.update) {
      return <Redirect to={`create?id=${this.state.id}`} />
    }
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Pontuação</th>
            <th className='tableActions'>Ações</th>
          </tr>
        </thead>
        {this.renderRows()}
      </table>
    )
  }
}
