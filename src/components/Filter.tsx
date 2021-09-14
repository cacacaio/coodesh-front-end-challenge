import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {useList} from 'hooks/useList'
import {ChangeEvent, useState} from 'react'

const useStyles = makeStyles({
  filters: {
    width: '45%',
    display: 'flex',
    textAlign: 'left',
    flexDirection: 'column',
  },
  filterRow: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    gap: 40,
    marginBottom: 20,
  },
  formControl: {
    minWidth: 400,
  },
})

export default function Filter() {
  const [name, setName] = useState<string>('')
  const [gender, setGender] = useState('')
  const classes = useStyles()
  const {handleFilter} = useList()
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | {value: unknown}>,
    type: string
  ) => {
    const filter = {
      name: name,
      gender: gender,
    }
    if (type === 'name') {
      filter.name = e.target.value as string
      setName(filter.name)
    }
    if (type === 'gender') {
      filter.gender = e.target.value as string
      setGender(filter.gender)
    }
    handleFilter(filter)
  }
  return (
    <div className={classes.filters}>
      <div className={classes.filterRow}>
        <FormControl className={classes.formControl}>
          <h3>Name</h3>
          <TextField
            label="Filter"
            id="name"
            variant="outlined"
            onChange={(e) => handleChange(e, 'name')}
            value={name}
          ></TextField>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <h3>Gender</h3>
          <Select
            id="gender"
            value={gender}
            onChange={(e) => handleChange(e, 'gender')}
          >
            <MenuItem value="">---</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  )
}
