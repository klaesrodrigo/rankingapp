import React, { Component } from 'react'
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
  championship: '',
  redirect: false,
  update: false,
  create: false,
  ok: false
}

export default class ListChampionship extends Component {
  constructor (props) {
    super(props)
    this.state = { ...initialState }

    this.renderRows = this.renderRows.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.updateField = this.updateField.bind(this)

    this.handleSearch()
  }

  componentDidMount () {
    this.handleSearch()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.list !== this.state.list) {
      this.setState({ ...this.state })
    }
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

  handleUpdate (champ) {
    this.setState({ ...this.state, update: true, id: champ.id })
  }

  renderRows () {
    // const list = this.state.list || []
    const btConfig = [{
      estilo: 'info',
      icon: 'eye',
      func: (data) => this.handleUpdate(data)
    }]
    const keys = ['name']
    return <GenericList dado={this.state.list || []} btConfig={btConfig} keys={keys} />
  }

  render () {
    if (this.state.update) {
      const id = this.state.id
      return <Redirect to={`/championship/edit?id=${id}`} />
    }
    if (this.state.create) {
      return <Redirect to={`/championship/create`} />
    }
    return (
      <div>
        <button className='btn btn-success mb30' onClick={() => this.setState({ ...this.state, create: true })}>
        Criar Campeonato
        </button>
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
