Welcome to File Store
==================================================

This website can allow users to upload, retrieve, and manage files in the AWS S3.

What's Here
-----------

This repository includes:

* README.md - this file
* app.js - this file contains the code for the server
* appspec.yml - this file is used by AWS CodeDeploy when deploying the web
  application to EC2
* package.json - this file contains various metadata relevant to Node.js
  application such as dependencies
* passport-config.js - this file is for passport.js settings
* db_connect.js - this file is used to make connection with rds
* setup_db.js - this file is for setup database run node setup_db.js
* public/ - this directory contains static web assets used by application
* scripts/ - this directory contains scripts used by AWS CodeDeploy when
  installing and deploying application on the Amazon EC2 instance
* tests/ - this directory contains unit tests for application
* template.yml - this file contains the description of AWS resources used by AWS
  CloudFormation to deploy infrastructure
* template-configuration.json - this file contains the project ARN with placeholders used for tagging resources with the project ID

Usage
---------------

1. Account Setup
	1. If you don't have an account, click on the "register" tab and input your "first name", "last name", "email", "password" to register.
	2. Sign in with your email and password
2. File management
	1. File upload. Click on "select" button and select the file you want to upload. Enter any "descriptions" you would like to input. Click submit to upload file.
	2. File download. Find the file you like in the list and click "download" button to download file.
	3. File update. Find the file you want to update in the list and click "update" button to upload a new file.
	3. File delete. Find the file you want to delete in the list and click "delete" button to delete the file.
3. Admin management
	1. Admin user can view and manage all the files for every user. Select the desired user and follow the steps in "File management".
