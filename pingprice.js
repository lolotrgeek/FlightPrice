
//var url = 'https://www.hipmunk.com/flights#f=STL;t=SJD;d=2017-09-17;r=2017-09-24;fl=ac734c78752aae3720e7beebab078224,896473b09d839e634f09a24ff8976dba;p=2;group=2';

var phantom = require('phantom');

phantom.create(function (ph) {
  ph.createPage(function (page) {
    var url = "http://www.bdtong.co.kr/index.php?c_category=C02";
    page.open(url, function() {
      page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
        page.evaluate(function() {
          $('.listMain > li').each(function () {
            console.log($(this).find('a').attr('href'));
          });
        }, function(){
          ph.exit()
        });
      });
    });
  });
});