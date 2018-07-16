import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Input from '../common/Input';
import fetcher from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'

export default class CreateTournament extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: '',
            city: '',
            country: '',
            startDate: '',
            endDate: '',
            officialName: '',
            prizeMoney: '',
            surface: '',
            website: '',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();

        fetcher.post('/tournaments/create', { ...this.state }, (response) => {
            if (response.success == true) {
                // observer.trigger(observer.events.loginUser, res.username)
                observer.trigger(observer.events.notification, { type: 'success', message: response.message })


                this.setState({ fireRedirect: true })
            } else {
                observer.trigger(observer.events.notification, { type: 'error', message: response.message });
                this.setState({
                    category: '',
                    city: '',
                    country: '',
                    startDate: '',
                    endDate: '',
                    officialName: '',
                    prizeMoney: '',
                    surface: '',
                    website: '',
                })
            }
        })
    }

    render() {

        if (this.state.fireRedirect == true) {
            return <Redirect to="/tournaments" />
        }
        return (
            <div className="container">
                <h1 className="mt-5 mb-5 p-auto">Create Tournament</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="category"
                        value={this.state.category}
                        type="text"
                        onChange={this.onChangeHandler}
                        label="Category "
                    />
                    <Input
                        name="city"
                        value={this.state.city}
                        onChange={this.onChangeHandler}
                        type="text"
                        label="City "
                    />

                    <Input
                        name="country"
                        value={this.state.country}
                        onChange={this.onChangeHandler}
                        type="text"
                        label="Country "
                    />
                    <Input
                        name="startDate"
                        value={this.state.startDate}
                        onChange={this.onChangeHandler}
                        type="date"
                        label="Start Date "
                    />
                    <Input
                        name="endDate"
                        value={this.state.endDate}
                        onChange={this.onChangeHandler}
                        type="date"
                        label="End Date "
                    />
                    <Input
                        name="officialName"
                        value={this.state.officialName}
                        onChange={this.onChangeHandler}
                        type="text"
                        label="Official Name "
                    />
                    <Input
                        name="prizeMoney"
                        value={this.state.prizeMoney}
                        onChange={this.onChangeHandler}
                        type="number"
                        label="PrizeMoney "
                    />
                    <Input
                        name="surface"
                        value={this.state.surface}
                        onChange={this.onChangeHandler}
                        type="text"
                        label="Surface "
                    />
                    <Input
                        name="website"
                        value={this.state.website}
                        onChange={this.onChangeHandler}
                        type="text"
                        label="Website "
                    />
                    <Input
                        name="imageUrl"
                        value={this.state.imageUrl}
                        onChange={this.onChangeHandler}
                        type="text"
                        label="Image Url "
                    />

                    <input type="submit" className="btn btn-primary" value="Create" />
                </form>
            </div>
        );
    }
}

