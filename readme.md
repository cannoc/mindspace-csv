# CSV Importer

Takes a csv file of the format (Artist, Album, Release Year, Rating), adds them to a Mongo database and lists them in order of Release Year (desc)

## Setup

1. Clone the git repo
2. Set up Mongo with a collection and give a user permissions to readWrite
3. Modify models/db-example.js to use your mongo connection string and save as db.js
4. run: npm install
5. set port env var to your desired port number or modify bin/www with port number
6. run: node bin/www

## Next Steps
1. Instead of assuming the format will be the same attempt to match column names to expected names
2. Depending on the users need and use cases, add more verification of valid csv data
3. Add paging, sorting (client-side) and search functionality
4. AJAX the whole thing and add loading spinners/bars to show status of upload
5. Allow edit/delete on each record, possibly add multi-select to modify/delete multiple records
6. Handle DB connection errors
7. Confirmation messages when deleting records