
//  var date = new Date('2014-8-20');
//         console.log((date.getMonth()+1) + '/' + date.getDate() + '/' +  date.getFullYear()); // test this!

// https://html5hive.org/reactjs-form-validation-tutorial/ 

// above and below is how to validate emails

// validateEmail: function (value) {
//     // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
//     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(value);
//   },

//   function validateEmail(email) 
// {
//     var re = /\S+@\S+\.\S+/;
//     return re.test(email);
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


