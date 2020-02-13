if(process.env.NODE_ENV === "production")
{
    //power mongo server
    module.exports = 
    {
        mongoURI: "mongodb+srv://Matt:<dogsandfrogs619>@cluster0-pgj1a.mongodb.net/test?retryWrites=true&w=majority"
    }
}
else
{
    module.exports = 
    {
        mongoURI: "mongodb://localhost:27017/gamelibrary"
    }
}







