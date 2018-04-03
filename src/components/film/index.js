import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './film.styl'

class Film extends Component {
    constructor (props) {
        super(props)
        this.state = {
            extraInfo: {
                type: '',
                infos: []
            },
            fetchingPlanets: false,
            fetchingCharacters: false
        }
        this.listPlanets = this.listPlanets.bind(this)
        this.listCharacters = this.listCharacters.bind(this)
        this.closeBlock = this.closeBlock.bind(this)
        this.setRef = this.setRef.bind(this)
        this.blockRef = null
    }

    componentDidMount () {
        window.addEventListener('resize', () => {
            if (this.blockRef.parentElement.style.height !== '0px') {
                this.setHeight()
            }
        })
    }

    listPlanets (e) {
        if (this.state.extraInfo.type === 'Planetas') return this.setHeight()
        this.setState({ fetchingPlanets: true })
        let planetsCalls = this.props.planets
        this.fetchAll(planetsCalls).then(planets => {
            this.setState({ extraInfo: { type: 'Planetas', infos: planets }, fetchingPlanets: false })
            this.setHeight()
        })
    }

    listCharacters (e) {
        if (this.state.extraInfo.type === 'Personagens') return this.setHeight()
        this.setState({ fetchingCharacters: true })
        let charactersCalls = this.props.characters
        this.fetchAll(charactersCalls).then(characters => {
            this.setState({ extraInfo: { type: 'Personagens', infos: characters }, fetchingCharacters: false })
            this.setHeight()
        })
    }

    setRef (element) {
        this.blockRef = element
    }

    // Somente para propósitos de animação
    setHeight () {
        this.blockRef.parentElement.style.height = `${this.blockRef.getBoundingClientRect().height}px`
    }

    closeBlock () {
        this.blockRef.parentElement.style.height = '0px'
    }

    fetchAll (calls) {
        return Promise.all(calls.map(_call => {
            return fetch(_call)
                .then(req => req.json())
        }))
    }
    render () {
        return (
            <div className="film">
                <div className="film-info">
                    <div className="info">
                        <b>Título:</b>
                        <span>{this.props.title}</span>
                    </div>
                    <div className="info">
                        <b>Diretor:</b>
                        <span>{this.props.director}</span>
                    </div>
                    <div className="info">
                        <b>Produtor(es):</b>
                        <span>{this.props.producer}</span>
                    </div>
                    <div className="info">
                        <b>Estréia:</b>
                        <span>{this.props.releaseDate}</span>
                    </div>
                    <div className="info">
                        <button className={this.state.fetchingPlanets ? '-loading' : '' || this.state.fetchingCharacters ? '-disabled' : ''} onClick={this.listPlanets}>Listar Planetas</button>
                        <button className={this.state.fetchingCharacters ? '-loading' : '' || this.state.fetchingPlanets ? '-disabled' : ''} onClick={this.listCharacters}>Listar Personagens</button>
                    </div>
                </div>
                <div className="dropdown">
                    {
                        this.state.extraInfo.infos.length > 0 ? <div className="block" ref={this.setRef}>
                            <button onClick={this.closeBlock} className="close" />
                            <b>{this.state.extraInfo.type} presentes neste filme:</b>
                            <ul>
                                {
                                    this.state.extraInfo.infos.map((info, index) => <li key={index}>{info.name}</li>)
                                }
                            </ul>
                        </div> : ''
                    }
                </div>
            </div>
        )
    }
}

Film.propTypes = {
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    producer: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    planets: PropTypes.array.isRequired,
    characters: PropTypes.array.isRequired
}

export default Film
