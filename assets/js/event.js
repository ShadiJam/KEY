import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, RootObject, Result, Geometry, Location } from './components'
import * as Boot from 'react-bootstrap'
import { LoginForm, RegisterForm, Login } from './login'
import { get, post, log, Error } from './app'
import { BuildForm } from './advance'


export class AdventPage extends Component {
    constructor(props){
        super(props)
        this.state = { id: props.params.id }
    }
    componentDidMount(){
        get('/api/advent'+this.state.id).then(x => {
            this.setState({ item: x })
        })
    }
    render() {
        const item = this.state.item
        if(!item)
            return <div/>

        return <div className="advent-page">
                   <Advent />
                <hr />
                <a className="build-advance" href="#/build">
                    <button>Build Event Advance</button>
                </a>
            </div>
    }
}

export class NewAdvent extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e) {
        e.preventDefault()
        post('api/advent', {
            name: this.refs.name.value,
            startDate: this.refs.startDate.value,
            endDate: this.refs.endDate.value
       }).then(x => {
            window.location.hash = `#/status/${x.id}`
        }).catch(e => {
            this.setState({ errors: e })
        })
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(e => <li>{e}</li>)}
                </ul>
        }
        return  <form className="advent-form" onSubmit={e => this.submit(e)}>
                 {this.state.errors ? <p>There were errors with your event submission:</p> : null}
                 {err}
                <div>
                    <input ref="name" type="text" placeholder="Event Name" required/>
                    <input ref="startDate" type="DateTime" placeholder="Start Date DD/MM/YR" required/>
                    <input ref="endDate" type="DateTime" placeholder="End Date DD/MM/YR" required/>
                </div>
                <div>
                    <a href={`#/${advent.id}`}>
                    <button type="submit">Submit Event</button>
                    </a>
                </div>
        </form>
                
    }
}
