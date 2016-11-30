// export const LoginForm = () => 
//     <form className="navbar-form navbar-right">
//         <div className="form-group">
//             <input type="text" placeholder="Email" className="form-control" />
//         </div>
//         <div className="form-group">
//             <input type="password" placeholder="Password" className="form-control" />
//         </div>
//         <button type="submit" className="btn btn-success">Sign in</button>
//     </form>

export const Nav = ({includeLogin}) => 
    <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
            {includeLogin ? <LoginForm /> : null}
        </div>
        </div>
    </nav>

export const Jumbotron = () => 
    <div className="jumbotron">
        <div className="container">
            <h1>Hello, world!</h1>
            <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
            <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
        </div>
    </div>

export const HomeContents = () =>
    <div className="container">
        <div className="row">
            <div className="col-md-4">
                <h2>Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </div>
            
            <div className="col-md-4">
                <h2>Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </div>

            <div className="col-md-4">
                <h2>Heading</h2>
                <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </div>
        </div>

        <hr />

        <footer>
        <p>&copy; 2016 Company, Inc.</p>
        </footer>
    </div>


export const Error = () => <div>Page Not Found</div>

export const LoginForm = () =>
        <div>
            <p>Please Log In</p>   
            <div>
                <input name="theEmail" ref="Email" type="email" placeholder="user@email.com" required/>
                <input name="thePassword" ref="Password" type="password" placeholder="Your Password"/>
            </div>
                <a className="login-button" href="#/">
                    <button type="submit">Log In</button>
                </a>
        </div>

export const NewRegisterForm = () =>
    <div>
        <p> Or Create an Account </p>
        <div>
            <input name="theEmail" ref="Email" type="email" placeholder="user@email.com" required/>
            <input name="thePassword" ref="Password" type="password" placeholder="Your Password"/>
        </div>
            <a className="register-button" href="/newEmployee">
                <button type="submit">Register</button>
            </a>
    </div>
export const Employee = (employee) =>
    <div className="employee">
        <a href={`#/status/${employee.id}`}>
        <h1>{employee.FName} {employee.LName}</h1>
        <p>{employee.Department}</p>
        <p>{employee.Phone}</p>
        <p>{employee.Email}</p>
        </a>
    </div>

export const Advent = (advent) =>
    <div className="advent">
    <a href={`#/status/${advent.id}`}>
        <h1>{this.props.advent.name}</h1>
        <p>{this.props.advent.startDate}</p>
        <p>{this.props.advent.endDate}</p>
        <p>{this.props.advent.RootObject}</p>
    </a>
    </div>

export const Advance = (advance) =>
    <div className="advance">
        <a href={`#/status/${Advance.id}`}>
            <h1>{this.props.advance.AdvanceName}</h1>
            <p>{this.props.advance.Assigned}</p>
            <p>{this.props.advance.dueDate}</p>
            <p>{this.props.advance.Section}</p>
        </a>
    </div>

export const Section = (section) =>
    <div className="section">
        <h1>{this.props.section.SectionName}</h1>
        <p>{this.props.section.SectionDescription}</p>
        <p>{this.props.section.RootObject}</p>
        <p>{this.props.section.Cost}</p>
        <p>{this.props.section.Category}</p>
    </div>

export const Category = (category) =>
    <div className="category">
            <h1>{this.props.category.CategoryName}</h1>
            <p>{this.props.category.Options}</p>
    </div>

export const Option = (option) =>
    <div className="option">
        <h1>{this.props.option.OptionName}</h1>
    </div>

export const RootObject = (rootObject) =>
        <div className="rootObject">
            <p>{this.props.rootObject.Results}</p>
        </div>

export const Result = (result) =>
        <div>
            <p>{this.props.result.AdventId}</p>
            <p>{this.props.result.formatted_address}</p>
            <p>{this.props.result.Geometry}</p>
        </div>

export const Location = (location) =>
    <div>
        <p>{this.props.location.latitude}</p>
        <p>{this.props.location.longitude}</p>
    </div>

export const Geometry = (geometry) =>
    <div>
        <p>{this.props.geometry.Location}</p>
    </div>

export const NewAdventForm = () =>
        <div>
            <div>
                <input name="theName" ref="name" type="text" placeholder="Event Name" required/>
                <input name="theStartDate" ref="startDate" type="DateTime" placeholder="Start Date DD/MM/YR" required/>
                <input name="theEndDate" ref="endDate" type="DateTime" placeholder="End Date DD/MM/YR" required/>
            </div>
            <div>
                    <button type="submit">Submit Event</button>
            </div>
        </div>
    
export const NewAdvanceForm = () =>
    <div>
    <div className="advance-section-form">
        <div>
            <input name="theAdvanceName" ref="AdvanceName" type="text" placeholder="Advance Name - not required"/>
            <input name="thedueDate" ref="dueDate" type="DateTime" placeholder="Due Date DD/MM/YR - not required"/>
        </div>
        </div>  
            <hr/>
            <div>
                <button type="submit">Create</button>
            </div>
        </div>

export const NewEmployeeForm = () =>
    <div>
        <div>
            <input name="theFName" ref="FName" type="text" placeholder="First Name" required/>
            <input name="theLName" ref="LName" type="text" placeholder="Last Name" required/>
            <input name="theDepartment" ref="Department" type="text" placeholder="Department Name" required/>
            <input name="thePhone" ref="Phone" type="Phone" placeholder="Phone including area code" required/>
        </div>
        <div>
           <button type="submit">Add Employee</button>
        </div>
    </div>

export const NewSectionForm = () =>
    <div>
        <div>
            <input name="theSectionName" ref="SectionName" type="text" placeholder="Name your section" required/>
            <input name="theSectionDescription" ref="SectionDescription" type="text" placeholder="Add a short description about this section - not required"/>
            <input name="theCost" ref="Cost" type="int" placeholder="Include the cost of the items in this section if applicable - this info will not be displayed to your staff if you don't want it to be."/>
        </div>
            <div>
                <button type="submit">Add Section</button>
            </div>
    </div>

export const NewCategoryForm = () =>
    <div>
        <div>
            <input name="theCategoryName" ref="CategoryName" type="text" placeholder="Name your category" required/>
        </div>
            <div>
                <button type="submit">Add Category</button>
            </div>
    </div>
          

export const NewOptionForm = () =>
    <div>
        <div>
            <input name="theOptionName" ref="OptionName" type="text" placeholder="Name your first option" required/>
            <input name="theOptionName" ref="OptionName" type="text" placeholder="Include any additional options"/>
            <input name="theOptionName" ref="OptionName" type="text" placeholder="Include any additional options"/>
        </div>
            <div>
                <button type="submit">Add Option</button>
            </div>
    </div>
          
export const NewRootObjectForm = () =>
    <div>
        <div>
            <input name="theAddress" ref="address" type="text" placeholder="Add a location - enter a zipcode, location name, or address" required/>
        </div>
            <div>
                <button type="submit">Add Location</button>
            </div>
    </div>


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
       