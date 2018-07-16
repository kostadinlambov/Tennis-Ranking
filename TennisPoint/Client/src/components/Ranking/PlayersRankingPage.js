import React, { Component } from 'react';
import requester from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'
import '../../style/table.css'
import PlayersRankingTable from '../Table/RankingTable';
import utilityService from '../../infrastructure/utilityService'

export default class PlayersRankingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playersArr: [],
            id: '',
            firstName: '',
            lastName: '',
            country: '',
            birthdate: '',
            birthplace: '',
            earnings: '',
            height: '',
            imageUrl: '',
            points: '',
            residence: '',
            tournaments: [],
            weight: '',
        }
    }

    componentDidMount() {
        this.fetchPlayers()
    }

    fetchPlayers = () => {

        requester.get('/players/all', playersArr => {
            const { players } = playersArr
            this.setState({
                playersArr: players
            })
            this.sortByPoints(this.state.playersArr)
            this.rankingObj(this.state.playersArr)

            console.log('rankingObj:', this.state.playersArr)
            observer.trigger(observer.events.notification, { type: 'success', message: players.message })
        })
    }

    changePlayersObj = (playersArr) => {
        let newPlayersArr = playersArr.map((current) => {
            return {
                name: current.firstName + ' ' + current.lastName,
                country: current.country,
                birthdate: current.birthdate,
                birthplace: current.birthplace,
                earnings: current.earnings,
                height: current.height,
                imageUrl: current.imageUrl,
                points: current.points,
                residence: current.residence,
                weight: current.weight,
            }
        })

        this.setState({
            playersArr: newPlayersArr
        })
    }

    rankingObj = (playerArr) => {
        let index = 0;
        let age;
        const playersForTableArr = playerArr.map(current => {
            index++
            age = utilityService.getAge(current.birthdate)
            return {
                id: current._id,
                position: index,
                name: current.firstName + ' ' + current.lastName,
                country: current.country,
                birthdate: current.birthdate,
                birthplace: current.birthplace,
                earnings: current.earnings,
                height: current.height,
                imageUrl: current.imageUrl,
                points: current.points,
                residence: current.residence,
                age: age,
                // tournaments: current.tournaments || [],
                weight: current.weight,
            }
        })

        this.setState({
            playersArr: playersForTableArr
        })

    }
    sortByPoints = (playerArr) => {
        const sortedPlayersObj = playerArr.sort((a, b) => {
            return b.points - a.points
        })

        this.setState({
            playersArr: sortedPlayersObj
        })
    }
    render() {
        return (
            <div className="container m-auto p-auto"> <br />
                <PlayersRankingTable  {...this.state}/>
            </div>
        )
    }
}