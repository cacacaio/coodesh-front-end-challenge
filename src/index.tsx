import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import '@fontsource/roboto'
import Routes from 'router/Routes'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
