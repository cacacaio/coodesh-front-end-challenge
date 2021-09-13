import {DataGrid, GridSortModel} from '@material-ui/data-grid'
import React, {FormEvent, useState} from 'react'
import './Home.css'
import {useColumns} from './columns'
import pharmaLogo from 'assets/pharmaLogo.png'
import {useList} from 'hooks/useList'
import {Button, CircularProgress, Paper} from '@material-ui/core'
import Filter from 'components/Filter'
import {useHistory} from 'react-router'

export default function Home() {
  const {nextPage, rows} = useList()
  const [isLoading, setLoading] = useState(false)
  const history = useHistory()
  const columns = useColumns(history)

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
        <Filter />
        <div className="gridContainer">
          <DataGrid
            columns={columns}
            rows={rows}
            disableSelectionOnClick
            autoHeight
            hideFooter
            showCellRightBorder
            showColumnRightBorder
            autoPageSize
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
