var Graph = require('./models/graph');

function getGraph(res) {
    Graph.find(function (err, graph) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(graph); // return all todos in JSON format
    });
};
// function gethash(v) {
//     var crypto = require('crypto');
//     return crypto.createHash('md5').update(v).digest("hex");
// }
function duplicate(req,res,next) {
    Graph.find({
        target: req.body.target
    }, function (err, graph) {
        console.log(graph)
        if (err) {
            res.status(500).send(err); return;
        } else if (graph.length>0) {
            res.status(302).send('duplicate'); return;     // This runs.
        } else {
            next();
        }   
    });
}
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/graph', function (req, res) {
        // use mongoose to get all todos in the database
        getGraph(res);
    });
    app.post('/api/targetcheck',function(req,res){
        //console.log(gethash(req.params.password))
        Graph.find({
            target: req.body.target,
        }, function (err, graph) {
            if (err)
                res.send(err);
            if(target.length>0) res.json(graph);
            else res.send("incorrect");
        });
    });
    // create todo and send back all todos after creation
    //app.use(duplicate);
    app.post('/api/graphadd',duplicate, function (req, res) {
        // create a todo, information comes from AJAX request from Angular
        //-----save----------
        Graph.create({
            //email: req.body.email,
            //password: req.body.password
            target: req.body.target,
            Xaxis: req.body.xaxis,
            Yaxis: req.body.yaxis,
            Color: req.body.color
            // password: gethash(req.body.password)
        }, function (err, graph) {
            if (err){
                console.log(err);
                res.status(500).json(err);
            }else{
                // get and return all the todos after you create another
                //res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(graph);
            }
        });
       
    });
    // delete a todo
    // app.delete('/api/user/:user_id', function (req, res) {

    //     User.remove({
    //         _id: req.params.user_id
    //     }, function (err, user) {
    //         if (err)
    //             res.send(err);

    //         getUsers(res);
    //     });
    // });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
