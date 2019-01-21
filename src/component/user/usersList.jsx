import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import GenericList from '../template/genericList'

const baseURL = 'http://api-navetest.herokuapp.com/v1'
let token = window.localStorage.getItem('token') || (window.location.search).replace('?token=', '')
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
  token: window.localStorage.getItem('token'),
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

  componentDidUpdate (prevProps, prevState) {
    if (prevState.list !== this.state.list) {
      this.setState({ ...this.state })
    }
  }

  handleSearch () {
    token = window.localStorage.getItem('token') || (window.location.search).replace('?token=', '')
    console.log(config)
    axios.get(`${baseURL}/users`, config).then(resp => {
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
      const id = this.state.id
      return <Redirect to={`/create?id=${id}`} />
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
