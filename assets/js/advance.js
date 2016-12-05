// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
// import { Datepicker } from 'react-bootstrap-date-picker'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { get, post, log, Error, Layout, reactapp } from './app'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, RootObject, Result, Location, Geometry } from './components'
import { NewEmployee, EmployeeView } from './employee'
import { AdventPage, NewAdvent } from './event'
import { LoginForm, RegisterForm, Login } from './login'
import { NewRootObject, LocationSearchResult } from './rootobject'


// export class AdvanceForm extends React.Component {
//     var ExampleForm = React.createClass({
//   _onChange(event, name, data, change) {
//     // ... 
//   },
 
//   _onSubmit(event, data) {
//     // ... 
//   },
 
//   render() {
//     return <AutoForm onChange={this._onChange} onSubmit={this._onSubmit} trimOnSubmit>
//       {/* ...form inputs... */}
//     </AutoForm>
//   }
// })
// }

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
                <NewSection />
                <NewCategory />
                <NewOption />
                <NewRootObject />
                    <button type="submit">Include this section in your Advance</button>
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

export class NewAdvance extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e) {
        e.preventDefault()
        post('/api/advance',{
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
        this.state = {}
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
                </div>
        </form>
    }
}


export class NewCategory extends Component {
    constructor(props){
        super(props)
        this.state = {
            fields: []
        }
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
        this.state = {
            fields: []
        }
    }
    submit(e) {
        e.preventDefault()
        post('api/option', {
            optionName: this.refs.OptionName.value
        }).then(x => {
           window.location.hash = `#/status/${x.id}`
        }).catch(e => {
             this.setState({ errors: e })
            })
    }

    add(){
        this.setState({
            fields: this.state.fields.concat("")
        })
    }

    remove(i){
        const {fields} = this.state
        this.setState({
            fields: fields.slice(0,i).concat(fields.slice(i+1))
        })
    }

    update(e, i){
        const {fields} = this.state
        fields[i] = e.target.innerText
        this.setState({fields})
    }

    render(){
        const {fields} = this.state
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(e => <li>{e}</li>)}
                </ul>
        }

        return <form className="new-option-form" onSubmit={e => e.preventDefault()}>
                 {this.state.errors ? <p>There were errors with your options:</p> : null}
                 {err}
                <div>
                    <input ref="OptionName" type="text" placeholder="Name your first option" required/>
                    {
                    fields.map((v,i) => <div>
                    <span  
                        ref="OptionName" 
                        placeholder="Add an additional option"
                        contentEditable
                        className="form-field"
                        onInput={e => this.update(e, i)}
                        >{v}</span>
                    <button onClick={e => this.remove(i)}>-</button>
                </div>)
            }
            <button onClick={e => this.add()}>+</button>
                </div>
        </form>
    }
}
