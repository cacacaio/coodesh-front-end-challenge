import {Button} from '@material-ui/core'
import {GridCellParams, GridColDef} from '@material-ui/data-grid'
import React from 'react'
import * as h from 'history'

export const useColumns = (history: h.History) => {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'cell',
      headerClassName: 'columnHeaders',
      headerAlign: 'center',
      disableColumnMenu: true,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 150,
      cellClassName: 'cell',
      headerClassName: 'columnHeaders',
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
    },
    {
      field: 'birth',
      headerName: 'Birth',
      width: 150,
      cellClassName: 'cell',
      headerClassName: 'columnHeaders',
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      cellClassName: 'cell',
      headerClassName: 'columnHeaders',
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            history.push(`/profile/${params.value.seed}/${params.value.id}`)
          }
        >
          Testando
        </Button>
      ),
    },
  ]
  return columns
}
