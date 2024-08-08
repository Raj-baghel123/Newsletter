const express =  require("express");
const bodyParser =  require("body-parser");
const request =  require("request");
require('dotenv').config();


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
        res.sendFile(__dirname+"/signup.html");
});

app.post('/', (req, res)=>{
        var firstName = req.body.fName;
        var lastName = req.body.lName;
        var email = req.body.email;
       
            var data = {
                members : [{
                    email_address : email   ,
                    status : "subscribed",
                    merge_field : {
                        FNAME : firstName,
                        LNAME : lastName
                    }
                }]
            }

            var jsonData =JSON.stringify(data);
            //console.log(jsonData);
        var options = {
            url : "https://us7.api.mailchimp.com/3.0/lists/cb3192dc39",
            method : "POST",
            headers : {
                    "Authorization" : "Rajbaghel 1813cdf95b89ed3f556d30e2cc945e7d-us7"                    
            },
            body : jsonData
        }

        request(options, (error, response, body)=>{
                    if(error){
                        res.sendFile(__dirname+"/failure.html");
                        console.log(error);
                    }
                    else if(response.statusCode!=200){
                        res.sendFile(__dirname+"/failure.html");
                        console.log(response.statusCode);
                    }
                    else{
                        res.sendFile(__dirname+"/success.html");
                    }
        });

        
});
const port_no = process.env.port || 3000;
app.listen(port_no,()=>{
    console.log("server started on port 3000");
});

//API KEY
//1813cdf95b89ed3f556d30e2cc945e7d-us7

//list id
//cb3192dc39