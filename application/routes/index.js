module.exports = function(app){

    app.get('/', function(req, res, next) {
        console.log("#####################");
        res.render('index');
    });


    app.get('/getChargeByListing', function(request, response){
        const {lid} = request.query;
        response.send("Listing ID: "+ lid +"  Charges: $100");
    })
}