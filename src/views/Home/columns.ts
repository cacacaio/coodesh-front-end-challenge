import {GridColDef} from '@material-ui/data-grid'

export const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    cellClassName: 'cell',
    headerClassName: 'columnHeaders',
    headerAlign: 'center',
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 150,
    cellClassName: 'cell',
    headerClassName: 'columnHeaders',
    headerAlign: 'center',
  },
  {
    field: 'birth',
    headerName: 'Birth',
    width: 150,
    cellClassName: 'cell',
    headerClassName: 'columnHeaders',
    headerAlign: 'center',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    cellClassName: 'cell',
    headerClassName: 'columnHeaders',
    headerAlign: 'center',
  },
]
