import React from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/home'
import { AppContainer } from 'react-hot-loader'

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.querySelector('[data-js="app"]')
    )
}

render(Home)

if (module.hot) {
    module.hot.accept('./pages/home', () => {
        const updatedApp = require('./pages/home').default
        render(updatedApp)
    })
}
