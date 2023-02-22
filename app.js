const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require ("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.Email;
    const data = {
        members:[
            {
                email_address:  email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/cb0ee84f38";
    const options = {
        method : "POST",
        auth:"vishal05:e1248dc84daf339787de78c4f1ad1740-us12"
    }
    const request = https.request(url, options, function(response){
        
        if(response.statusCode === 200 ){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});


app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 8888, function(){
    console.log("Server started on 8888.");
});


//api key e1248dc84daf339787de78c4f1ad1740-us12
// unique id cb0ee84f38 list id