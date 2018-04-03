import React, { Component } from 'react'
import './home.styl'
import Film from '../../components/film'

class Home extends Component {
    // constructor () {
    //     super()
    //     this.state = {
    //         films: {},
    //         isFetching: true
    //     }
    // }
    render () {
        return (
            <div className='home-page'>
                <div className='list-films'>
                    <Film title='Star Wars: A New Hope'
                        director='George Lucas'
                        producer='Gary Kurtz, Rick McCallum'
                        releaseDate='1977-05-25'/>
                </div>
            </div>
        )
    }
}

export default Home
