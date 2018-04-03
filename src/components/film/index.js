import React from 'react'
import PropTypes from 'prop-types'
import './film.styl'

const Film = (props) => (
    <div className="film">
        <div className="film-info">
            <div className="info">
                <b>Título:</b>
                <span>{props.title}</span>
            </div>
            <div className="info">
                <b>Diretor:</b>
                <span>{props.director}</span>
            </div>
            <div className="info">
                <b>Produtor(es):</b>
                <span>{props.producer}</span>
            </div>
            <div className="info">
                <b>Estréia:</b>
                <span>{props.releaseDate}</span>
            </div>
            <div className="info">
                <button>Listar Planetas</button>
                <button>Listar Personagens</button>
            </div>
        </div>
        <div className="dropdown">
            <div className="block">
                <b>Planetas presentes neste filme:</b>
                <ul>
                    <li>Tatooine</li>
                    <li>Yavin IV</li>
                </ul>
            </div>
        </div>
    </div>
)

Film.propTypes = {
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    producer: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired
}

export default Film
