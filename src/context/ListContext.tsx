import { createContext, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import api, { ApiResponse, Results } from 'services/api'

type ContextType = {
  seed: string
  list: Results[]
  nextPage: () => Promise<void>
  rows: tableRow[]
  handleFilter: (value: string) => void
}

type Props = {
  children: ReactNode
}

type tableRow = {
  id: string
  name: string
  gender: string
  birth: string
  actions: actions
}

type actions = {
  seed: string
  id: string
}
const ListContext = createContext<ContextType>({} as ContextType)

function ListContextProvider({ children }: Props) {
  const [list, setList] = useState<Results[]>([] as Results[])
  const [seed, setSeed] = useState('')
  const [rows, setRows] = useState<tableRow[]>([] as tableRow[])
  const [currentPage, setCurrentPage] = useState(1)
  const mapRows = (results: Results[], seed: string) =>
    results.map((user) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      gender: user.gender,
      birth: new Date(user.dob.date).toLocaleDateString(),
      actions: { seed: seed, id: user.login.uuid }
    }))
  const getApi = async (page: number) => {
    const { data } = await api.get<ApiResponse>('/', {
      params: {
        results: 50,
        page: page,
        seed: seed
      }
    })
    setSeed(data.info.seed)
    setList([...list, ...data.results])
    setRows([...rows, ...mapRows(data.results, data.info.seed)])
  }
  const nextPage = async () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    await getApi(nextPage)
  }
  const handleFilter = (value: string) => {
    const filtered = mapRows(list, seed).filter((v) =>
      v.name.toLowerCase().includes(value.toLowerCase())
    )
    setRows(filtered)
  }
  useEffect(() => {
    getApi(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ListContext.Provider value={{ list, seed, rows, nextPage, handleFilter }}>
      {children}
    </ListContext.Provider>
  )
}

export { ListContext, ListContextProvider }
