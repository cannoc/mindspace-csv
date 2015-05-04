# CSV Importer

## Requirements

1. The application should provide an interface to upload the CSV file
2. The uploaded file should be parsed into a database (MySQL, Mongo, or Postgres – your choice)
3. After upload, the application should render the new list of albums sorted by Release Year
4. Create a README file with a section on next steps in your github repo. What features would you add?

## Demo Application

http://cannon.ws/csv

## Setup

1. Clone the git repo
2. Set up Mongo with a collection and give a user permissions to readWrite
3. Modify models/db-example.js to use your mongo connection string and save as db.js
4. run: npm install
5. set port env var to your desired port number or modify bin/www with port number
6. run: node bin/www

## Next Steps
1. Attempt to match column names with expected columns
2. Add more verification to uploaded files depending on customer's needs
3. Add paging, sorting (client-side) and search functionality
4. AJAX the whole thing and add loading spinners/bars to show status of upload
5. Allow edit on each record, possibly add multi-select to modify/delete multiple records