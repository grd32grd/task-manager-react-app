import { type } from "os";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoDBUsers = require('connect-mongodb-session')(session);
const mc = require('mongodb').MongoClient;
const app = express();
const port = 3001;

let mongoStore = new MongoDBUsers({
    uri: 'mongodb://localhost:27017/taskmanager-react',
    collection: 'sessions'
});
mongoStore.on('error', (error: any) => {console.log(error)});

app.use(session({ 
    secret: 'some secret key here',
    resave: true,
    saveUninitialized: true,
    store: mongoStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // Equal to a week
    }
}));

app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mc.connect("mongodb://localhost:27017", function(err : any, client : any) {
	if (err) {
		console.log("Error in connecting to database.");
		console.log(err);
		return;
	}

    let users = client.db('taskmanager-react').collection('users');
    let tasks = client.db('taskmanager-react').collection('tasks');
    let glossaryentries = client.db('taskmanager-react').collection('glossaryentries');
    let sessions = client.db('taskmanager-react').collection('sessions');

    //Route for all tasks
    app.get('/tasks', (req: any, res: any) => {
        tasks.find().toArray(function(err: any, docs: any){
            if (err) throw err;
            res.send({data: docs});  
        });  
    });
    
    //Route for queried tasks search
    app.param('tasksearch', function(req: any, res: any, next: any, value: any) {
        let searchedTasks: any = [];
        tasks.find().toArray(function(err: any, docs: any){
            if (err) throw err;

            docs.forEach((t: any) => {
                if (t.name.toUpperCase().includes(value.toUpperCase())) {
                    searchedTasks.push(t)
                }
            });
            res.searchedTasks = searchedTasks;
            next();
        });
    });
    app.get('/tasks/:tasksearch', (req: any, res: any) => {
        res.send({data: res.searchedTasks});  
    });

    //Route for all glossary entries
    app.get('/glossary', (req: any, res: any) => {
        glossaryentries.find().toArray(function(err: any, docs: any){
            if (err) throw err;
            res.send({data: docs});  
        });  
    });

    //Route for queried glossary entry search
    app.param('glossarysearch', function(req: any, res: any, next: any, value: any) {
        let searchedGlossaryEntries: any = [];
        glossaryentries.find().toArray(function(err: any, docs: any){
            if (err) throw err;

            docs.forEach((g: any) => {
                if (g.name.toUpperCase().includes(value.toUpperCase())) {
                    searchedGlossaryEntries.push(g)
                }
            });
            res.searchedGlossaryEntries = searchedGlossaryEntries;
            next();
        });
    });
    app.get('/glossary/:glossarysearch', (req: any, res: any) => {
        res.send({data: res.searchedGlossaryEntries});  
    });

    app.put('register', (req: any, res: any) => {
        console.log(req.body)
        res.send("Registered!")
    })

    
    
    
});




app.listen(port, () => console.log(`Task manager listening on port ${port}!`))