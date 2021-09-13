/* eslint-disable react-hooks/exhaustive-deps */
import {Button, CircularProgress, Paper, TextField} from '@material-ui/core'
import lookup from 'country-code-lookup'
import {useList} from 'hooks/useList'
import {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router'
import {Results} from 'services/api'
import './Profile.css'

type ProfileParams = {
  seed: string
  id: string
}

export default function Profile() {
  const {id} = useParams<ProfileParams>()
  const [user, setUser] = useState<Results>()
  const history = useHistory()
  const {list} = useList()
  useEffect(() => {
    document.body.classList.add('lock')
    setUser(list.find((user) => user.login.uuid === id)!)
    return () => {
      document.body.classList.remove('lock')
    }
  }, [list, id])
  return user ? (
    <div className="modal-container" onClick={() => history.push('/')}>
      <Paper
        elevation={10}
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          alt="Profile"
          className="profile-pic"
          src={user.picture.medium}
        ></img>
        <div className="personal-info">
          <h2>{`${user.name.first} ${user.name.last}`}</h2>
          <p>{user.email}</p>
          <p>{`${user.gender} - ${new Date(
            user.dob.date
          ).toLocaleDateString()}`}</p>
          <p>{user.phone}</p>
          <p>{lookup.byInternet(user.nat)?.country}</p>
          <p>{`${user.location.street.name}, ${user.location.street.number}`}</p>
          <p>
            {user.id.name ? `ID : ${user.id.name} - ${user.id.value}` : 'No ID'}
          </p>
          <Button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            variant="contained"
            color="primary"
          >
            Get URL
          </Button>
        </div>
      </Paper>
    </div>
  ) : (
    <CircularProgress></CircularProgress>
  )
}
// URL para compartilhamento
