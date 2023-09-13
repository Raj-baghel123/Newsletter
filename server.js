const express =  require("express");
const bodyParser =  require("body-parser");
const request =  require("request");

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
        var alldetails = firstName + " " + lastName + " " + email; 
            var data = {
                members : [{
                    email_address : email,
                    status : "subscribed",
                    merge_field : {
                        FNAME : firstName,
                        LNAME : lastName
                    }
                }]
            };

            var jsonData =JSON.stringify(data);
        var options = {
            url : "https://us7.api.mailchimp.com/3.0/lists/cb3192dc39",
            method : "POST",
            headers : {
                    "Authorization" : "Rajbaghel 1db7b512441212cf5bc5e813cab7a0c9-us7"
            },
            body : jsonData
        }

        request(options, (error, response, body)=>{
                    if(error){
                        res.sendFile(__dirname+"/failure.html");
                    }
                    else if(response.statusCode!=200){
                        res.sendFile(__dirname+"/failure.html");
                    }
                    else{
                        // res.sendFile(__dirname+"/success.html");
                        res.sendFile(__dirname+"/failure.html");
                    }
        });

        
});

app.listen(3000,()=>{
    console.log("server started on port 3000");
});

//API KEY
//1db7b512441212cf5bc5e813cab7a0c9-us7

//list id
//cb3192dc39