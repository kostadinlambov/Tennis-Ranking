import React, { Component, Fragment } from 'react';
import requester from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'
import utilityService from '../../infrastructure/utilityService'
import AllTournamnetsTable from './AllTournamentsTable';

// let tournamentsData = []

export default class AllTournamentsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            category: '',
            city: '',
            country: '',
            startDate: '',
            endDate: '',
            officialName: '',
            prizeMoney: '',
            surface: '',
            website: '',
            imageUrl: '',
            players: [],
            tournamentsArr: []
        }
    }

    componentDidMount() {
        this.fetchPlayers()
    }

    fetchPlayers = () => {

        requester.get('/tournaments/all', response => {
            console.log(response)
            const  tournaments  = response['tournaments']

            this.setState({
                tournamentsArr: tournaments
            })

            console.log('tournamentsAll:', this.state.tournamentsArr)
            this.sortByDate(this.state.tournamentsArr)

            console.log('tournamentsAllSorted:', this.state.tournamentsArr)
            // observer.trigger(observer.events.notification, { type: 'success', message: response.message })
        })
    }

    sortByDate = (tournamentsData) => {
        const sortedTornamentssObj = tournamentsData.sort((a, b) => {
            return a.startDate > b.startDate
        })

        this.setState({
            tournamentsArr: sortedTornamentssObj
        })
    }

    render() {
        return (

            <div className="container m-auto p-auto"> <br />
                <AllTournamnetsTable  {...this.state} />
            </div>
        )
    }
}