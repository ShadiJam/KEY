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
            results: {}
        }
    }
    submit(e){
        e.preventDefault()
        var promise = get(`/api/rootobject/${this.refs.address.value}`)
        promise.then(resp => 
            this.setState({results: resp}))
        .catch(err => log(err)) //something to do with either returning the json of the rootObject or finding the id of each search
    }
    
    render(){
        console.log(this.state)
        var err
        const results = this.state.results
        if(this.state.results){
            return <div className="location">
                  <ul>
                        <li>{this.state.results.formatted_address}</li>
                        <li>{this.state.results.geometry.location.lat}</li>
                        <li>{this.state.results.geometry.location.lng}</li>
                    </ul>
           </div>
        }
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

// export class LocationSearchResult extends Component {
//     constructor(props){
//         super(props)
//         this.state = { 
//              results: []
//         }
//     }
//     componentDidMount(){
//     get('/api/rootobject')
//     .then(resp => 
//             this.setState({results: resp}))
//         .catch(err => 
//             console.log(err))
//     }
// render(){
//     const results = this.state.results
//         if(!results)
//             return <div/>

//     return (
//         <div className="location">
//                   <ul>
//                         <li>{this.resp.results.formatted_address}</li>
//                         <li>{this.resp.results.geometry.location.lat}</li>
//                         <li>{this.resp.results.geometry.location.lng}</li>
//                     </ul>
//            </div>
//         )}
// }
