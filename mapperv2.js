var SitemapGenerator = require('sitemap-generator');
var fs = require('fs');

var generator = new SitemapGenerator('http://sunextools.com/product', {
  restrictToBasepath: true
});

// write to csv when finished
// TO ADD - CSV stream write
generator.on('done', function (sitemaps) {
  console.log("****DONE****"); // => array of generated sitemaps
  fs.writeFile('justproducts2.csv', sitemaps, 'utf8', function(err) {
    if(err) {
      console.log("Some error ocurred", err);
    } else {
      console.log("csv file written");
    }
  })
});

// show any timeout errors, record record to csv
generator.on('clienterror', function(queueError, errorData) {
  var allErr = `${queueError} | ${errorData}`;
  console.log(allErr);
  fs.writeFile('product_errors.csv', allErr, 'utf8', function(err) {
    if(err) {
      console.log('error writing clienterror file', err)
    }
  });
});

// show skipped URLs
generator.on('ignore', function(url) {
  console.log("IGNORED", url);
});

// print http status + url
generator.on('fetch', function (status, url) {
  console.log(status, url);
});

generator.start();
