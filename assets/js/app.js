// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
// import { Datepicker } from 'react-bootstrap-date-picker'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, RootObject, Result, Geometry, Location } from './components'
import * as Boot from 'react-bootstrap' // read up @ https://react-bootstrap.github.io/components.html

// console.log(Boot) // what hast thou provided?

// Utility methods
// --------------


const get = (url) =>
    fetch(url, {credentials: 'same-origin'})
    .then(r => {
        return r.json()
    })
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

const log = (...a) => console.log(...a)

const Error = () => <div>Page Not Found</div>

class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {}
        }
    submit(e) {
        e.preventDefault()
            post('account/login', {
            email: this.refs.email.value,
            password: this.refs.password.value
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
        return <form className="login-form" onSubmit={e => this.submit(e)}>
            {this.state.errors ? <p>There were errors with your Login:</p> : null}
            {err}

            <p>Please Log In</p>   
            <div>
                <input ref="email" type="email" placeholder="user@email.com" required/>
                <input ref="password" type="password" placeholder="Your Password" required/>
            </div>
            <div>
                <a className="login-button" href="#/">
                    <button type="submit">Log In</button>
                </a>
            </div>
        </form>
    }
}


class RegisterForm extends Component {
    constructor(props){
        super(props)
         this.state = {}
        }
    submit(e) {
        e.preventDefault()
        post('account/register', {
            email: this.refs.email.value,
            password: this.refs.password.value
        }).then(x => {
            window.location.hash = `#/newEmployee`
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
        return <form onSubmit={e => this.submit(e)}>
            {this.state.errors ? <p>There were errors with your Registration:</p> : null}
            {err}

            <p>Or Register</p>   
            <div>
                <input ref="email" type="email" placeholder="user@email.com" required/>
                <input  ref="password" type="password" placeholder="Your Password" required/>
            </div>
            <div>
                <a className="register-button" href="#/newEmployee">
                    <button type="submit">Register</button>
                </a>
            </div>
        </form>
    }
}
class Login extends Component {
    constructor(props){
        super(props)
        this.state = { CheckIsLoggedIn: false }
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
                <RegisterForm />
            </div>
        )
    }
}

const CheckIsLoggedIn = () => 
    auth.isLoggedIn()
        .then(x => <EmployeeView />)
        .catch(x => <NewEmployee />)


class NewEmployee extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e) {
        e.preventDefault()
        //forms by default will refresh the page
        post('api/employee',{
            fName: this.refs.FName.value, 
            lName: this.refs.LName.value, 
            department: this.refs.Department.value,
            phone: this.refs.Phone.value 
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
        return <form className="new-employee-form" onSubmit={e => this.submit(e)}>
             {this.state.errors ? <p>There were errors with your new Employee submission</p> : null}
             {err}
                <div>
                    <div>
                        <input ref="FName" type="string" placeholder="First Name" required/>
                        <input ref="LName" type="string" placeholder="Last Name" required/>
                        <input ref="Department" type="string" placeholder="Department Name" required/>
                        <input ref="Phone" type="PhoneAttribute" placeholder="Phone including area code" required/>
                    </div>
                <div>
                    <a className="new-employee-button" onSubmit={e => this.submit(e)}>
                        <button type="submit">Add Employee</button>
                    </a>
                </div>
                </div>
                </form>
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
        this.state = { id: props.params.id }
    }
    submit(e){
        e.preventDefault()
        get('/api/rootobject', {
            address: this.refs.text.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/${x.id}`
            
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
                <div>
                    <button type="submit">Add Location</button>
                </div>
        </form>

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
                    
                    <button type="submit">Submit Event</button>
                </div>
        </form>
    }
}

class AdvancePage extends Component {
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

class NewAdvance extends Component {
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
                <div>
                      <button type="submit">Create Advance</button>
                </div>  
        </form>
            
        
    }
}

class NewSection extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e) {
        e.preventDefault()
        post('api/section',{
            sectionName: this.refs.sectionName.value,
            sectionDescription: this.refs.sectionDescription.value,
            cost: this.refs.cost.value
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

        return <form className="new-section-form" onSubmit={e => this.submit(e)}>
                 {this.state.errors ? <p>There were errors with your section:</p> : null}
                 {err}
                <div>
                    <input ref="sectionName" type="text" placeholder="Name your section" required/>
                    <textarea ref="sectionDescription" type="text" placeholder="Add a short description about this section - not required"></textarea>
                    <input ref="cost" type="double" placeholder="Include the cost of the items in this section if applicable - this info will not be displayed to your staff if you don't want it to be."/>
                </div>
                <div>
                    <button type="submit">Add Section</button>
                </div>
        </form>
    }
}

class NewCategory extends Component {
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
                    <div>
                        <button type="submit">Add Category</button>
                    </div>
            </form>
    }
}

class NewOption extends Component {
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
                <div>
                    <button type="submit">Add Option</button>
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






const reactApp = () => 
    render(
    <Layout>
        <Router history={hashHistory}>
            <Route path="/" component={EmployeeView}/>

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