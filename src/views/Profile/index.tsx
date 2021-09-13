import {useList} from 'hooks/useList'
import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router'
import {Results} from 'services/api'
import './Profile.css'
type ProfileParams = {
  seed: string
  id: string
}

export default function Profile() {
  const {seed, id} = useParams<ProfileParams>()
  const [user, setUser] = useState<Results>()
  const history = useHistory()
  const {list} = useList()
  console.log(user)
  useEffect(() => {
    document.body.classList.add('lock')
    setUser(list.find((user) => user.login.uuid === id))
    return () => {
      document.body.classList.remove('lock')
    }
  }, [id])
  return (
    <div className="modal-container">
      <div className="modal" onClick={() => history.goBack()}>
        <h2>Teste</h2>
      </div>
    </div>
  )
}
