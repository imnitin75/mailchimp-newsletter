const express=require('express');
const request=require('request');
const bodyParser=require('body-parser');
const path=require('path');


const app=express();

//Bodyparser Middleware
app.use(bodyParser. urlencoded({extended:true}));
 
//STATIC FOLDERS FOR SERVING HTML FILES
app.use(express.static(path.join(__dirname,'public')));

//SIGNUP ROUTE
app.post('/signup',(req,res)=>{
    const {firstName, lastName, email}=req.body;
    if(!firstName || !lastName ||!email){
        res.redirect('/fail.html');
        return;
    }

    //CONSTRUCT REQ DATA
    const data={
        members:[
            {
                EMAIL: email,
                status:'subscribed',
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    //We cant send it like an object as a data actueally a string
    const postData=JSON.stringify(data);
   const options={
       url:'https://us5.api.mailchimp.com/3.0/lists/494e66ab82',
       method:'POST',
       headers:{
           Authorization:'auth 01c2df5e4d279e80d213c6fbcd78b563-us5'
       },
       body:postData
   };

request(options,(err,response,body)=>{
    if(err){
        res.redirect('./fail.html');
    }else{
        if(response.statusCode==200){
            res.redirect('./success.html');
        }else{
            res.redirect('/fail.html');
        }
    }

})
});

const PORT=process.env.PORT || 5000;
app.listen(PORT, console.log(`server running on ${PORT}`));






























