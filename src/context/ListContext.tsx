import {createContext, ReactNode} from 'react'
import React, {useEffect, useState} from 'react'
import api, {ApiResponse, Results} from 'services/api'

type ContextType = {
  seed: string
  list: Results[]
  nextPage: () => Promise<void>
  rows: tableRow[]
}

type Props = {
  children: ReactNode
}

type tableRow = {
  id: string
  name: string
  gender: string
  birth: string
  actions: string
}

const ListContext = createContext<ContextType>({} as ContextType)

function ListContextProvider({children}: Props) {
  const [list, setList] = useState<Results[]>([] as Results[])
  const [seed, setSeed] = useState('')
  const [rows, setRows] = useState<tableRow[]>([] as tableRow[])
  const [currentPage, setCurrentPage] = useState(1)
  const getApi = async (page: number) => {
    const {data} = await api.get<ApiResponse>('/', {
      params: {
        results: 50,
        page: page,
        seed: seed,
      },
    })
    setSeed(data.info.seed)
    setList([...list, ...data.results])
    const mappedRows = data.results.map((v) => ({
      id: v.login.uuid,
      name: `${v.name.first} ${v.name.last}`,
      gender: v.gender,
      birth: new Date(v.dob.date).toLocaleDateString(),
      actions: '',
    }))
    setRows([...rows, ...mappedRows])
  }
  const nextPage = async () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    await getApi(nextPage)
  }
  useEffect(() => {
    getApi(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ListContext.Provider value={{list, seed, rows, nextPage}}>
      {children}
    </ListContext.Provider>
  )
}

export {ListContext, ListContextProvider}
