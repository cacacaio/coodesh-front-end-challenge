import {ListContext} from 'context/ListContext'
import {useContext} from 'react'

export function useList() {
  const value = useContext(ListContext)

  return value
}
