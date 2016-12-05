// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
// import { Datepicker } from 'react-bootstrap-date-picker'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Form, AdvancePage, NewAdvance, NewSection, NewCategory, NewOption } from './advance'
import { get, post, log, Error, Layout, reactapp } from './app'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, RootObject, Result, Location, Geometry } from './components'
import { NewEmployee, EmployeeView } from './employee'
import { AdventPage, NewAdvent } from './event'
import { LoginForm, RegisterForm, Login } from './login'


export class NewRootObject extends Component {
    constructor(props){
        super(props)
        this.state = { 
            items: []
        }
    }
    submit(e){
        e.preventDefault()
        get(`/api/rootobject/${this.refs.address.value}`
        ).then(x => {
            window.location.hash = `api/advent/${x.id}`
        }).catch(e => log(e))
    }

    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(e => <li>{e}</li>)}
                </ul>
        }
        return <form className="new-RO-form" onSubmit={e => this.submit(e)}>
                 {this.state.errors ? <p>There were errors with your location search:</p> : null}
                 {err}
                <div>
                    <input ref="address" type="text" placeholder="Add a location - enter a zipcode, location name, or address" required/>
                        <button onSubmit={e => this.submit(e)} type="submit">Add Location</button>
                </div>
        </form>

            
            

    }
}

export class LocationSearchResult extends Component {
    constructor(props){
        super(props)
        this.state = { 
            id: props.params.id 
        }}
    componentDidMount(){
    get('/api/rootobject'+this.state.id).then((response) => {
         this.setState({ item: x })
        })
    }
render(){
    const item = this.state.item
        if(!item)
            return <div/>

    return <div className="location">
            { this.state.config && <FormattedAddress address_data={this.state.config.rootObject.results.formatted_address} /> }
            { this.state.config && <Latitude latitude_data={this.state.config.rootObject.results.geometry.location.lat} /> }
            { this.state.config && <Longitutde longitude_data={rootObject.results.geometry.location.lat} /> }
           </div>
    }
}
