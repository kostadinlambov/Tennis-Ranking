import React ,{ Component} from 'react';


export default class Player extends Component {
    constructor(props) {
        super(props)


        this.state = {

        }
    }


    render = () => {
        return (
            // <div key={i} style={({ display: "inline-block", "width": "200px", "height": "200px", border: "2px solid orange" })}>
            // <div key={i} style={({ border: "2px solid orange" })}>
            <div>
                <p>{this.props.firstName}</p>
                <p>{this.props.lastName}</p>
                <p>{this.props.country}</p>
                <p>{this.props.birthdate}</p>
                <p>{this.props.birthplace}</p>
                <p>{this.props.earnings}</p>
                <p>{this.props.height}</p>
                {/* // <p>{player.imageUrl}</p> */}
                <p>{this.props.points}</p>
                <p>{this.props.residence}</p>

                <p>{this.props.weight}</p>
                <img style={({ "width": "100px" })} alt='pokemon' src={this.props.imageUrl} />
                {/* // <h1>{player.tournaments}</h1> */}
             </div>

        )





    }





}