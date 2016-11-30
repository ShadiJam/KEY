// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
// import { Datepicker } from 'react-bootstrap-date-picker'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, RootObject, Result, Geometry, Location, NewAdventForm, NewAdvanceForm, NewEmployeeForm, NewSectionForm, NewCategoryForm, NewOptionForm , NewRootObjectForm, NewRegisterForm, LoginForm } from './components'
import * as Boot from 'react-bootstrap' // read up @ https://react-bootstrap.github.io/components.html

console.log(Boot) // what hast thou provided?

// Utility methods
// --------------
const log = (...a) => console.log(...a)

const get = (url) =>
    fetch(url, {credentials: 'same-origin'})
    .then(r => r.json())
    .catch(e => log(e))

const post = (url, data) => 
    fetch(url, { 
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .catch(e => log(e))
    .then(r => r.json())
// ----------------




class RegisterBox extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    _handleSubmit(eventObject) {
        eventObject.preventDefault()
        //forms by default will refresh the page
        var formE1 = eventObject.target
        window.form = formE1
        var inputEmail = formE1.theEmail.value, 
            inputPassword = formE1.thePassword.value
        // the .value property on an input reveals what the user has entered for this input 
        var promise = post('/account/register',{
            email: inputEmail,
            password: inputPassword
        })
        promise.then(
            (resp) => log(resp),
            (err) => log(err)
        )
    }
    render() {
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }
        return (
            <div>
                <form id="register-form" onSubmit={this._handleSubmit}>
                    <NewRegisterForm />
                </form>
            </div>
        )
    }
}

class LoginBox extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    _handleSubmit(eventObject) {
        eventObject.preventDefault()
        //forms by default will refresh the page
        var formE2 = eventObject.target
        window.form = formE2
        var inputEmail = formE2.theEmail.value, 
            inputPassword = formE2.thePassword.value
        // the .value property on an input reveals what the user has entered for this input 
        var promise = post('/account/login',{
            email: inputEmail,
            password: inputPassword
        })
        promise.then(
            (resp) => log(resp),
            (err) => log(err)
        )
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }
        return (
            <div>
                <form id="login-form" onSubmit={this._handleSubmit}>
                    <LoginForm />
                </form>
            </div>
        )
    }
}

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        var err 
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        } 
        return (
            <div className="login-stuff">
                <LoginForm />
                <NewRegisterForm />
            </div>
        )
    }
}

class NewEmployee extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    _handleSubmit(eventObject) {
        eventObject.preventDefault()
        //forms by default will refresh the page
        var formE3 = eventObject.target
        window.form = formE3
        var inputFName = formE3.theFName.value,
            inputLName = formE3.theLName.value,
            inputDepartment = formE3.theDepartment.value,
            inputPhone = formE3.thePhone.value
        var promise = post('api/employee',{
            FName: inputFName, 
            LName: inputLName, 
            Department: inputDepartment,
            Phone: inputPhone
        })
        promise.then((resp) => log(resp),
            (err) => log(err)
        )
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }
        return <div>
                <div>
                    {this.state.errors ? <p>There were errors with your Event:</p> : null}
                    {err}
                </div>
                <div>
                    <form className="new-employee-form" onSubmit={this._handleSubmit}>
                        <NewEmployeeForm />
                    </form>
                </div>
                </div> 
    }
}

class EmployeeView extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: []
        }
    }
    componentDidMount(){
        get('/api/advent').then(advents => {
                advents = advents.reverse()
                this.setState({items: advents})
            }).catch(e => log(e))
    }
    render(){
        return <div className="grid grid-3-600">
            {this.state.items.map(Advent)}
            <div>
            <a href="#/compose">
                <button type="newAdvent">Create New Advent</button>
            </a>
            </div>
        </div>
    }
}

class NewRootObject extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e){
        e.preventDefault()
        get('/api/rootobject', {
            address: this.refs.address.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/${x.id}`
            
            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }
        return <div>
                <div>
                    {this.state.errors ? <p>There were errors with your Event:</p> : null}
                    {err}
                </div>
                <div>
                    <NewRootObjectForm />
                </div>
                </div> 
    }
}

class AdventPage extends Component {
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

class NewAdvent extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    _handleSubmit(eventObject) {
        eventObject.preventDefault()
        var formE4 = eventObject.target
        window.form = formE4
        var inputName = formE4.theName.value,
            inputStartDate = formE4.theStartDate.value,
            inputEndDate = formE4.theEndDate.value
        var promise = post('api/advent',{
            name: inputName,
            startDate: inputStartDate,
            endDate: inputEndDate
        })
        promise.then((resp) => log(resp),
            (err) => log(err)
        )
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }
        return <div>
                <div>
                    {this.state.errors ? <p>There were errors with your Event:</p> : null}
                    {err}
                </div>
                <div>
                    <form className="new-advent-form" onSubmit={e => this.submit(e)}>
                        <NewAdventForm />
                    </form>
                </div>
                </div> 
    }
}

class AdvancePage extends Component {
    constructor(props){
        super(props)
        this.state = { id: props.params.id }
    }
    componentDidMount(){
        get("/api/advance"+this.state.id).then(x => {
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

class NewAdvance extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e){
        e.preventDefault()
        post('/api/advance'+this.state.id, {
            AdvanceName: this.refs.AdvanceName.value,
            dueDate: this.refs.dueDate.value 
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/${x.id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }

        return <div>
                <div>
                    {this.state.errors ? <p>There were errors with your Advance:</p> : null}
                    {err}
                </div>
                <div>
                    <form className="new-advance-form" onSubmit={e => this.submit(e)}>
                        <NewAdvanceForm />
                    </form>
                    <NewSection />
                    <NewCategory />
                    <NewOption />
                    <NewRootObject />
                </div>
                </div> 
    }
}

class NewSection extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e){
        e.preventDefault()
        post('/api/section'+this.state.id, {
            SectionName: this.refs.SectionName.value,
            SectionDescription: this.refs.SectionDescription.value, 
            Cost: this.refs.Cost.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/${x.id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }

        return <div>
                <div>
                    {this.state.errors ? <p>There were errors with your Advance:</p> : null}
                    {err}
                </div>
                <div>
                    <form className="new-section-form" onSubmit={e => this.submit(e)}>
                        <NewSectionForm />
                    </form>
                </div>
                </div> 
    }
}

class NewCategory extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e){
        e.preventDefault()
        post('/api/category'+this.state.id, {
            CategoryName: this.refs.CategoryName.value,
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/${x.id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }

        return <div>
                <div>
                    {this.state.errors ? <p>There were errors with your Advance:</p> : null}
                    {err}
                </div>
                <div>
                    <form className="new-category-form" onSubmit={e => this.submit(e)}>
                        <NewCategoryForm />
                    </form>
                </div>
                </div> 
    }
}

class NewOption extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e){
        e.preventDefault()
        post('/api/option'+this.state.id, {
            OptionName: this.refs.OptionName.value,
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/${x.id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }

        return <div>
                <div>
                    {this.state.errors ? <p>There were errors with your Advance:</p> : null}
                    {err}
                </div>
                <div>
                    <form className="new-option-form" onSubmit={e => this.submit(e)}>
                        <NewOptionForm />
                    </form>
                </div>
                </div> 
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

const reactApp = () => 
    render(
    <Layout>
        <Router history={hashHistory}>
            <Route path="/Login" component={Login}/>
            <Route path="/status/:employeeId" component={EmployeeView}/>
            <Route path="/newEmployee" component={NewEmployee}/>

            <Route path="/compose" component={NewAdvent}/>
            <Route path="/status/:adventId" component={AdventPage}/>
            
            <Route path="/build" component={NewAdvance}/>
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