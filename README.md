# KEY


## Overview

An event production web application uniting the advance process with business management.

Most large scale events require internal staff to collect multitudes of information and manually track each detail.  __KEY__ allows the user to curate the internal advance procedure specifically to their requirements.

By allowing the user to build an advance form that is made of entities inside entities, users can build multiple advances for one event or more. Each advance is made up of as many sections as the user requires. Each section can have one or multiple categories. Finally, each category can have multiple options.

Each event also has an employee list. This will allows users to keep track of key team members, assign them advances inside the application, and track their progress based on the due date they've assigned.

Although the concept of __KEY__ has been conceived over years of experience, during the production of several major events, the application itself is just three young weeks into it's inception and will continue to be developed over the coming months. 

### Usage
The dynamic structure of __KEY__ is what allows the user to make it their own. Users can create customized forms that will collect the data they need. Once the advances are completed, the program collects the information using PostgreSQL database systems. 

Users will have the choice of viewing and sorting their data in [DBGlass](http://dbglass.web-pal.com/) or right inside the application. 

If a particular form is resubmitted due to changes, the information in the database and in the application is automatically updated. 

Gone are the days of collecting catering, credential, or hotel room requests and requirements, using excel forms or hours of data entry. 

### Utilities
The application models and controllers are all within the ASP.Net MVC framework while the UI is completely rendered using ReactJS.NET. 

### Get Started

Simply click on the link, register, and begin building your application. Any questions or issues can be addressed right here in GitHub. 

If you want to contribute, more detailed instructions are below under How To Use.

##LICENSE

The MIT License (MIT)

Copyright (c) 2016 Shadi Jam

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# .NET Core Boilerplate

# How to use

1. clone to your machine
- `npm install -g now yarn`
- `yarn && dotnet restore` -or- `npm run setup`
- if using Entity Framework / a database:

    - modify Models/*.cs to create your csharp Models for Entity Framework Core; add any seeded data to the `Seeder` class
    - `dotnet ef migrations add init` - create the initial migrations for the database seeding
    - `dotnet ef database update` - write the migrations to the database
    - if at any point you change a model, rerun the preceding steps

- `npm start` - runs and watch the files for changes. Underneath, this runs `dotnet watch run`, `npm run css:watch`, `npm run js:watch` for CSS and JS build tools.
- if at any point you install a package through NuGet or npm, or change the project.json or package.json files - hit Ctrl+C and run `npm run setup` again.
- open `http://localhost:5000` to view local server

# Migrations

1. **When using EntityFramework.InMemory**

    - You won't need to consider the creation of migration files, so we'll just develop and live happily ever after.

2. **When using Sqlite or PostgreSQL**

    - You'll need to develop your model classes, have them compile, and then generate a migration for them. Your migration files will be added to a new Migrations folder. Don't forget to `git add .` since we need to commit these Migrations to source control.
    - For either Sqlite or Postgres, you will need to create the empty database first (i.e. either on your machine or on Heroku), then create the Migration files from the `dotnet` CLI.
    - Create the database:

        - For Sqlite, create the `<project_folder>/bin/Debug/netcoreapp1.0/app.db` file with http://sqlitebrowser.org/
        - For Postgres, use the `heroku` CLI (https://devcenter.heroku.com/articles/heroku-command-line) to create an database:

            ```sh
            # from project folder
            heroku create
            heroku addons:create heroku-postgresql:hobby-dev
            heroku config
            #--> parse out the pieces from the connection string: "user:password@host:port/database"
            #--> you can use http://dbglass.web-pal.com/ to login and view the database tables
            ```
    
    - When you run `npm start` / `dotnet watch run` your app will apply the migrations to its connected database.
    - Want to create 2 databases on Heroku?

        ```sh
        # get me dev db
        heroku create
        heroku addons:create heroku-postgresql:hobby-dev
        heroku config
        # store the first connection string
        git remote remove heroku
        # get me prod db
        heroku create
        heroku addons:create heroku-postgresql:hobby-dev
        heroku config
        # store the 2nd connection string
        ```

# To deploy

To https://now.sh:

1. **The slow way**
    - from project folder: `now --docker`
    - open the url provided (`dotnetcore-boilerplate-XXXXXXXXXXXX.now.sh`); when the installation is done the browser will be redirected to your new server
    - to setup a custom URL: `now alias dotnetcore-boilerplate-XXXXXXXXXXXX.now.sh YOURAPPNAME.now.sh`
2. **The fast way**
    - from project folder: `npm run deploy`

To https://heroku.com

- install the heroku CLI (https://devcenter.heroku.com/articles/heroku-command-line)
- (update and commit all your local git files)
- `heroku create --buildpack http://github.com/noliar/dotnet-buildpack.git`
- `git push heroku master`
- `heroku open`

# Support

1. Please submit issues on GitHub with proper taggings / labels.
2. Reach out to [@matthiasak](https://twitter.com/matthiasak).
