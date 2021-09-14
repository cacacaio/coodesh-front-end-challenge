import {DataGrid} from '@material-ui/data-grid'
import {FormEvent, useState} from 'react'
import './Home.css'
import {getColumns} from './columns'
import pharmaLogo from 'assets/pharmaLogo.png'
import {useList} from 'hooks/useList'
import {Paper} from '@material-ui/core'
import Filter from 'components/Filter'
import {useHistory} from 'react-router'
import LoadButton from 'components/LoadButton'

export default function Home() {
  const {nextPage, rows} = useList()
  const [isLoading, setLoading] = useState(false)
  const history = useHistory()
  const columns = getColumns(history)

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
        <LoadButton isLoading={isLoading} handleLoad={handleLoad}></LoadButton>
      </div>
    </div>
  )
}
