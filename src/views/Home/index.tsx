import {DataGrid, GridSortModel} from '@material-ui/data-grid'
import React, {useEffect, useState} from 'react'
import api, {ApiResponse} from '../../services/api'
import './Home.css'
import {columns} from './columns'
import pharmaLogo from 'assets/pharmaLogo.png'

type tableRow = {
  id: string
  name: string
  gender: string
  birth: string
  actions: string
}

function App() {
  const [rows, setRows] = useState<tableRow[]>([] as tableRow[])
  const [sorted, setSorted] = useState<GridSortModel>([
    {
      field: 'name',
      sort: 'asc',
    },
  ])

  return (
    <div className="main">
      <header className="header">
        <img src={pharmaLogo} alt="Logo Pharma" className="logo" />
        <h2>Pharma Inc.</h2>
      </header>
      <div className="gridContainer">
        <DataGrid
          columns={columns}
          pageSize={10}
          rows={rows}
          disableSelectionOnClick
          autoHeight
          hideFooter
          showCellRightBorder
          sortModel={sorted}
          onSortModelChange={(model) => setSorted(model)}
        ></DataGrid>
      </div>
    </div>
  )
}

export default App
