import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    try{
        const message = req.body.content;
        const action = req.body.action;
        const response = await axios.get(`https://www.purgomalum.com/service/json?text=${message}`);
        let output = "";
        if(action === "check"){
            if(response.data.result.includes('*')){
                output = "profanity detected :(";
            } else {
                output = "everything looks clean :)";
            }
        }
        if(action === "blank"){
            output = response.data.result;
        }
        res.render("index.ejs", {
            message : output
        })
    } catch (error) {
        res.render("index.ejs", {
            message : "if you're seeing this, either you didn't enter an input something went wrong :O"
        });
    }
    
})

app.listen(port, () => {
    console.log(`listening at port ${port}`);
});

