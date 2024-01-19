Prerequisite
-Node.js and npm
-npm install -g typescript

Steps to run the server
-npm i
-tsc
-node dist/server.js

Postman:
-get all notes- HttpGet - http://localhost:4001/notes
-get note by id - HttpGet - http://localhost:4001/notes/:id - http://localhost:4001/notes/1
-add note - HttpPost - http://localhost:4001/notes
  Payload:
  {
    "title": "test title",
    "body": "test body"
  }
-update note - HttpPut - http://localhost:4001/notes/:id - http://localhost:4001/notes/2
  Payload:
  {
    "title": "test title updated",
    "body": "test body"
  }
-delete note - HttpDelete - http://localhost:4001/notes/1
