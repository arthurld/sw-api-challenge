import React, { Component } from 'react'
import './home.styl'
import Film from '../../components/film'
import Header from '../../components/header'

class Home extends Component {
    constructor () {
        super()
        this.state = {
            films: [],
            isFetching: true
        }

        this.fetchFilms()
    }

    fetchFilms () {
        fetch('https://swapi.co/api/films')
            .then(req => req.json())
            .then(res => {
                let results = res.results
                results = results.sort((a, b) => a.episode_id < b.episode_id ? -1 : a.episode_id > b.episode_id ? 1 : 0)
                this.setState({ films: results, isFetching: false })
            })
    }

    convertDate (date) {
        return date.split('-').reverse().join('/')
    }
    render () {
        return (
            <div className='home-page'>
                <Header />
                <div className='list-films'>
                    {
                        this.state.isFetching ? <div className="loader" />
                            : this.state.films.map((film, index) =>
                                <Film key={index} title={`Star Wars: ${film.title}`}
                                    director={film.director}
                                    producer={film.producer}
                                    releaseDate={this.convertDate(film.release_date)}
                                    planets={film.planets}
                                    characters={film.characters} />
                            )
                    }
                </div>
            </div>
        )
    }
}

export default Home
