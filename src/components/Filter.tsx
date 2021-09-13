import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useList } from 'hooks/useList'
import { ChangeEvent, useState } from 'react'

const useStyles = makeStyles({
  filters: {
    width: '40%',
    display: 'flex',
    textAlign: 'left',
    flexDirection: 'column'
  }
})

export default function Filter() {
  const [state, setState] = useState<string>()
  const classes = useStyles()
  const { handleFilter } = useList()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
    handleFilter(e.target.value)
  }
  return (
    <div className={classes.filters}>
      <h2>Filtrar por Nome</h2>
      <TextField
        label="Filter"
        variant="outlined"
        style={{ marginBottom: 20, width: '100%' }}
        onChange={handleChange}
        value={state}></TextField>
    </div>
  )
}
