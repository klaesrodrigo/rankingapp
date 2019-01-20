import React, { Component } from 'react'
import Menu from '../template/menu'
import PageHeader from '../template/pageHeader'
import axios from 'axios'
// import { Redirect } from 'react-router-dom'

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
    this.updateField = this.updateField.bind(this)
    this.addScore = this.addScore.bind(this)
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

  updateField (event) {
    const matches = this.state.matches
    const id = event.target.id
    let newMatches = matches.map(match => {
      console.log(id)
      console.log(match.id === id)
      if (match.id === id) {
        if (event.target.name === 'score_1') {
          match.score_1 = event.target.value
        } else if (event.target.name === 'score_2') {
          match.score_2 = event.target.value
        }
      }
      return match
    })
    console.table(newMatches)
    this.setState({ ...this.state, matches: newMatches })
  }

  handleSearch () {
    const id = this.state.campId
    axios.get(`${baseURL}/championships/${id}/matches`, config)
      .then(resp => {
        this.setState({ ...this.state, matches: resp.data.data, pages: resp.data.totalPages, total: resp.data.total })
      }
      )
  }

  addScore (match) {
    let score = { score: match.score_1 }
    let nScore = (match.score_1).split(' ')
    console.log(nScore.length)
    console.log(nScore)
    if (nScore[0] === nScore[2] || match.score_1 === '' || nScore.length !== 3 || nScore[0] === '' || nScore[2] === '') {
      window.alert('Insira o placar corretamente!')
    }
    if (Number(nScore[0]) > Number(nScore[2])) {
      score.winner_id = match.users[0].id
    } else if (Number(nScore[0]) < Number(nScore[2])) {
      score.winner_id = match.users[1].id
    }
    console.log(score)
    axios.put(`${baseURL}/matches/${match.id}`, score, config).then(resp => this.handleSearch())
  }

  renderMatch () {
    let matches = this.state.matches
    return matches.map((match, key, value) => {
      const isFinished = match.finished
      let userWin = 0
      if (match.winner_id === match.users[0].id && isFinished) {
        userWin = 1
      } else if (match.winner_id === match.users[1].id && isFinished) {
        userWin = 2
      }
      return (
        <div key={match.id} className={isFinished ? 'card mb30 border-success' : 'card mb30'} >
          <h3 className={isFinished ? 'border-success card-header text-center' : 'card-header text-center'} >Match</h3>
          <table className='table text-center card-body'>
            <tbody>
              <tr className='text-center'>
                <td colSpan='3' >Partida 1</td>
              </tr>
              <tr>
                <td className={userWin === 1 ? 'text-success' : ''}>{match.users[0].name}</td>
                <td><input id={match.id}
                  disabled={isFinished}
                  onChange={(e) => this.updateField(e)}
                  type='text' name='score_1'
                  value={this.state.matches[key].score_1} /></td>
                <td className={userWin === 2 ? 'text-success' : ''}>{match.users[1].name}</td>
              </tr>
              <tr>
                <td colSpan='3'><button className='btn btn-primary' onClick={() => this.addScore(match)}>Inserir placar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <Menu />
        <div className='container'>
          <PageHeader name='Lista' small='partidas' />
          {this.renderMatch()}
        </div>
      </div>
    )
  }
}
