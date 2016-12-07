import React, {Component} from 'react'
import * as models from './models'
import {get, post} from './app'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

let update // DANGER WILL ROBINSON, DOUNT TOUCH ME

export default class AdventForm extends Component {
    constructor(){
        super()
        this.state = {
            advances: [],
            employees: [],
            rOs: []
        }
        update = () => this.forceUpdate()
    }
    pushNewEmployee(e){
        e.preventDefault()
        let {employees} = this.state
        this.setState({ employees: [...employees, models.employeeModel()] })
    }
    pushNewAdvance(e){
        e.preventDefault()
        let {advances} = this.state
        this.setState({ advances: [...advances, models.advanceModel()] })
    }
    pushNewrO(e){
        e.preventDefault()
        let {rOs} = this.state

        this.setState({ rOs: [...rOs, models.rOModel()] })
    }
    save(e){
        e.preventDefault()
        console.log(this.state)
        post('/api/advent', this.state
        ).then(x => {
            window.location.hash = `#/status/${x.id}`
        }).catch(e => {
            this.setState({ errors: e })
        })
    }
    render(){
        return <div className="advent-form">
            <ul>
                {this.state.employees.map(e => <EmployeeForm employee={e}/>)}
                <button className="form-buttons" onClick={e => this.pushNewEmployee(e)}>Add another employee?</button>
            </ul>
            <ul>
                {this.state.advances.map(e => <AdvanceForm advance={e} employees={this.state.employees}/>)}
                <button className="form-buttons" onClick={e => this.pushNewAdvance(e)}>Add another advance?</button>
            </ul>
            <ul>
                {this.state.rOs.map(location => <LocationForm location={location}/>)}
                <button className="form-buttons" onClick={e => this.pushNewrO(e)}>Add another location?</button>
            </ul>
            
            <button className="form-buttons" onClick={e => this.save(e)}> BIG SAVE BUTTON </button>
        </div>
    }
}

export class EmployeeForm extends Component {
    constructor(props){
        super(props)
        // this.props.employee should be the object passed in as a prop
        // this.state = {}
    }
    change(e, name){
        e.preventDefault()
        this.props.employee[name] = this.refs[name].value
    }
    render(){
        return <div className="employee-form">
            <ul>
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
        // this.props.advance is an object passed in that holds default or existing advance data
    }
    pushNewSection(e){
        e.preventDefault()
        let {advance} = this.props
            , {sections} = advance
        advance.sections = sections ? [...sections, models.sectionModel()] : [models.sectionModel()]
        update()
    }
    change(e, name){
        e.preventDefault()
        this.props.advance[name] = this.refs[name].value
    }
    render(){
        return <div className="advance-form">
            <ul>
                <li> <input onChange={e => this.change(e, "advanceName")} ref="advanceName" placeholder="Advance Name" defaultValue={this.props.advance.advanceName} /> </li>
                <li> <input onChange={e => this.change(e, "dueDate")} ref="dueDate" placeholder="Due Date DD/MM/YR" defaultValue={this.props.advance.dueDate} /> </li>
                <li> <FormGroup onChange={e => this.change(e, "isAssigned")} ref="assigned" controlId="formControlsSelect">
                        <ControlLabel>Assign Advance</ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="select">choose Employee</option>
                            {this.props.employees.map(e => <option value={e.id}>{e.fName}{e.lName}</option>)}
                        </FormControl>
                    </FormGroup>
                </li> 
                <li> 
                    <FormGroup onChange={e => this.change(e, "isComplete")} ref="isComplete" controlId="formControlsSelect">
                        <ControlLabel>Advance Complete?</ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="select">Select</option>
                            <option value="other">Yes</option>
                            <option value="other">No</option>
                        </FormControl>
                    </FormGroup>
                </li>
            </ul>
            <ul>
                {(this.props.advance.sections || []).map(e => <SectionForm section={e}/>)}
                <button className="form-buttons" onClick={e => this.pushNewSection(e)}>Add another section?</button>
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
    pushNewrO(e){
        e.preventDefault()
        let {section} = this.props
        if(!section.rOs) section.rOs = []
        section.rOs.push(models.rOModel())
        update()
    }
    pushNewCategory(e){
        e.preventDefault()
        let {section} = this.props
        if(!section.categories) section.categories = []
        section.categories.push(models.categoryModel())
        update()
    }
    // change(e, name){
    //     e.preventDefault()
    //     this.props.section[name] = this.refs[name].value
    // }
    render(){
        return <div className="section-form">
            <ul>
                <li> <input onChange={e => this.change(e, "sectionName")} ref="sectionName" placeholder="Section Name" defaultValue={this.props.section.sectionName} /> </li>
                <li> <input onChange={e => this.change(e, "sectionDescription")} ref="sectionDescription" placeholder="Brief Description - not required" defaultValue={this.props.section.sectionDescription} /> </li>
            </ul>
            <ul>
                {(this.props.section.rOs || []).map(location => <LocationForm location={location} label="Section"/>)}
                <button className="form-buttons" onClick={e => this.pushNewrO(e)}>Add another location?</button>
            </ul>
            <ul>
                {(this.props.section.categories || []).map(e => <CategoryForm category={e}/>)}
                <button className="form-buttons" onClick={e => this.pushNewCategory(e)}>Add another category?</button>
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
        e.preventDefault()
        let {category} = this.props
        if(!category.options) category.options = []
        category.options.push(models.optionModel())
        update()
    }
    change(e, name){
        e.preventDefault()
        this.props.category[name] = this.refs[name].value
    }
    
    render(){
        return <div className="category-form">
            <ul>
                <li> <input onChange={e => this.change(e, "categoryName")} ref="categoryName" placeholder="Category Name" defaultValue={this.props.category.categoryName} /> </li>
            </ul>
            <ul>
                {(this.props.category.options || []).map(e => <OptionForm option={e}/>)}
                <button className="form-buttons" onClick={e => this.pushNewOption(e)}>Add another option?</button>
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
            <ul>
                <li> <input onChange={e => this.change(e, "optionName")} ref="optionName" placeholder="Option Name" defaultValue={this.props.option.optionName} /> </li>
            </ul>
        </div>
    }
}

class LocationForm extends Component {
    constructor(props){
        super(props)
        // this.props.location is an object passed in that holds default or existing advance data
        this.state = {
            results: []
        }
        if(!this.props.label) this.props.label = "Advance"
    }
    click(e){
        e.preventDefault()
        if(!this.state.results.length) return
        const {location} = this.props
        Object.assign(location, this.state.results[0])
        update()
    }
   
    getLocation(e, address){
        e.preventDefault()
        var promise = get(`/api/rootobject/${this.refs.address.value}`)
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
                <button className="form-buttons" onClick={e => this.click(e)} type="click">Add this Location to {this.props.label}</button> 
           </div>
        }
        
        const err = <ul className="compose-errors">
            {(this.state.errors || []).map(e => <li>{e}</li>)}
            </ul>
        
        return <div className="new-RO-form">
                 {this.state.errors ? <p>There were errors with your location search:</p> : null}
                 {err}
                <div>
                    <input ref="address" placeholder="search locations by entering an address or zip code" /> 
                    <button className="google-button" onClick={e => this.getLocation(e)} type="submit">Search</button>
                </div>
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
        post('api/advent',{
            name: this.refs.name.value,
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
        return  <form className="new-advent-form" onSubmit={e => this.submit(e)}>
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

// not sure if I've added the above correctly, but what I'd like is that they do a location search, and then have the option to add the results to that advance and/or section  



    
            