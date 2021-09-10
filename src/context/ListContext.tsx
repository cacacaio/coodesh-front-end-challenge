import {createContext, ReactNode} from 'react'
import React, {useEffect, useState} from 'react'
import api, {ApiResponse, Results} from 'services/api'
import {List} from '@material-ui/core'

type ContextType = {
  seed: string
  list: Results[]
}

type Props = {
  children: ReactNode
}
export const ListContext = createContext<ContextType>({} as ContextType)

export function ListContextProvider({children}: Props) {
  const [list, setList] = useState<Results[]>([] as Results[])
  const [seed, setSeed] = useState('')
  const mapList = (results: Results[]) => {}

  const getApi = async () => {
    const {data} = await api.get<ApiResponse>('/?results=10')
    mapList(data.results)
    setSeed(data.info.seed)

    return
    // const mappedRows = data.results.map((v) => ({
    //   id: v.login.uuid,
    //   name: `${v.name.first} ${v.name.last}`,
    //   gender: v.gender,
    //   birth: new Date(v.dob.date).toLocaleDateString(),
    //   actions: '',
    // }))
    // setList(mappedRows)
  }
  useEffect(() => {
    getApi()
  }, [])

  return (
    <ListContext.Provider value={{list, seed}}>{children}</ListContext.Provider>
  )
}
