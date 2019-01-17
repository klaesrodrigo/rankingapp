
import React, { Component } from 'react'
import GenericList from '../template/genericList'
import axios from 'axios'
import IconButton from '../template/iconButton'

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
  championship: ''
}

export default class ListChampionship extends Component {
  constructor (props) {
    super(props)
    this.state = { ...initialState }

    this.renderRows = this.renderRows.bind(this)
    this.updateField = this.updateField.bind(this)
    this.handleAdd = this.handleAdd.bind(this)

    this.handleSearch()
  }

  handleSearch (championship = '') {
    axios.get(`${baseURL}/users`, config)
      .then(resp => {
        return (this.setState({ ...this.state, championship, list: resp.data }))
      }
      )
  }

  updateField (event) {
    this.setState({ ...this.state, championship: event.target.value })
  }

  handleAdd () {
    const data = { name: this.state.championship }
    axios.post(`${baseURL}/championships`, data, config)
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
      estilo: 'secondary',
      icon: 'plus',
      func: (data) => this.handleUpdate(data)
    }]
    const keys = ['name']
    return <GenericList dado={this.state.list || []} btConfig={btConfig} keys={keys} />
  }

  render () {
    return (
      <div>
        <div role='form' className='form d-flex'>
          <input id='championship'
            className='form-control w-75'
            onChange={this.updateField}
            placeholder='Adicione um campeonato'
            value={this.state.championship} />
          <IconButton estilo='primary' icon='plus'
            onClick={this.handleAdd} />
        </div>
        <table className='table table-striped'>
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
