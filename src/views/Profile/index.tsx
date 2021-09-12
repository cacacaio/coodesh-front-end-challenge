import React, {useEffect} from 'react'
import {useHistory, useParams} from 'react-router'
import './Profile.css'
type ProfileParams = {
  seed: string
  id: string
}

export default function Profile() {
  const {seed, id} = useParams<ProfileParams>()
  const history = useHistory()
  useEffect(() => {
    document.body.classList.add('lock')
    return () => {
      document.body.classList.remove('lock')
    }
  }, [])
  return (
    <div className="modal-container">
      <div className="modal" onClick={() => history.goBack()}>
        <h2>Teste</h2>
      </div>
    </div>
  )
}
