import React, { Component } from 'react';
import '../../style/bootstrap.min.css'
import LoggedInView from './LoggedInHome';


export default class HomePage extends Component {
    constructor(props) {
        super(props)


        this.state = {

        }
    }


    render() {
        let homepageView;
        if (localStorage.getItem('email')) {
            homepageView = <LoggedInView />
        } else {
            homepageView = (
            <div className="mt-2">
                <h1>Welcome to Tennis Info</h1>
                <br />
                <h3>
                    Information about tennis players, their ranking and much more!
                </h3>
                <br />
                <p>Please login or sign up to continue!</p>
            </div>
            )
        }
        
        return (
            <div className="container text-center">
                    {homepageView}
            </div>
        )
    }
}