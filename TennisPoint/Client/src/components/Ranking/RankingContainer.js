import requester from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'
import Player from './Player'
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table'
import '../../style/table.css'
import PlayersRankingTable from '../Table/PlayersTable';
import React ,{ Component} from 'react';




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

        this.getAge = this.getAge.bind(this)
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

    changePlayersObj = (playersArr) => {
        // for (current in playersArr) {
        //     const newPlayer = {
        debugger
        let newPlayersArr = playersArr.map((current) => {
            // id: current.players.id,
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
                // tournaments: [],
                weight: current.weight,
            }
        })


        this.setState({
            playersArr: newPlayersArr
        })


    }




    fetchPlayers = () => {

        requester.get('/players/all', playersArr => {

            const { players } = playersArr



            this.setState({
                playersArr: players
            })
            console.log(players)

            // this.changePlayersObj(this.state.playersArr)

            this.sortByPoints(this.state.playersArr)
            this.rankingObj(this.state.playersArr)

            // this.getAge()

            console.log(playersArr)
            // debugger
            // this.setState(this.mapPlayers(players))

            // console.log('players', players)
            observer.trigger(observer.events.notification, { type: 'success', message: players.message })

        })




    }

    imageFormatter = (cell, row) => {
        return "<img  style='text-align: center' class='img-thumbnail' width='50px' height='50px' src='" + cell + "'/>";
    }

    priceFormatter = (cell, row) => {
        return '<i class="glyphicon glyphicon-usd"></i> ' + cell;

    }

    textFormatter = (cell, row) => {
        return "<div class='text-align: center'/><div>";
    }

    rankingObj = (playerArr) => {
        let index = 0;
        let age;
        const playersForTableArr = playerArr.map(current => {
            index++
            age = this.getAge(current.birthdate)
            return {
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
                // tournaments: [],
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


    getAge = (dateString) => {

        console.log(dateString)
        // let dateString = this.state.birthdate;

        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // tdClassName() {
    //     // if (colIdx === this.state.currSortColumnIdx) {
    //     //   return 'my-custom-class';
    //     // }
    //     return 'p-auto';
    // }



    render() {



        const players = this.state.playersArr.map((player, i) => (
            // <div key={i} style={({ display: "inline-block", "width": "200px", "height": "200px", border: "2px solid orange" })}>
            <div key={i} style={({ border: "2px solid orange" })}>
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



            <div class="container m-auto p-auto"> <br />

                {/* <DefaultCustomInsertButtonTable /> */}
                {/* <CustomButtonGroup /> */}
                {/* <ExampleTable /> */}
                <h1>Hello from players lounge! </h1> <br />
                <BootstrapTable data={this.state.playersArr} striped={true} hover={true}>
                    <TableHeaderColumn dataField="position" dataSort={true} dataAlign="center">Position</TableHeaderColumn>
                    <TableHeaderColumn dataField="imageUrl" dataFormat={this.imageFormatter} dataAlign="center" >Picture</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" columnClassName={this.tdClassName} isKey={true} dataAlign="center" dataSort={true}>FirstName</TableHeaderColumn>
                    <TableHeaderColumn dataField="age" dataSort={true} dataAlign="center">Age</TableHeaderColumn>
                    <TableHeaderColumn dataField="country" dataSort={true} dataAlign="center">Country</TableHeaderColumn>
                    <TableHeaderColumn dataField="points" dataSort={true} dataAlign="center">Points</TableHeaderColumn>
                </BootstrapTable>


                <PlayersRankingTable  playersArr={this.state.playersArr} /> 

                {/* <p>{this.state.playersArr.map((player, i) => <Player key={player.id} index={i}  {...player} />)}</p> */}
            </div>


        )


    }



}