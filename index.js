const express = require("express");
const app = express();
const port = 8080;
let path = require("path");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname,"public")));
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
app.use(methodOverride('_method'))
app.use(express.json());
let Data = [
    {
        id:uuidv4(),
        username: "Raymon",
        content: "this world is CRAZZYYY",

    },
    {
        id:uuidv4(),
        username: "Abhay",
        content: "SKRRRRRR skibidi",

    },
]
app.get("/posts", (req, res) => {
    res.render("index.ejs", { Data })
}); 
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let {username , content}=req.body;
    let id =uuidv4();
    Data.push({ id, username,content});
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    post=Data.find((d)=>id === d.id);
    res.render("show.ejs",{post});
})
app.patch("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
    let post=Data.find((d)=>id === d.id);
    post.content = newContent;
    res.redirect("/posts");
})
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
    Data=Data.filter((d)=>id !== d.id);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req, res)=>{
    let{id}=req.params;
    let post=Data.find((d)=>id === d.id);
    res.render("edit.ejs",{post});
   
})

app.listen(port, () => {
    console.log("listening to the port");
})