// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
// import { Datepicker } from 'react-bootstrap-date-picker'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, RootObject, Result, Geometry, Location } from './components'
import { LoginForm, RegisterForm, Login } from './login'
import { NewEmployee, EmployeeView } from './employee'
import { AdventPage, NewAdvent } from './event'
import { Form, AdvancePage } from './advance'
import { Button, Checkbox, FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap'

import * as Boot from 'react-bootstrap' // read up @ https://react-bootstrap.github.io/components.html

// console.log(Boot) // what hast thou provided?

// Utility methods
// --------------



export const get = (url) =>
    fetch(url, {credentials: 'same-origin'})
    .then(r => {
        return r.json()
    })
    .catch(e => log(e))

export const post = (url, data) => 
    fetch(url, { 
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .catch(e => log(e))
    .then(r => r.json())
// ----------------




export const log = (...a) => console.log(...a)

export const Error = () => <div>Page Not Found</div>


export class NewRootObject extends Component {
    constructor(props){
        super(props)
        this.state = { 
            items: []
        }
    }
    submit(e){
        e.preventDefault()
        get('/api/rootobject', {
            address: this.refs.address.value
        }).then(x => {
            window.location.hash = `#/status/${x.id}`
            this.setState({ items: RootObject })
        }).catch(e => log(e))
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }
        return <form className="new-RO-form" onSubmit={e => this.submit(e)}>
                 {this.state.errors ? <p>There were errors with your location search:</p> : null}
                 {err}
                <div>
                    <input ref="address" type="text" placeholder="Add a location - enter a zipcode, location name, or address" required/>
                </div>
        </form>

    }
}



export const CreateAdvent = () =>
    <div className="new-advent">
        <NewAdvent />
    </div>




export class NewAdvance extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e) {
        e.preventDefault()
        post('api/advance',{
            advanceName: this.refs.AdvanceName.value,
            dueDate: this.refs.dueDate.value
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

        return <form className="new-advance-form" onSubmit={e => this.submit(e)}>
                 {this.state.errors ? <p>There were errors with your Advance submission:</p> : null}
                 {err}
                <div>
                    <input ref="AdvanceName" type="text" placeholder="Advance Name - not required"/>
                    <input ref="dueDate" type="DateTime" placeholder="Due Date DD/MM/YR - not required"/>
                </div>
        </form>
            
        
    }
}

export class NewSection extends Component {
    constructor(props){
        super(props)
        this.state = {
            additionalInputs: []
        }
    }
    submit(e) {
        e.preventDefault()
        post('api/section',{
            sectionName: this.refs.sectionName.value,
            sectionDescription: this.refs.sectionDescription.value
        }).then(x => {
            window.location.hash = `#/status/${x.id}`
        }).catch(e => {
            this.setState({ errors: e })
        })
    }

    addInput(e) {   
        e.preventDefault()
        var inputNo = this.state.additionalInputs.length
        this.setState({
            additionalInputs: this.state.additionalInputs.concat([<input name={`sectionName${inputNo}`} placeholder="Name your section" />])
        })
    }

    deleteInput(e){
        e.preventDefault()
        var inputNo = this.state.additionalInputs.length
        this.setState({
            additionalInputs: this.state.additionalInputs.splice(inputNo, 1)
        })
    }

    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(e => <li>{e}</li>)}
                </ul>
        }

        return <form className="new-section-form" onSubmit={e => this.submit(e)}>
                 {this.state.errors ? <p>There were errors with your section:</p> : null}
                 {err}
                <div>
                    <input ref="sectionName" type="text" placeholder="Name your section" required/>
                    <textarea ref="sectionDescription" type="text" placeholder="Add a short description about this section - not required"></textarea>
                    <ul>
                    {this.state.additionalInputs.map(x => <li>{x}<button className="delete-button" onClick={x => deleteInput(x)}>-</button></li>)}
                    </ul>
                    <div>
                     <button className="add-field-button" onClick={e => this.addInput(e)}>+</button>
                    </div>
                </div>
        </form>
    }
}

export class NewCategory extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e) {
        e.preventDefault()
        post('api/category',{
            categoryName: this.refs.categoryName.value
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
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }

        return <form className="new-category-form" onSubmit={e => this.submit(e)}>
                     {this.state.errors ? <p>There were errors with your category:</p> : null}
                     {err}
                    <div>
                        <input ref="categoryName" type="text" placeholder="Name your category" required/>
                    </div>
            </form>
    }
}

export class NewOption extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(es) {
        e.preventDefault()
        post('api/option', {
            optionName: this.refs.OptionName.value
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

        return <form className="new-option-form" onSubmit={e => this.submit(e)}>
                 {this.state.errors ? <p>There were errors with your options:</p> : null}
                 {err}
                <div>
                    <input ref="OptionName" type="text" placeholder="Name your first option" required/>
                    <input ref="OptionName" type="text" placeholder="Include any additional options"/>
                    <input ref="OptionName" type="text" placeholder="Include any additional options"/>
                </div>
        </form>
    }
}

const Layout = ({children}) => 
    <div>
        <div>
            <Nav />
            <Jumbotron />
        </div>
            {children}
    </div>


// const CheckIsLoggedIn = () => 
//     auth.isLoggedIn()
//         .then(x => <EmployeeView />)
//         .catch(x => <NewEmployee />)




const reactApp = () =>
    render(
// ({
//     getInitialState() {
//         return {
//             isLoggedIn: auth.isLoggedIn()
//         }
//     },

//     updateAuth(isLoggedIn){
//         this.setState({
//             isLoggedIn 
//         })
//     },

//     componentWillMount() {
//         auth.onChange = this.updateAuth
//         auth.login()
//     },

//     render(){
//         {this.state.isLoggedIn ? ( <Route path="/Login"/> ) : ( <Route path="#/"/>)}
    <Layout>
        <Router history={hashHistory}>
            <Route path="/" component={EmployeeView}/>

            <Route path="/Login" component={Login}/>
            <Route path="/status/:employeeId" component={EmployeeView}/>
            <Route path="/newEmployee" component={NewEmployee}/>

            <Route path="/compose" component={Form}/>
            <Route path="/status/:adventId" component={AdventPage}/>
            
            <Route path="/status/:advanceId" component={AdvancePage}/>

            <Route path="*" component={Error}/>
        </Router>
    </Layout>,
    document.querySelector('.app'))

reactApp()

// Flow types supported (for pseudo type-checking at runtime)
// function sum(a: number, b: number): number {
//     return a+b;
// }
//
// and runtime error checking is built-in
// sum(1, '2');

// class ManagerView extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             items: []
//         }
//     }
//     componentDidMount(){
//         var getEmployees = (employees)
//         get('/api/employee').then(employees => {
//                 employees = employees()
//                 this.setState({items: employees})
//             }).catch(e => log(e))

//         var promise = get('/api/advent')
//             .then(advents => {
//                 advents = advents.reverse()
//                 this.setState({items: advents})
//             }).catch(e => log(e))
//     }
//     render(){
//         return <div>
//             <div className="grid grid-3-600">
//                 {this.state.items.map(Employee)}
//             </div>
//              <div className="grid grid-3-600">
//                 {this.state.items.map(Advent)}
//             </div>
//             <div>
//                 <a className="compose-advent" href="#/compose">
//                     <button>Create New Event</button>
//                 </a>
//             </div>
//         </div>
//     }
// }