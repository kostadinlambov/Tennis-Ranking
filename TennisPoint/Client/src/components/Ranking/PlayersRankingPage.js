import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'



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

    mapPlayers = (playersArr) => {
        return {
            players: playersArr.map((current) => {
                return {
                    // id: current.players.id,
                    firstName: current.firstName,
                    lastName: current.lastName,
                //     country: current.country,
                //     birthdate: current.birthdate,
                //     birthplace: current.birthplace,
                //     earnings: current.earnings,
                //     height: current.height,
                //     imageUrl: current.imageUrl,
                //     points: current.points,
                //     residence: current.residence,
                //     // tournaments: [],
                //     weight: current.weight,
                }
            })
        }
    }


    fetchPlayers = () => {

        requester.get('/players/all', playersArr => {

            const {players} = playersArr
            
            this.setState({
                playersArr: players
            })
            console.log(players)
            // debugger
            // this.setState(this.mapPlayers(players))

            // console.log('players', players)
            observer.trigger(observer.events.notification, { type: 'success', message: players.message })

        })




    }



    render() {

        const players = this.state.playersArr.map((player, i) => (
            // <div key={i} style={({ display: "inline-block", "width": "200px", "height": "200px", border: "2px solid orange" })}>
            <div key={i} style={({  border: "2px solid orange" })}>
              <p>{player.firstName}</p>
              <p>{player.lastName}</p>
              <p>{player.country}</p>
               <p>{player.birthdate}</p>
              <p>{player.birthplace}</p>
              <p>{player.earnings}</p>
              <p>{player.height}</p>
              {/* <p>{player.imageUrl}</p> */}
              <p>{player.points}</p>
              <p>{player.residence}</p>
             
              <p>{player.weight}</p> 
              <img style={({ "width": "100px" })} alt='pokemon' src={player.imageUrl} />
               {/* <h1>{player.tournaments}</h1> */}
            </div>
        ))

        // const playersArray = this.state.playersArr.map(player => {
        //     <li >{player.firstName}</li>
        // })

        console.log(this.state.firstName)
        console.log(this.state.lastName)

        return (
            <div>
            <h1>Hello from players lounge! </h1>
               <p>{players}</p> 
                {/* <p>{this.state.lastName}</p> */}
            </div>


        )


    }



}