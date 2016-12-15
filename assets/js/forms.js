import React, {Component} from 'react'
import * as models from './models'
import {get, post, put, log } from './app'
import { Button, FormGroup, FormControl, ControlLabel, Navbar, NavDropdown, MenuItem , DateTimeField, DateTimePicker } from 'react-bootstrap';
import * as components from './components'
import { Employee, Advance, Advent, Section, Category, Option, RootObject, Result, EventLocation } from './components'

let update // DANGER WILL ROBINSON, DOUNT TOUCH ME
    , getRootState 


export class AdventForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            employees: [],
            eventLocations: [],
            advances: [],
            sections: [],
            categories: [],
            options: []
        }
        update = () => this.forceUpdate()
        getRootState = () => this.state
    }
    componentDidMount(){
        let {routeParams: {id}} = this.props
        console.log(`/api/advent/${id}`)
        if(id === undefined) return
        
        get(`/api/advent/${id}`)
            .catch(e => {
                window.location.hash = '#/'
            })
            .then(data => this.setState(Object.assign({}, this.state, data)))
            .then(d => this.forceUpdate())
    }
    
    pushNewEmployee(e){
        e.preventDefault()
        let {employees} = this.state
        this.setState({ employees: [...employees, models.employeeModel()] })
        update()
        
    }
    pushNewAdvance(e){
        e.preventDefault()
        let {advances} = this.state
        this.setState({ advances: [...advances, models.advanceModel()] })
        update()
        console.log(this.state)
    }    
    pushNewLocation(e){
        e.preventDefault()
        let {eventLocations} = this.state
        this.setState({ eventLocations: [...eventLocations, models.eventLocationModel()] })
        update()
    }
    change(e, name){
        e.preventDefault()
        this.setState({[name]: this.refs[name].value})
    }
    save(e){
        e.preventDefault()
        console.log(this.state)

        let {id} = this.state

        if(typeof id === "number"){ 
            put('/api/advent/'+this.state.id, this.state).then(x => {
                window.location.hash = `#/api/advent/${this.state.id}`
            }).catch(e => {
                this.setState({ errors: e })
            })
        } else {
            delete this.state.id
            post('/api/advent/', this.state).then(x => {
                if(typeof x.id !== "number") throw 'Did not save.'
                window.location.hash = `#/api/advent/${x.id}`
            }).catch(e => {
                this.setState({ errors: e })
            })
         }
    }
    
    render(){
         return <div className="advent-form">
            { this.state.errors 
                ? <div className="errors"><p>{this.state.errors}</p></div> 
                : undefined }

            <div className="advent-input-fields">
                <div className="title"><span>Event Name</span>
                 <input className="input-fields" onBlur={e => this.change(e, "eventName")} ref="eventName" placeholder="Event Name" required key={Math.random()} defaultValue={this.state.eventName || ""} /> 
                </div>
                <div className="title"><span>Start Date</span>
                 <input className="input-fields" onBlur={e => this.change(e, "startDate")}  ref="startDate" placeholder="Start Date" required key={Math.random()} defaultValue={this.state.startDate || ""} />
                </div>
                <div className="title"><span>End Date</span>
                 <input className="input-fields" onBlur={e => this.change(e, "endDate")} ref="endDate" placeholder="End Date" required key={Math.random()} defaultValue={this.state.endDate || ""} /> 
                </div>
            </div>
            <ul>
                <span className="location">Location</span>
                {(this.state.eventLocations || []).map(l => <LocationForm eventlocation={l}/>)}
                <button className="form-buttons" onClick={e => this.pushNewLocation(e)}>New Location</button>
            </ul>
            <ul>
                <span className="employee">Employee</span>
                {(this.state.employees || []).map(e => <EmployeeForm employee={e}/>)}
                <button className="form-buttons" onClick={e => this.pushNewEmployee(e)}>New Employee</button>
            </ul>
            <ul>
                <span className="advance">Advance</span>
                {(this.state.advances || []).map(e => <AdvanceForm advance={e} employees={this.state.employees} />)}
                <button className="form-buttons" onClick={e => this.pushNewAdvance(e)}>New Advance</button>
            </ul>
           
            <button className="form-buttons" onClick={e => this.save(e)}> SAVE and PREVIEW </button>
        </div>
    }

}

export class AdventPage extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
       
        let {routeParams: {id}} = this.props
        
        if(id === undefined) {
            window.location.hash = '#/'
            return
        }

        let x = get(`/api/advent/${id}`)
            .then(data => this.setState(Object.assign({}, this.state, data)))
            .catch(e => {
                console.log(e)
                window.location.hash = '#/'
            })
    }
    
    render() {
       
        return <div className="advance-return-view">
                <ul>
                    <span className="advent-view"></span>
                    <h3>Welcome to {this.state.eventName} !</h3>
                    <li>Start Date:   {this.state.startDate}</li>
                    <li>End Date:   {this.state.endDate}</li>
                    <li>{(this.state.eventLocations || []).map(EventLocation)}</li>
                    <span className="advent-view"></span>
                    <p> Thank you for being part of {this.state.eventName}. In order to ensure your needs are met during the event, please take a moment to fill out the form below. </p>
                    <p>Note that if you need to make any edits after your initial submission, simply follow the link back to this page, fill out the form again, and resubmit. Your information will be updated automatically.</p> 
                    <p>All requests are subject to approval and must be submitted by the due date below in order to be considered.</p>
                    <ul>{(this.state.advances || []).map(Advance)}</ul>
                    <span className="advent-view">Employees</span>
                    {(this.state.employees || []).map(Employee)}
                </ul>
                <a href={`#/build/${this.state.id}`}>
                    <button className="build-button">Edit</button>
                </a>
            </div>  
    }
}

export class EmployeeForm extends Component {
    constructor(props){
        super(props)
    }
    change(e, name){
        e.preventDefault()
        this.props.employee[name] = this.refs[name].value
    }
    render(){
        return <div className="employee-form">
            
            <ul className="input-fields">
                <li> <input onChange={e => this.change(e, "fName")} onBlur={update} ref="fName" placeholder="First Name" required key={Math.random()} defaultValue={this.props.employee.fName || ""} /> </li>
                <li> <input onChange={e => this.change(e, "lName")} onBlur={update} ref="lName" placeholder="Last Name" required key={Math.random()} defaultValue={this.props.employee.lName || ""} /> </li>
                <li> <input onChange={e => this.change(e, "department")} onBlur={update} ref="department" placeholder="Department" required key={Math.random()} defaultValue={this.props.employee.department || ""} /> </li>
                <li> <input onChange={e => this.change(e, "position")} onBlur={update} ref="position" placeholder="Position" required key={Math.random()} defaultValue={this.props.employee.position || ""} /> </li>
                <li> <input onChange={e => this.change(e, "phone")} ref="phone" onBlur={update} placeholder="Mobile Number" required key={Math.random()} defaultValue={this.props.employee.phone || ""} /> </li>
                <li> <input onChange={e => this.change(e, "email")} ref="email" onBlur={update} placeholder="email@email.com" required key={Math.random()} defaultValue={this.props.employee.email || ""} /> </li>
            </ul>
                
        </div>
    }
}

export class AdvanceForm extends Component {
    constructor(props){
        super(props)
    }
    change(e, name){
        this.props.advance[name] = this.refs[name].value
    }
    pushNewSection(e){
        if(!this.props.advance.sections) this.props.advance.sections = []
        this.props.advance.sections.push(models.sectionModel())
        update()
    }
    render(){
        return <div className="advance-form">
            <ul className="input-fields">
                <li> <input onChange={e => this.change(e, "advanceName")} ref="advanceName" placeholder="Advance Name" required key={Math.random()} defaultValue={this.props.advance.advanceName || ""} /> </li>
                <li> <input onChange={e => this.change(e, "dueDate")} ref="dueDate" placeholder="Due Date DD/MM/YR" required key={Math.random()} defaultValue={this.props.advance.dueDate || ""} /> </li>
               
            </ul>
              <ul>
                <span className="section">Section</span>
                {(this.props.advance.sections || []).map(e => <SectionForm section={e} />)}
                <button className="form-buttons" onClick={e => this.pushNewSection(e)}>New Section</button>
                <span></span>
            </ul>
            
        </div>
    }
}

export class SectionForm extends Component {
    constructor(props){
        super(props)
        // this.props.section is an object passed in that holds default or existing section data
        // this.state = {
        //     eventLocations: [],
        //     categories: []
        // }
    }
    pushNewCategory(e){
        if(!this.props.section.categories) this.props.section.categories = []
        this.props.section.categories.push(models.categoryModel())
        update()
    }
    change(e, name){
        e.preventDefault()
        this.props.section[name] = this.refs[name].value
    }
    render(){
        return <div className="section-form">
            
            <ul className="input-fields">
                <li> <input onChange={e => this.change(e, "sectionName")} onBlur={update} ref="sectionName" placeholder="Section Name" required key={Math.random()} defaultValue={this.props.section.sectionName || ""} /> </li>
                <li> <input onChange={e => this.change(e, "sectionDescription")} onBlur={update} ref="sectionDescription" placeholder="Brief Description - not required" required key={Math.random()} defaultValue={this.props.section.sectionDescription || ""} /> </li>
            </ul>
            <ul>
                <span className="category">Category</span>
                {(this.props.section.categories || []).map(e => <CategoryForm category={e} />)}
                <button className="form-buttons" onClick={e => this.pushNewCategory(e)}>New Category</button>
            </ul>
            
        </div>
    }
}

export class CategoryForm extends Component {
    constructor(props){
        super(props)
        // this.props.category is an object passed in that holds default or existing advance data
    }
    pushNewOption(e){
        if(!this.props.category.options) this.props.category.options = []
        this.props.category.options.push(models.optionModel())
        update()
    }
     pushNewInput(e){
        if(!this.props.category.options) this.props.category.options = []
        this.props.category.options.push(models.optionModel())
        update()
    }
    change(e, name){
        e.preventDefault()
        this.props.category[name] = this.refs[name].value
    }
    
    render(){
        return <div className="category-form">
            <ul className="input-fields">
                <li> <input onChange={e => this.change(e, "categoryName")} onBlur={update} ref="categoryName" placeholder="Category Name" required key={Math.random()} defaultValue={this.props.category.categoryName || ""} /> </li>
            </ul>
            <ul>
                <span className="option">Option</span>
                {(this.props.category.options || []).map(e => <OptionForm option={e}/>)}
                <button className="form-buttons" onClick={e => this.pushNewOption(e)}>New Option</button>
                {(this.props.category.options || []).map(e => <InputField option={e}/>)}
                <button className="form-buttons" onClick={e => this.pushNewInput(e)}>Include Input Field</button>
            </ul>  
        </div>
    }
}

export class OptionForm extends Component {
    constructor(props){
        super(props)
        // this.props.option is an object passed in that holds default or existing advance data
    }
   
    change(e, name){
        e.preventDefault()
        this.props.option[name] = this.refs[name].value
    }
    render(){
        return <div className="option-form">
            <ul className="input-fields">
                <li> <input onChange={e => this.change(e, "optionName")} onBlur={update} ref="optionName" placeholder="Option Name" required key={Math.random()} defaultValue={this.props.option.optionName || ""} /> </li>
             </ul>
        </div>
    }
}

export class InputField extends Component {
    constructor(props){
        super(props)
    }
    change(e, name){
        e.preventDefault()
        this.props.option[name] = this.refs[name].value
    }
    render(){
        return <div className="option-form">
            <ul className="input-fields">
                <li><input onChange={e => this.change(e, "optionValue")} onBlur={update} ref="optionValue" placeholder="Enter Amount" required key={Math.random()} defaultValue={this.props.option.optionValue || 0} /> </li>
            </ul>
        </div>
    }
}

            

export class LocationForm extends Component {
    constructor(props){
        super(props)
        // this.props.location is an object passed in that holds default or existing advance data
        this.state = {}
    }
   
    getLocation(e, address){
        e.preventDefault()
        var promise = get(`/api/location/${this.refs.address.value}`)
        promise.then(resp => {
            const {
                adventId,
                formattedAddress,
                id,
                lat,
                lng
            } = resp 
            Object.assign(this.props.eventlocation, {formattedAddress,lat,lng}) // store location results on props
            update()
        })
        .catch(err => log(err)) 
    }
    
    render(){
        const eventLocation = this.props.eventlocation || {}
        
        if(eventLocation.formattedAddress){
            return <div className="location">
                <ul>
                    <li>{eventLocation.formattedAddress}</li>
                    <li>{eventLocation.lat}</li>
                    <li>{eventLocation.lng}</li>
                </ul>
           </div>
        }
        
        const err = <ul className="compose-errors">
            {(this.state.errors || []).map(e => <li>{e}</li>)}
            </ul>
        
        return <div className="new-event-location-form">
                 {this.state.errors ? <p>There were errors with your location search:</p> : null}
                 {err}
                 
                <div className="input-fields">
                    <input ref="address" placeholder="Search locations: enter an address or zip code" /> 
                    <button className="google-button" onClick={e => this.getLocation(e)} type="submit">Search</button>
                </div>
        </div>          
    }
}





