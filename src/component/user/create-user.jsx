import React, { Component } from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default class CreateUser extends Component {
  render () {
    return (
      <div role='form' className='row todoForm'>
        <Grid cols='12 9 10'>
          <input type='name' id='description' className='form-control'
            placeholder='Adicione uma tarefa'
            value={this.props.description} />
        </Grid>

        <Grid cols='12 3 2'>
          <IconButton estilo='primary' icon='plus' />
          <IconButton estilo='info' icon='search' />
          <IconButton estilo='default' icon='close' />
        </Grid>
      </div>
    )
  }
}
