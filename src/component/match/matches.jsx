import React, { Component } from 'react'
// import GenericList from '../template/genericList'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const baseURL = 'http://api-navetest.herokuapp.com/v1'
const token = window.localStorage.getItem('token')
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}
const initialState = {
  matches: [],
  campId: '',
  total: '',
  pages: ''
}

export default class ChampionshipEdit extends Component {
  constructor (props) {
    super(props)
    this.state = { ...initialState, campId: (window.location.search).replace('?id=', '') }
    this.handleSearch = this.handleSearch.bind(this)
    this.renderMatch = this.renderMatch.bind(this)
    // this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount () {
    this.handleSearch()
  }

  componentDidUpdate (prevProps, prevState) {
    console.log(this.state)
    if (prevState.matches !== this.state.matches) {
      this.setState({ ...this.state })
    }
  }

  handleSearch () {
    const id = this.state.campId
    axios.get(`${baseURL}/championships/${id}/matches`, config)
      .then(resp => {
        console.log(resp.data)
        this.setState({ ...this.state, matches: resp.data.data, pages: resp.data.totalPages, total: resp.data.total })
      }
      )
  }

  renderMatch () {
    let matches = this.state.matches
    console.log(matches)
    return matches.map(match => (
      <table key={match.id} className='table table-striped mb30'>
        <thead className='text-center'>
          <tr>
            <th colSpan='5'>Match</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text-center'>
            <td colSpan='5' >Partida 1</td>
          </tr>
          <tr>
            <td>{match.users[0].name}</td>
            <td><input type='text' name={match.users[0].id} /></td>
            <td>X</td>
            <td><input type='text' name={match.users[1].id} /></td>
            <td>{match.users[1].name}</td>
          </tr>
          <tr className='text-center'>
            <td colSpan='5' >Partida 2</td>
          </tr>
          <tr>
            <td>{match.users[1].name}</td>
            <td><input type='text' name={match.users[1].id} /></td>
            <td>X</td>
            <td><input type='text' name={match.users[0].id} /></td>
            <td>{match.users[0].name}</td>
          </tr>
        </tbody>
      </table>
    ))
  }

  //   handleRemove () {
  //     axios.delete(`${baseURL}/championships/${this.state.campId}`, config)
  //       .then(resp => {
  //         console.log(resp)
  //         return this.setState({ ...this.state, delete: false })
  //       })
  //   }

  //   renderPlayers () {
  //     const keys = ['name', 'rating']
  //     return <GenericList dado={this.state.players || []} keys={keys} />
  //   }

  render () {
    // if (this.state.matches) {
    //   const id = this.state.campId
    //   return <Redirect to={`/championship/edit?id=${id}`} />
    // }
    // if (this.state.delete) {
    //   return <Redirect to={`/championship`} />
    // }
    return (
      <div className='container'>

        {this.renderMatch()}

      </div>
    )
  }
}
