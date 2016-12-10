import React, {Component} from 'react'
import * as models from './models'
import {get, post, put, log } from './app'
import { Button, FormGroup, FormControl, ControlLabel, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';
import { Header, Employee, Advent, Advance, Section, Category, Option, RootObject, Result, Location, Geometry } from './components'

let update // DANGER WILL ROBINSON, DOUNT TOUCH ME

export class AdventOverview extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: []
        }
    }
    componentDidMount(){
        get('api/advent'+this.state.id).then(resp => {
            if(!resp.items.length) return
            
            this.setState({items: resp.items})
            Object.assign(this.props.items, resp.items[0])
            update()
        })
        .catch(e => log(e))
    }
    render(){
        const items = this.state.items
        if(items.length){
        return <div className="overview">
            <div className="advent">
                <h1>{items[0].name}</h1>
                <p>{items[0].startDate}</p>
                <p>{items[0].endDate}</p>
                <div className="grid grid-3-600">
                    {this.state.items.map(rOs)}
                </div>
            </div>
            <hr />
                <div className="grid grid-3-600">
                    {this.state.items.map(advances)}
                </div>
        </div>
        }
    }
}

export default class AdventForm extends Component {
    
    constructor(){
        super()
        this.state = {
            advent: [],
            employees: [],
            advances: []
        }
        update = () => this.forceUpdate()
    }
    pushNewEmployee(e){
        e.preventDefault()
        let {employees} = this.state
        this.setState({ employees: [...employees, models.employeeModel()]})
        
    }
    pushNewAdvance(e){
        e.preventDefault()
        let {advances} = this.state
        this.setState({ advances: [...advances, models.advanceModel()]})
       
    }
    pushNewrO(e){
        e.preventDefault()
        let {rOs} = this.state

        this.setState({ rOs: [...rOs, models.rOModel()] })
    }
    save(e){
        e.preventDefault()
        post('api/advent/', {
            eventName: this.refs.eventName.value,
            startDate: this.refs.startDate.value,
            endDate: this.refs.endDate.value, 
            employees: this.state.employees,
            advances: this.state.advances
            
        }).then(x => {
            window.location.hash = `api/advent/${x.id}`
        }).catch(e => {
            this.setState({ errors: e })
        })
    }
    render(){
        return <div className="advent-form">
            <div>
                <input ref="eventName" type="text" placeholder="Event Name" required/>
                <input ref="startDate" type="DateTime" placeholder="Start Date DD/MM/YR" required/>
                <input ref="endDate" type="DateTime" placeholder="End Date DD/MM/YR" required/>
            </div>
            <ul>
                {(this.state.employees || []).map(e => <EmployeeForm employee={e}/>)}
                <Button className="form-buttons" onClick={e => this.pushNewEmployee(e)}>Add employees?</Button>
            </ul>
            <ul>
                {(this.state.advances || []).map(e => <AdvanceForm advance={e} employees={this.state.employees} />)}
                <Button className="form-buttons" onClick={e => this.pushNewAdvance(e)}>Create an advance?</Button>
            </ul>
            <Button className="form-buttons" onClick={e => this.save(e)}> BIG SAVE BUTTON </Button>
        </div>
    }
}
// <ul>
//                 {(this.state.rOs || []).map(location => <LocationForm location={location}/>)}
//                 <Button className="form-buttons" onClick={e => this.pushNewrO(e)}>Add an event location?</Button>
//             </ul>

export class EmployeeForm extends Component {
    constructor(props){
        super(props)
        // this.props.employee should be the object passed in as a prop
        // this.state = {}
    }
    // popNewEmployee(e){
    //     console.log(this.props)
    //     e.preventDefault()
    //     let {employees} = models.employeeModel()
    //     this.setState({ employees: [] })
        
    // }
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
        if(!this.props.advance.sections) this.props.advance.sections = []
        this.props.advance.sections.push(models.sectionModel())
        update()
    }
    change(e, name){
        this.props.advance[name] = this.refs[name].value
    }
    render(){
        console.log(this.props)
        return <div className="advance-form">
            <ul>
                <li> <input onChange={e => this.change(e, "advanceName")} ref="advanceName" placeholder="Advance Name" defaultValue={this.props.advance.advanceName} /> </li>
                <li> <input onChange={e => this.change(e, "dueDate")} ref="dueDate" placeholder="Due Date DD/MM/YR" defaultValue={this.props.advance.dueDate} /> </li>
                <li> <FormGroup onChange={e => this.change(e, "isAssigned")} ref="isAssigned" controlId="formControlsSelect">
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
        e.preventDefault()
        let {section} = this.props
        if(!section.categories) section.categories = []
        section.categories.push(models.categoryModel())
        update()
    }
    change(e, name){
        e.preventDefault()
        this.props.section[name] = this.refs[name].value
    }
    render(){
        return <div className="section-form">
            <ul>
                <li> <input onChange={e => this.change(e, "sectionName")} onBlur={update} ref="sectionName" placeholder="Section Name" defaultValue={this.props.section.sectionName} /> </li>
                <li> <input onChange={e => this.change(e, "sectionDescription")} onBlur={update} ref="sectionDescription" placeholder="Brief Description - not required" defaultValue={this.props.section.sectionDescription} /> </li>
            </ul>
                
            <ul>
                {(this.props.section.categories || []).map(e => <CategoryForm category={e}/>)}
                <Button className="form-buttons" onClick={e => this.pushNewCategory(e)}>Add a category?</Button>
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
                <li> <input onChange={e => this.change(e, "categoryName")} onBlur={update} ref="categoryName" placeholder="Category Name" defaultValue={this.props.category.categoryName} /> </li>
            </ul>
                
            <ul>
                {(this.props.category.options || []).map(e => <OptionForm option={e}/>)}
                <Button className="form-buttons" onClick={e => this.pushNewOption(e)}>Add an option?</Button>
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
            <ul>
                <li> <input onChange={e => this.change(e, "optionName")} onBlur={update} ref="optionName" placeholder="Option Name" defaultValue={this.props.option.optionName} /> </li>
            </ul>
               
            <ul>
                {(this.props.option.rOs || []).map(location => <LocationForm location={location} label="Option"/>)}
                <Button className="form-buttons" onClick={e => this.pushNewrO(e)}>Add location as an option?</Button>
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
                <button className="form-buttons" onClick={e => this.save(e)} type="click">Save this Location</button>
                
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

// export class NewAdvent extends Component {
//     constructor(props){
//         super(props)
//         this.state = {}
//     }
    
//     submit(e) {
//         e.preventDefault()
//         post('api/advent',{
//             EventName: this.refs.EventName.value,
//             startDate: this.refs.startDate.value,
//             endDate: this.refs.endDate.value
//        }).then(x => {
//             if(!x.errors) window.location.hash = `/api/advent/${x.id}`

//             this.setState({ errors: x.errors })
//         }).catch(e => log(e))
//     }
//     render(){
//         var err
//         if(this.state.errors){
//             err = <ul className="compose-errors">
//                 {this.state.errors.map(e => <li>{e}</li>)}
//                 </ul>
//         }
//         return  <form className="new-advent-form" onSubmit={e => this.submit(e)}>
//                  {this.state.errors ? <p>There were errors with your event submission:</p> : null}
//                  {err}
//                 <div>
//                     <input ref="EventName" type="text" placeholder="Event Name" required/>
//                     <input ref="startDate" type="DateTime" placeholder="Start Date DD/MM/YR" required/>
//                     <input ref="endDate" type="DateTime" placeholder="End Date DD/MM/YR" required/>
//                 </div>
//                 <div>
//                     <Button type="submit">Save Event and Create Advance</Button>
//                 </div>
//         </form>
                
//     }
// }

// not sure if I've added the above correctly, but what I'd like is that they do a location search, and then have the option to add the results to that advance and/or section  


// <Button className="delete-buttons" onClick={e => this.popNewEmployee(e)}>Remove this employee</Button>
// <Button className="delete-buttons" onClick={e => this.popNewrO(e)}>Remove this location</Button> 
//      <Button className="form-buttons" onClick={e => this.popNewOption(e)}>Remove option?</Button>
//       <Button className="form-buttons" onClick={e => this.popNewAdvance(e)}>Remove Advance?</Button>
//             <Button className="form-buttons" onClick={e => this.popNewSection(e)}>Remove section?</Button>
// <Button className="form-buttons" onClick={e => this.popNewCategory(e)}>Remove category?</Button>