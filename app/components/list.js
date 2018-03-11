import React, { Component } from 'react'
import { render } from 'react-dom'
import ButtonComponent from './button'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import Card from './card'
import Constants from '../constants'

/** This class displays FitMachines list in table format and sorts it */
class List extends Component {

  constructor (props) {
    super(props)
    this.getFitMachinesList = this.getFitMachinesList.bind(this)
    this.sortByValue = this.sortByValue.bind(this)
    this.state = {
      fitMachinesData: [],
      sortedType: Constants.ASCENDING
    }
  }

  getFitMachinesList () {
    return axios.get('/api/fitmachines/v1/list')
    .then(response => response.data)
    .catch(error =>  {
      throw Error('error while executing getFitMachinesList',error)
    })
  }

  componentDidMount () {
    const {sortedType} = this.state
    this.getFitMachinesList()
      .then(fitMachinesData => {
        fitMachinesData && fitMachinesData.length > 0 ? this.sortByValue(sortedType, fitMachinesData) : null
      })
      .catch(err => console.log(err))
  }

  sortByValue (type, fitMachinesData) {
    if (type === Constants.ASCENDING) {
      fitMachinesData.sort((a, b) => {
        return a.value - b.value
      })
    } else if (type === Constants.DESCENDING) {
      fitMachinesData.sort((a, b) => {
        return b.value - a.value
      })
    }
    this.setState({
      fitMachinesData: fitMachinesData,
      sortedType: type
    })
  }


  render () {
    const fitMachinesData = this.state.fitMachinesData
    const sortedType = this.state.sortedType
    const buttonLabel = sortedType === Constants.ASCENDING ? Constants.SORT_IN_DESC : Constants.SORT_IN_ASC

    let rows = []
    for (const fitMachine of fitMachinesData) {
      const index = rows.length + 1
      rows.push(<Row
                  name={fitMachine.name}
                  value={fitMachine.value}
                  index={index}
                  key={index} />)
    }

    const table =
    <Table
      striped
      bordered
      condensed
      hover>
      <thead>
        <tr>
          <th>
            #
          </th>
          <th>
            Name
          </th>
          <th>
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>

    return (
      <div className='list-container'>
        <div className='row'>
          <div className='col-lg-12'>
            <Card heading='FitMachines List'>
              {fitMachinesData.length > 0 ? table : Constants.NO_DATA}
              <div className='pull-right'>
              {
                fitMachinesData.length > 0 ? 
                <ButtonComponent
                  type='submit'
                  buttonLabel={buttonLabel}
                  id='button-sort-by-value'
                  onClick={() => this.sortByValue(sortedType === Constants.ASCENDING ? Constants.DESCENDING : Constants.ASCENDING, fitMachinesData)}
                   /> : null 
              }
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

function Row (props) {
  return <tr>
           <td>
             {props.index}
           </td>
           <td>
             {props.name}
           </td>
           <td>
             {props.value}
           </td>
         </tr>
}

export default List
