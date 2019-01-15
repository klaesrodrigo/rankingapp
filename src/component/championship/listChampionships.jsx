import React, { Component } from 'react'
import IconButton from '../template/iconButton'
import GenericList from '../template/genericList'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const baseURL = 'http://api-navetest.herokuapp.com/v1/championships'
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
  update: false
}

export default class ListChampionship extends Component {
  constructor (props) {
    super(props)
    this.state = { ...initialState }

    this.renderRows = this.renderRows.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)

    this.handleSearch()
  }

  handleSearch () {
    axios.get(`${baseURL}`, config).then(resp => {
      console.log(resp.data)
      this.setState({ ...this.state, list: resp.data })
    })
  }

  handleRemove (champ) {
    axios.delete(`${baseURL}/${champ.id}`, config)
      .then(resp => this.handleSearch())
  }

  handleUpdate (champ) {
    this.setState({ ...this.state, update: true, id: champ.id })
  }

  renderRows () {
    const list = this.state.list || []
    return list.map(champ => (
      <tr key={champ.id}>
        <td>{champ.name}</td>
        <td className='actionsColumn'>
          <IconButton estilo='warning' icon='edit' onClick={() => this.handleUpdate(champ)} />
          <IconButton estilo='danger' icon='trash-o' onClick={() => this.handleRemove(champ)} />
        </td>
      </tr>
    ))
  }

  render () {
    if (this.state.update) {
      return <Redirect to={`create?id=${this.state.id}`} />
    }
    return (
      <table className='table todoForm'>
        <thead>
          <tr>
            <th>Nome</th>
            <th className='tableActions'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }
}
