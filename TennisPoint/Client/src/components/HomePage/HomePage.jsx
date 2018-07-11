import React, { Component } from 'react';
import '../../style/bootstrap.min.css'

export default class HomePage extends Component {
    render() {
        return (
            <div className="container text-center">
                <div className="mt-2">

                    <h1>Welcome to Tennis Info</h1>
                    <br />
                    <h3>
                        Information about tennis players, their ranking and much more!
                </h3>
                    <br />
                    <p>Please login or sign up to continue!</p>
                </div>
            </div>
        )

    }
}