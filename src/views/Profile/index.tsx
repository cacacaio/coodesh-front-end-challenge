/* eslint-disable react-hooks/exhaustive-deps */
import {Button, CircularProgress, Paper, Slide} from '@material-ui/core'
import lookup from 'country-code-lookup'
import {useList} from 'hooks/useList'
import {FormEvent, useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router'
import {Results} from 'services/api'
import './Profile.css'

type ProfileParams = {
  seed: string
  id: string
}

type Directions = 'up' | 'down' | 'left' | 'right' | undefined

export default function Profile() {
  const {id} = useParams<ProfileParams>()
  const [user, setUser] = useState<Results>()
  const history = useHistory()
  const {list} = useList()
  const [slide, setSlide] = useState(true)
  const [direction, setDirection] = useState<Directions>('up')
  useEffect(() => {
    document.body.classList.add('lock')
    setUser(list.find((user) => user.login.uuid === id)!)
    return () => {
      document.body.classList.remove('lock')
    }
  }, [list, id])

  const handleOutsideClick = (e: FormEvent) => {
    e.preventDefault()
    setSlide(false)
    setDirection('down')
    setTimeout(() => history.push('/'), 350)
  }

  return user ? (
    <div className="modal-container" onClick={handleOutsideClick}>
      <Slide in={slide} direction={direction}>
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
            <p>{`E-Mail : ${user.email}`}</p>
            <p>{`Gender : ${user.gender} - ${new Date(
              user.dob.date
            ).toLocaleDateString()}`}</p>
            <p>{`Phone : ${user.phone}`}</p>
            <p>{`Country : ${lookup.byInternet(user.nat)?.country}`}</p>
            <p>{`Street : ${user.location.street.name}, ${user.location.street.number}`}</p>
            <p>
              {user.id.name
                ? `ID : ${user.id.name} - ${user.id.value}`
                : 'No ID'}
            </p>
            <Button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              variant="contained"
              color="primary"
            >
              Get URL
            </Button>
          </div>
        </Paper>
      </Slide>
    </div>
  ) : (
    <CircularProgress></CircularProgress>
  )
}
// URL para compartilhamento
