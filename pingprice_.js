
var sleep = require('sleep');
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  //All the web scraping magic will happen here
    var url = 'https://www.hipmunk.com/flights#f=STL;t=SJD;d=2017-09-17;r=2017-09-24;fl=ac734c78752aae3720e7beebab078224,896473b09d839e634f09a24ff8976dba;p=2;group=2';

        request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var title, flight, price;
            var json = { title : "", price : ""};

            $('.header').filter(function(){

           // Let's store the data we filter into a variable so we can easily see what's going on.

                var data = $(this);

           // In examining the DOM we notice that the title rests within the first child element of the header tag. 
           // Utilizing jQuery we can easily navigate and get the text by writing the following code:

                title = data.children().first().text();

                console.log(title);

           // Once we have our title, we'll store it to the our json object.

                json.title = title;

            })
            $('.price-wrapper').filter(function(){
                var data = $(this);

                // The .price-wrapper class was exactly where we wanted it to be.
                // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

                price = data.text();

                console.log(price);

                json.price = price;
            })
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

            console.log('File successfully written! - Check your project directory for the output.json file');

        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!')

    })
})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;