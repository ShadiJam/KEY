import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, RootObject, Result, Geometry, Location } from './components'
import * as Boot from 'react-bootstrap'
import { LoginForm, RegisterForm, Login } from './login'
import { get, post, log, Error, NewRootObject, CreateAdvent, NewAdvance, NewSection, NewOption, NewCategory } from './app'


export class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = { value: ''};

        this.handleChange = 
    this.handleChange.bind(this);
        this.handleSubmit = 
    this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value:
            event.target.value});
    }

    handleSubmit(e) {
        alert(this.state.value + 'was added');
        e.preventDefault();
    }

    render() {
        return (
            <div className="form-builder">
                <NewAdvance />
                <NewSection />
                <NewCategory />
                <NewOption />
                <NewRootObject />
                    <button type="submit">Create</button>
            </div>
        )
    }
}

export class AdvancePage extends Component {
    constructor(props){
        super(props)
        this.state = { 
            items: []
        }
    }
    componentDidMount(){
        get('/api/advance'+this.state.id).then(x => {
            this.setState({ item: x })
        })
    }
    render() {
        const item = this.state.item
        if(!item)
            return <div/>
        
        return <div>
                    <Advance />
                    <hr />
                    <NewSection />
                </div>
    }
}