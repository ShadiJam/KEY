import React, {Component} from 'react'
import * as models from './models'
import {get, post, put, log } from './app'
import { Button, FormGroup, FormControl, ControlLabel, Navbar, NavDropdown, MenuItem , DateTimeField, DateTimePicker } from 'react-bootstrap';
import * as components from './components'
import { Employee, Advance, Advent, Section, Category, Option, RootObject, Result } from './components'



let update // DANGER WILL ROBINSON, DOUNT TOUCH ME

export class EmployeeList extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: [],
            employees: []
        }
    }
    componentDidMount(){
        get('/api/employee').then(employees => {
                this.setState({items: employees})
            }).catch(e => log(e))
    }
        pushNewEmployee(e){
        e.preventDefault()
        let {employees} = this.state
        this.setState({ employees: [...employees, models.employeeModel()]})
        update()  
    }
    render(){

        return <div className="employee">
            
            <div className="grid grid-3-600">
                {this.state.items.map(Employee)}
            </div>

            <ul>
                {(this.state.employees || []).map(e => <EmployeeForm employee={e}/>)}
                <button className="form-buttons" onClick={e => this.pushNewEmployee(e)}>Add employees?</button>
            </ul>
            
        </div>
        }
    }

  


export class NewEvent extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e) {
        e.preventDefault()
        post('api/advent', {
            eventName: this.refs.eventName.value,
            startDate: this.refs.startDate.value,
            endDate: this.refs.endDate.value
       }).then(x => {
            window.location.hash = `api/advent/${x.id}`
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
                <h4>Event</h4>   
                <div className="input-fields">
                    <input ref="eventName" type="text" placeholder="Event Name" required/>
                    <input ref="startDate" type="DateTime" placeholder="Start Date DD/MM/YR" required/>
                    <input ref="endDate" type="DateTime" placeholder="End Date DD/MM/YR" required/>
                </div>
                <div>
                    <button className="create-event" type="submit">Submit Event</button>
                </div>
        </form>
    }
}


export class AdventForm extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            id: props.params.id,
            employees: [],
            rOs: [],
            advances: [],
            sections: [],
            categories: [],
            options: []
        }
        update = () => this.forceUpdate()
    }
    componentDidMount(){
        get('/api/advent').then(x => {
                this.setState({item: x})
            })
    }
    pushNewEmployee(e){
        e.preventDefault()
        let {employees} = this.state
        this.setState({ employees: [...employees, models.employeeModel()]})
        update()
        
    }
    pushNewAdvance(e){
        e.preventDefault()
        let {advances} = this.state
        this.setState({ advances: [...advances, models.advanceModel()]})
        update()
    }    
    pushNewrO(e){
        e.preventDefault()
        let {rOs} = this.state
        this.setState({ rOs: [...rOs, models.rOModel()] })
        update()
    }
    save(e){
        e.preventDefault()
        put('api/advent/'+this.state.id, {
            employees: this.state.employees,
            advances: this.state.advances, 
            rOs: this.state.rOs,
            sections: this.state.sections,
            categories: this.state.categories,
            options: this.state.options         
        }).then(x => {
            window.location.hash = `api/advent/${x.id}`
        }).catch(e => {
            this.setState({ errors: e })
        })
    }
    render(){
        const item = this.state.item
        if(!item)
            return <div/>

        return <div className="advance-form">
            <div className="event-info">
                <h5>{item.eventName}</h5>
                <p>{item.startDate}</p>
                <p>{item.endDate}</p>
            </div>
            <ul>
                {(this.state.rOs || []).map(location => <LocationForm location={location}/>)}
                <button className="form-buttons" onClick={e => this.pushNewrO(e)}>Add an event location?</button>
            </ul>
            <ul>
                {(this.state.employees || []).map(e => <EmployeeForm employee={e}/>)}
                <button className="form-buttons" onClick={e => this.pushNewEmployee(e)}>Add employees?</button>
            </ul>
            <ul>
                {(this.state.advances || []).map(e => <AdvanceForm advance={e} employees={this.state.employees} />)}
                <button className="form-buttons" onClick={e => this.pushNewAdvance(e)}>Create an advance?</button>
            </ul>
           
            <button className="form-buttons" onClick={e => this.save(e)}> BIG SAVE BUTTON </button>
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
            <span>Employees</span>
            <ul className="input-fields">
                <li> <input onChange={e => this.change(e, "fName")} onBlur={update} ref="fName" placeholder="First Name" defaultValue={this.props.employee.fName} /> </li>
                <li> <input onChange={e => this.change(e, "lName")} onBlur={update} ref="lName" placeholder="Last Name" defaultValue={this.props.employee.lName} /> </li>
                <li> <input onChange={e => this.change(e, "department")} onBlur={update} ref="department" placeholder="Department" defaultValue={this.props.employee.department} /> </li>
                <li> <input onChange={e => this.change(e, "phone")} ref="phone" onBlur={update} placeholder="Mobile Number" defaultValue={this.props.employee.phone} /> </li>
                <li> <input onChange={e => this.change(e, "email")} ref="email" onBlur={update} placeholder="email@email.com" defaultValue={this.props.employee.email} /> </li>
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
        console.log(this.props)
        return <div className="advance-form">
            <span>Advance</span>
            <ul className="input-fields">
                <li> <input onChange={e => this.change(e, "advanceName")} ref="advanceName" placeholder="Advance Name" defaultValue={this.props.advance.advanceName} /> </li>
                <li> <input onChange={e => this.change(e, "dueDate")} ref="dueDate" placeholder="Due Date DD/MM/YR" defaultValue={this.props.advance.dueDate} /> </li>
               
            </ul>
              <ul>
                {(this.props.advance.sections || []).map(e => <SectionForm section={e} />)}
                <button className="form-buttons" onClick={e => this.pushNewSection(e)}>Add a section?</button>
            </ul>
            
        </div>
    }
}


export class SectionForm extends Component {
    constructor(props){
        super(props)
        // this.props.section is an object passed in that holds default or existing section data
        // this.state = {
        //     rOs: [],
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
            <span>Section</span>
            <ul className="input-fields">
                <li> <input onChange={e => this.change(e, "sectionName")} onBlur={update} ref="sectionName" placeholder="Section Name" defaultValue={this.props.section.sectionName} /> </li>
                <li> <input onChange={e => this.change(e, "sectionDescription")} onBlur={update} ref="sectionDescription" placeholder="Brief Description - not required" defaultValue={this.props.section.sectionDescription} /> </li>
            </ul>
            <ul>
                {(this.props.section.categories || []).map(e => <CategoryForm category={e} />)}
                <button className="form-buttons" onClick={e => this.pushNewCategory(e)}>Add a category?</button>
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
    change(e, name){
        e.preventDefault()
        this.props.category[name] = this.refs[name].value
    }
    
    render(){
        return <div className="category-form">
            <span>Category</span>
            <ul className="input-fields">
                <li> <input onChange={e => this.change(e, "categoryName")} onBlur={update} ref="categoryName" placeholder="Category Name" defaultValue={this.props.category.categoryName} /> </li>
            </ul>
            <ul>
                {(this.props.category.options || []).map(e => <OptionForm option={e}/>)}
                <button className="form-buttons" onClick={e => this.pushNewOption(e)}>Add an option?</button>
            </ul>  
        </div>
    }
}

export class OptionForm extends Component {
    constructor(props){
        super(props)
        // this.props.option is an object passed in that holds default or existing advance data
        
    }
    pushNewrO(e){
        e.preventDefault()
        let {option} = this.props
        if(!option.rOs) option.rOs = []
        option.rOs.push(models.rOModel())
        update()
    }
    change(e, name){
        e.preventDefault()
        this.props.option[name] = this.refs[name].value
    }
    render(){
        return <div className="option-form">
            <span>Option</span>
            <ul className="input-fields">
                <li> <input onChange={e => this.change(e, "optionName")} onBlur={update} ref="optionName" placeholder="Option Name" defaultValue={this.props.option.optionName} /> </li>
            </ul>
               
            <ul>
                {(this.props.option.rOs || []).map(location => <LocationForm location={location} label="Option"/>)}
                <button className="form-buttons" onClick={e => this.pushNewrO(e)}>Add location as an option?</button>
            </ul>
        </div>
    }
}

export class LocationForm extends Component {
    constructor(props){
        super(props)
        // this.props.location is an object passed in that holds default or existing advance data
        this.state = {
            results: []
        }
    }

    save(e){
        e.preventDefault()
        if(!this.state.results.length) return
        const {location} = this.props
        Object.assign(location, this.state.results[0])


        post('/api/advent', this.state).then(x => {
            this.setState({ results: this.state.results })
            update()
        }).catch(e => {
            this.setState({ errors: e })
        })
    }
   
    getLocation(e, address){
        e.preventDefault()
        var promise = get(`/api/location/${this.refs.address.value}`)
        promise.then(resp => {
            if(!resp.results.length) return

            this.setState({results: resp.results})
            Object.assign(this.props.location, resp.results[0])
            update()
        })
        .catch(err => log(err)) 
    }
    
    render(){
        const results = this.state.results

        if(results.length){
            return <div className="location">
                <ul>
                    <li>{results[0].formatted_address}</li>
                    <li>{results[0].geometry.location.lat}</li>
                    <li>{results[0].geometry.location.lng}</li>
                </ul>
                
                <button className="form-buttons" onClick={e => this.save(e)} type="click">Save this Location</button>
                
           </div>
        }
        
        const err = <ul className="compose-errors">
            {(this.state.errors || []).map(e => <li>{e}</li>)}
            </ul>
        
        return <div className="new-RO-form">
                 {this.state.errors ? <p>There were errors with your location search:</p> : null}
                 {err}
                 <span>Location</span>
                <div className="input-fields">
                    <input ref="address" placeholder="search locations by entering an address or zip code" /> 
                    <button className="google-button" onClick={e => this.getLocation(e)} type="submit">Search</button>
                </div>
        </div>          
    }
}


