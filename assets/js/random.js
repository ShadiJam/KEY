
 var date = new Date('2014-8-20');
        console.log((date.getMonth()+1) + '/' + date.getDate() + '/' +  date.getFullYear()); // test this!

https://html5hive.org/reactjs-form-validation-tutorial/ 

above and below is how to validate emails

validateEmail: function (value) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  },

// <div>
//     <li> <FormGroup onChange={e => this.change(e, "EmployeeId")} ref="EmployeeId" controlId="formControlsSelect">
//                        <ControlLabel>Assign Advance</ControlLabel>
//                          <FormControl componentClass="select" placeholder="select">
//                              <option value="select">choose Employee</option>
//                              {this.props.employees.map(e => <option value={e.id}>{e.fName}{e.lName}</option>)}
//                          </FormControl>
//                      </FormGroup>
//                  </li> 
//                 <li> 
//                     <FormGroup onChange={e => this.change(e, "isComplete")} ref="isComplete" controlId="formControlsSelect">
//                         <ControlLabel>Advance Complete?</ControlLabel>
//                         <FormControl componentClass="select" placeholder="select">
//                             <option value="select">Select</option>
//                             <option value="other">Yes</option>
//                             <option value="other">No</option>
//                         </FormControl>
//                     </FormGroup>
//                 </li>
//             </div>

    


// var DatePicker = require("react-bootstrap-date-picker");
 
// var App = React.createClass({
//   getInitialState: function(){
//     var value = new Date().toISOString();
//     return {
//       value: value

// class Datepicker extends Component {
//     constructor(props){
//         super(props)
//         this.state = { 
//             value: new Date().toISOString() }
//     }
//     componenetDidMount(){
//         get('/api/advent'+this.state.id).then(x => {
//             this.setState({ item: x })
//         })
//     }
//   handleChange(value, formattedValue) {
//     this.setState({
//       value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
//       formattedValue: formattedValue // Formatted String, ex: "11/19/2016" 
//     });
//   }
//   componentDidUpdate(){
//     // Access ISO String and formatted values from the DOM. 
//     var hiddenInputElement = document.getElementById("example-datepicker");
//     console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z" 
//     console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016" 
//   }
//   render(){
//     return <FormGroup>
//       <ControlLabel>Label</ControlLabel>
//       <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} />
//       <HelpBlock>Help</HelpBlock>
//     </FormGroup>;
//   }
// } 

// export class AdventOverview extends Component {
//     constructor(props){
//         super(props)
//         this.state = { 
//             id: props.params.id,
//             items: []
//          }
//     }
//     componentDidMount(){
//         get('api/advent/'+this.state.id).then(items => {
//                 this.setState({items: [...advances, models.advanceModel()]})
//             }).catch(e => log(e))
//         }
//     pushNewEmployee(e){
//         e.preventDefault()
//         let {employees} = this.state
//         this.setState({ employees: [...employees, models.employeeModel()]})
//         update()
        
//     }
//     pushNewAdvance(e){
//         e.preventDefault()
//         let {advances} = this.state
//         this.setState({ advances: [...advances, models.advanceModel()]})
//         update()
//     }    
//     render(){
//         console.log(this.state)
//         return <div className="advent-overview">
//                     <div className="grid grid-3-600">
//                     {this.state.items.map}
//                     </div>

//             <ul className="input-fields">
//                 {(this.state.employees || []).map(e => <EmployeeForm employee={e}/>)}
//                 <Button className="form-buttons" onClick={e => this.pushNewEmployee(e)}>Add employees?</Button>
//             </ul>
//             <ul className="input-fields">
//                 {(this.state.advances || []).map(e => <AdvanceForm advance={e} employees={this.state.employees} />)}
//                 <Button className="form-buttons" onClick={e => this.pushNewAdvance(e)}>Create an advance?</Button>
//             </ul>
//             </div>
//     }
// }


//  <li> <FormGroup onChange={e => this.change(e, "EmployeeId")} ref="EmployeeId" controlId="formControlsSelect">
//                         <ControlLabel>Assign Advance</ControlLabel>
//                         <FormControl componentClass="select" placeholder="select">
//                             <option value="select">choose Employee</option>
//                             {this.props.employees.map(e => <option value={e.id}>{e.fName}{e.lName}</option>)}
//                         </FormControl>
//                     </FormGroup>
//                 </li> 
//                 <li> 
//                     <FormGroup onChange={e => this.change(e, "isComplete")} ref="isComplete" controlId="formControlsSelect">
//                         <ControlLabel>Advance Complete?</ControlLabel>
//                         <FormControl componentClass="select" placeholder="select">
//                             <option value="select">Select</option>
//                             <option value="other">Yes</option>
//                             <option value="other">No</option>
//                         </FormControl>
//                     </FormGroup>
//                 </li>
// add this in once rendered properly to advent overview.

//     render(){
//         {this.state.isLoggedIn ? ( <Route path="/Login"/> ) : ( <Route path="#/"/>)}


// export class EmployeeLoggedIn extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             IdentityUser: null
//         }
//     }
//     componentWillMount() {
//         post('api/account'+this.state.id).then(IdentityUser => {
//             this.setState({IdentityUser})
//         }).catch(e => window.location.hash = '#/')
//     }
//     render(){
//         if(!this.state.IdentityUser) return <Login />
//         return <EmployeeView />

// <Button className="delete-buttons" onClick={e => this.popNewEmployee(e)}>Remove this employee</Button>
// <Button className="delete-buttons" onClick={e => this.popNewrO(e)}>Remove this location</Button> 
//      <Button className="form-buttons" onClick={e => this.popNewOption(e)}>Remove option?</Button>
//       <Button className="form-buttons" onClick={e => this.popNewAdvance(e)}>Remove Advance?</Button>
//             <Button className="form-buttons" onClick={e => this.popNewSection(e)}>Remove section?</Button>
// <Button className="form-buttons" onClick={e => this.popNewCategory(e)}>Remove category?</Button>

// export class ParentComponent extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             date: "1990-06-05",
//             format: "YYYY-MM-DD",
//             inputFormat: "DD/MM/YYYY",
//             mode: "date"
//     }
//   }

//   handleChange(newDate){
//     log("newDate", newDate);
//     return this.setState({date: newDate});
//   }

//   render() {
//     const {date, format, mode, inputFormat} = this.state;
//     return <DateTimeField
//       dateTime={date}
//       format={format}
//       viewMode={mode}
//       inputFormat={inputFormat}
//       onChange={this.handleChange}/>
//   }
// }

//    <ul>
//     {(this.props.option.eventlocation || []).map(eventLocations => <LocationForm eventlocation={eventLocations} label="Option"/>)}
//     <button className="form-buttons" onClick={e => this.pushNewrO(e)}>New Location As Option</button>
//    </ul>