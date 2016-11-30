export const LoginForm = () => 
    <form className="navbar-form navbar-right">
        <div className="form-group">
            <input type="text" placeholder="Email" className="form-control" />
        </div>
        <div className="form-group">
            <input type="password" placeholder="Password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">Sign in</button>
    </form>

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

export const Employee = (employee) =>
    <div className="employee">
        <a href={`#/status/${employee.id}`}>
        <h1>{this.props.employee.FName} {this.props.employee.LName}</h1>
        <p>{this.props.employee.Department}</p>
        <p>{this.props.employee.Phone}</p>
        <p>{this.props.employee.Email}</p>
        </a>
    </div>

export const Advent = (advent) =>
    <div className="advent">
    <a href={`#/status/${advent.id}`}>
        <h1>{this.props.advent.name}</h1>
    </a>
    </div>

export const Advance = (advance) =>
    <div className="advance">
        <a href={`#/status/${advance.id}`}>
            <h1>{this.props.advance.AdvanceName}</h1>
            <p>{this.props.advance.Assigned}</p>
            <p>{this.props.advance.dueDate}</p>
            <p>{this.props.advance.Section}</p>
        </a>
    </div>

export const Section = (section) =>
    <div className="section">
        <a href={`#/status/${section.id}`}>
            <h1>{this.props.section.SectionName}</h1>
            <p>{this.props.section.SectionDescription}</p>
            <p>{this.props.section.Cost}</p>
            <p>{this.props.section.Category}</p>
        </a>
    </div>

export const Category = (category) =>
    <div className="category">
        <a href={`#/status/${category.id}`}>
            <h1>{this.props.category.CategoryName}</h1>
            <p>{this.props.category.Options}</p>
        </a>
    </div>

export const Option = (option) =>
    <div className="option">
        <a href={`#/status/${option.id}`}>
            <h1>{this.props.option.OptionName}</h1>
        </a>
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
        <form className="advent-form" onSubmit={e => this.submit(e)}>
            <div>
                <textarea ref="name" type="text" placeholder="Event Name" required></textarea>
                <textarea ref="startDate" type="DateTime" placeholder="Start Date DD/MM/YR" required></textarea>
                <textarea ref="endDate" type="DateTime" placeholder="End Date DD/MM/YR" required></textarea>
            </div>
            <div>
                <a href="/status/advent.Id">
                    <button type="submit">Submit Event</button>
                </a>
            </div>
        </form>


       