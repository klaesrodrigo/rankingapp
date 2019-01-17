import React, { Component } from 'react'
import GenericList from '../template/genericList'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import IconButton from '../template/iconButton'

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
  championship: '',
  redirect: false,
  update: false,
  ok: false
}

export default class ListChampionship extends Component {
  constructor (props) {
    super(props)
    this.state = { ...initialState }

    this.renderRows = this.renderRows.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.updateField = this.updateField.bind(this)
    this.handleAdd = this.handleAdd.bind(this)

    this.handleSearch()
  }

  handleSearch (championship = '') {
    axios.get(`${baseURL}`, config)
      .then(resp => {
        return (this.setState({ ...this.state, championship, list: resp.data }))
      }
      )
  }

  updateField (event) {
    this.setState({ ...this.state, championship: event.target.value })
  }

  handleRemove (champ) {
    axios.delete(`${baseURL}/${champ.id}`, config)
      .then(resp => this.handleSearch(this.state.championship))
  }

  handleUpdate (champ) {
    this.setState({ ...this.state, update: true, id: champ.id })
  }

  handleAdd () {
    const data = { name: this.state.championship }
    axios.post(`${baseURL}`, data, config)
      .then(resp => this.handleSearch())
  }

  componentDidMount () {
    this.handleSearch()
  }

  componentDidUpdate (prevProps, prevState) {
    console.table(prevState.list)
    console.table(this.state.list)
    if (prevState.list !== this.state.list) {
      this.setState({ ...this.state })
    }
  }

  renderRows () {
    // const list = this.state.list || []
    const btConfig = [{
      estilo: 'warning',
      icon: 'edit',
      func: (data) => this.handleUpdate(data)
    }, {
      estilo: 'danger',
      icon: 'trash-o',
      func: (data) => this.handleRemove(data)
    }]
    const keys = ['name']
    return <GenericList dado={this.state.list || []} btConfig={btConfig} keys={keys} />
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
            <th className='tableActions'>Ações</th>
          </tr>
        </thead>
        {this.renderRows()}
      </table>
    )
  }
}
