import {DataGrid, GridSortModel} from '@material-ui/data-grid'
import React, {useEffect, useState} from 'react'
import api, {ApiResponse} from '../../services/api'
import './Home.css'
import {columns} from './columns'
import pharmaLogo from 'assets/pharmaLogo.png'
import {ListContextProvider} from 'context/ListContext'
import {useList} from 'hooks/useList'

type tableRow = {
  id: string
  name: string
  gender: string
  birth: string
  actions: string
}

function Home() {
  const {list, seed} = useList()
  const [rows, setRows] = useState<tableRow[]>([] as tableRow[])
  useEffect(() => {
    setRows(
      list.map((v) => ({
        id: v.login.uuid,
        birth: new Date(v.dob.date).toLocaleDateString(),
        gender: v.gender,
        name: v.name.first + ' ' + v.name.last,
        actions: '',
      }))
    )
  }, [list])

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

export default function App() {
  return (
    <ListContextProvider>
      <Home />
    </ListContextProvider>
  )
}
