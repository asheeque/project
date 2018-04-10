var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user")

mongoose.connect("mongodb://localhost/onlinefoodapp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use( express.static( "public" ) );



// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


app.get("/",function(req,res){
    
   res.render("landingpage"); 
});

app.get("/home",function(req,res){
    
   res.render("home",{currentUser:req.user}); 
});

app.get("/ordernow",function(req,res){
 res.render("ordernow",{currentUser:req.user});


});

// show register form
app.get("/signup",function(req,res){
    
   res.render("signup"); 
});

app.get("/login",function(req,res){
    
   res.render("login"); 
});

app.get("/north",function(req,res){
    
   Northfood.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("north",{Northfood:allCampgrounds});
       }
    });
});

app.get("/south",function(req,res){
    
   res.render("south"); 
});
  
  app.get("/chinese",function(req,res){
    
   res.render("chinese"); 
});
  
  app.get("/shakes",function(req,res){
    
   res.render("shakes"); 
});
  
//handle sign up logic
app.post("/signup", function(req, res){
    var newUser = new User({username: req.body.username,email:req.body.email});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/home"); 
        });
    });
});


// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/ordernow",
        failureRedirect: "/signup"
    }), function(req, res){
});

app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/home");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/home");
}

//FoodSchema

var northFoodSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String

});

var southFoodSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String
   
});


var chineseFoodSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String
});


var shakesFoodSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String
});


var Northfood = mongoose.model("Northfood", northFoodSchema );
var Southfood = mongoose.model("Southfood", southFoodSchema );
var Chinesefood = mongoose.model("Chinesefood", chineseFoodSchema );
var Shakesfood = mongoose.model("Shakesfood", shakesFoodSchema );

 /* var array=[ 
 
 {
 name:"butter chicken",
  price:"80rs",
  image: "http://www.archanaskitchen.com//images/archanaskitchen/Indian_Breads/Easy_Aloo_Paratha_Recipe_North_Indian_Punjabi_Style-1.jpg"
},]
 {
 name:"shahi panner",
  price:"40rs",
  image: "http://www.archanaskitchen.com//images/archanaskitchen/Indian_Breads/Easy_Aloo_Paratha_Recipe_North_Indian_Punjabi_Style-1.jpg"
},
 {
 name:"kadai paneer",
  price:"40rs",
  image: "http://www.archanaskitchen.com//images/archanaskitchen/Indian_Breads/Easy_Aloo_Paratha_Recipe_North_Indian_Punjabi_Style-1.jpg"
},
 {
 name:"butter naan",
  price:"40rs",
  image: "http://www.archanaskitchen.com//images/archanaskitchen/Indian_Breads/Easy_Aloo_Paratha_Recipe_North_Indian_Punjabi_Style-1.jpg"
},
 {
 name:"aloo matar",
  price:"40rs",
  image: "http://www.archanaskitchen.com//images/archanaskitchen/Indian_Breads/Easy_Aloo_Paratha_Recipe_North_Indian_Punjabi_Style-1.jpg"
},*/
Northfood.create({
 name:"aloo naan",
  price:"20rs",
  image: "http://www.archanaskitchen.com/images/archanaskitchen/1-Author/roshni/spicy-aloo-naan-recipe-new.jpg"
},
 

function(err, campground){
     if(err){
           console.log(err);
      } else {
           console.log("NEWLY CREATED CAMPGROUND: ");
           console.log(campground);
       }
     });



app.listen(8080,function(){
    
    console.log("Server has started");
})