import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Root from './Root'

import App from './components/App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <BrowserRouter>
        <Route path='/' component={App}></Route>
      </BrowserRouter>
    </Root>
  </React.StrictMode>,
  document.getElementById('root')
)
