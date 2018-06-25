let express=require("express");
let app=express();
let bodyParser=require("body-parser");
let mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
//SSCHEMA Setup
let campgroundSchema=new mongoose.Schema({
   name:String,
   image:String,
   description:String
});
let Campground=mongoose.model("Campground",campgroundSchema);
// Campground.create(
//     {
//      name:"Anuj",
//      image:"https://www.desicomments.com/dc3/17/425458/4254581.jpg",
//      description:"This is my new portal"
//     },function(err,campground){
//         if(err)
//         {
//             console.log(err);
//         }else
//         {
//             console.log("Newly created campground");
//             console.log(campground);
//         }
//     });



//   var campgrounds=[
//         {name:"Anuj",image:"https://www.desicomments.com/dc3/17/425458/4254581.jpg"},
//         {name:"Sagar",image:"https://www.desicomments.com/dc3/16/419864/4198641.jpg"},
//         {name:"Anubhav",image:"https://www.desicomments.com/dc3/16/419941/4199411.jpg"},
//         {name:"Viru",image:"https://www.desicomments.com/dc3/16/415022/4150221.jpg"}
//     ];

app.get("/",function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds",function(req,res) {
  Campground.find({},function(err,allCampgrounds){
     if(err)
     {
         console.log("Oops!! Error "+err);
     }else{
         res.render("index",{campgrounds:allCampgrounds});
     }
  });
    //res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    let name=req.body.name;
    let image=req.body.image;
    let desc=req.body.description;
    let newCampground={name:name,image:image,description:desc};
   // campgrounds.push(newCampground);
    //Creating campground which will create from DB
    Campground.create(newCampground,function(err,newlyCreated){
        if(err)
        {
           console.log("Oops!!! Error "+err); 
        }else{
            res.redirect("/campgrounds");
        }
    })
    
});

app.get("/campgrounds/new",function(req, res) {
    res.render("new");
    
});

app.get("/campgrounds/:id",function(req, res) {
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err)
        {
            console.log("Oops!!! Error "+err);
        }else
        {
            res.render("show",{campground:foundCampground});
        }
    });
   });


app.listen(process.env.PORT,function(req,res){
    
   console.log("YelpCamp Server Started Successfully"); 
});