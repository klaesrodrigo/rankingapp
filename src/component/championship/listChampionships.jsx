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

  updateField (event) {
    this.setState({ ...this.state, championship: event.target.value })
  }

  handleSearch (description = '') {
    axios.get(`${baseURL}`, config).then(resp => {
      this.setState({ ...this.state, description, list: resp.data, ok: true })
    })
  }

  handleRemove (champ) {
    axios.delete(`${baseURL}/${champ.id}`, config)
      .then(resp => this.handleSearch())
  }

  handleUpdate (champ) {
    this.setState({ ...this.state, update: true, id: champ.id })
  }

  handleAdd () {
    const data = { name: this.state.championship }
    axios.post(`${baseURL}`, data, config)
      .then(resp => this.refresh())
  }

  refresh () {
    this.handleSearch(this.state.description)
  }

  componentDidMount () {
    this.handleSearch()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.list !== this.state.list) {
      this.renderRows()
    }
  }

  renderRows () {
    const list = this.state.list || []
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
    return <GenericList dado={list || []} btConfig={btConfig} keys={keys} />
  }

  render () {
    if (this.state.update) {
      return <Redirect to={`create?id=${this.state.id}`} />
    }
    return (
      <div>
        <div role='form' className='form d-flex'>
          <input id='championship'
            className='form-control w-75'
            onChange={(e) => this.updateField(e)}
            placeholder='Adicione um campeonato'
            value={this.state.championship} />
          <IconButton estilo='primary' icon='plus'
            onClick={this.handleAdd} />
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Nome</th>
              <th className='tableActions'>Ações</th>
            </tr>
          </thead>
          {this.renderRows()}
        </table>
      </div>
    )
  }
}
