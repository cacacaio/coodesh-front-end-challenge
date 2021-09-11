import {DataGrid, GridSortModel} from '@material-ui/data-grid'
import React, {FormEvent, useState} from 'react'
import './Home.css'
import {columns} from './columns'
import pharmaLogo from 'assets/pharmaLogo.png'
import {ListContextProvider} from 'context/ListContext'
import {useList} from 'hooks/useList'
import {Button, CircularProgress, Paper, TextField} from '@material-ui/core'
import Filter from 'components/Filter'

function Home() {
  const {nextPage, rows} = useList()
  const [isLoading, setLoading] = useState(false)
  const [sorted, setSorted] = useState<GridSortModel>([
    {
      field: 'name',
      sort: 'asc',
    },
  ])
  const handleLoad = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await nextPage()
    setLoading(false)
  }
  return (
    <div className="main">
      <Paper className="header" elevation={4}>
        <img src={pharmaLogo} alt="Logo Pharma" className="logo" />
        <h2>Pharma Inc.</h2>
      </Paper>
      <div className="content">
        <Filter></Filter>
        <div className="gridContainer">
          <DataGrid
            columns={columns}
            rows={rows}
            disableSelectionOnClick
            autoHeight
            hideFooter
            showCellRightBorder
            showColumnRightBorder
            sortModel={sorted}
            autoPageSize
            onSortModelChange={(model) => setSorted(model)}
          ></DataGrid>
        </div>

        {isLoading ? (
          <div className="loading">
            <CircularProgress />
            <span>Loading More...</span>
          </div>
        ) : (
          <div className="loading">
            <Button variant="contained" color="primary" onClick={handleLoad}>
              Load More
            </Button>
          </div>
        )}
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
