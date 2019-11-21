# Note Taker

## Description

This is a "simple" note taker app built with the Express node.js server module. It has a GUI that allows users to input notes (including note title and text), and save those notes. The saved notes are presented in a list view so that when one is clicked the note content is displayed. Each note also has a delete button that removes that note from the list.

### Functionality

Behind the scenes this app includes 2 JS files: an index.js that handles the events on the client side, and a server.js that sets up the Express server, and handles the various routing options. The index.js file includes functionality that tracks what the user clicks on, and sends the appropriate requests to the server. Requests include adding a note, viewing a note, and deleting a note. 

The server.js has routes that respond to the user requests. The response to the GET request displays notes, the response to the POST requests first reads all the notes currently stored, then pushes the new information to the json array, writes the new json array (filtering out any null entries if they exist), and finally returnes the new array to be displayed to the user. The DELETE request is handled by deleting the clicked note by process of id: each saved note gets a unique id (that isn't displayed to the user). The DELETE request from the GUI tells the API which unique note id is to be deleted. Once a DELETE request has been made, the server reads through the json file, delete the appropriate item (by unique id), writes the "new" array (filtering out the null left by the deletion), and returns the new array of notes to the user.

## Deployed link:

Since this is a full-stack app, it is deployed in Heroku. This is the link: https://fast-meadow-48969.herokuapp.com/



#### Modules and Libraries

This app using the following external libraries and modules: Jquery, Bootstrap, Express. It also uses the fs and path built in node modules.
