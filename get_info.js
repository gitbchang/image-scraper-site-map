// var axios = require('axios');
var request = require('sync-request');
var cheerio = require('cheerio');
var fs = require('fs');
var $ = jQuery = require('jquery');
var json2csv = require('json2csv');
var productPageUrls = require('./prod_url_array.js');

var targetUrl = 'http://sunextools.com/product/43pc-12-dr-sae-master-impact-socket-set';
// targetUrl = 'http://sunextools.com/product/19mm-v-groove-flex-head-combination-ratcheting-wrench/';

var testUrls = ['http://sunextools.com/product/22-ton-truck-axle-jack-w-air-return/',
'http://sunextools.com/product/7798-1-ton-transmission-jack-hd/',
'http://sunextools.com/product/full-drawer-professional-duty-service-cart/',
'http://sunextools.com/product/12-super-duty-min-impact-wrench-wgrip/',
'http://sunextools.com/product/1500-lb-hydraulic-wheel-dolly/',
'http://sunextools.com/product/20-ton-truck-ramps-pair/',
'http://sunextools.com/product/22-ton-jack-stands-pair/',
'http://sunextools.com/product/10-ton-medium-height-pin-type-jack-stands-pair/',
'http://sunextools.com/product/4-ton-bottle-jack/',
'http://sunextools.com/product/3569-38-dr-84-pc-master-hex-bit-impact-socket-set/',
'http://sunextools.com/product/large-locking-screwdriverpry-bar-holder-for-service-cart-red/',
'http://sunextools.com/product/3342-42pc-38-std-and-deep-length-master-impact-socket-set/',
'http://sunextools.com/product/2-ton-bottle-jack/']

// console.log(productPageUrls); getProductDetails(targetUrl);
// getProductDetailsSync(targetUrl);

var datetime = Date.now();
console.log(datetime);
var csvFile = `sunex_test_data_${datetime}.csv`;

var csvFields = ['ProductId', 'ProductName', 'Description', 'ImageUrl', 'ProductUrl'];
// append data to this array, eventually write array to csv file
var writeArray = []


scrapeData(productPageUrls);

function scrapeData(urlArray) {
  // GET DATA FROM URLS
  urlArray.forEach(function (url) {
    // console.log(url) getProductDetails(url);
    getProductDetailsSync(url);
  });
  // WRITE TO CSV
  var csvData = json2csv({data: writeArray, fields: csvFields});

  fs.writeFile(csvFile, csvData, function(err) {
  if (err) throw err;
  console.log('file saved');
});
  
}

function getProductDetailsSync(prodUrl) {
  console.log("========================================================================================");
  console.log("SCRAPING FROM:", prodUrl);
  console.log("========================================================================================");
  // append each object to the writeArray
  var writeObject = {};
  writeObject.ProductUrl = prodUrl;
  var res = request('GET', prodUrl);
  var siteHtml = res
    .body
    .toString();
  var $ = cheerio.load(siteHtml);

  var prodHeader;
  var prodNumber;
  var prodDescription;
  var prodImageUrl;

  prodHeader = $('.breadcrumb_last').text();
  console.log("prodHeader", prodHeader);
  writeObject.ProductName = prodHeader;

  var descriptionArray = [];
  $('.hill_product_description ul').each(function (index, elem) {
    descriptionArray[index] = $(this).text();
  });
  prodDescription = descriptionArray.join(' ');
  console.log('prodDescription', prodDescription);
  writeObject.Description = prodDescription;

  prodImageUrl = $('a')
    .filter('.woocommerce-main-image')
    .attr('href');
  console.log('image url', prodImageUrl);
  writeObject.ImageUrl = prodImageUrl;

  // MODEL NUMBER could not find a good way to target just model number, pulling
  // the h1 tag and the header without id. then stripping out the header to have
  // just the id
  var fullHeader = $('h1[itemprop=name]').text();
  stripHeader = ` - ${prodHeader}`;
  var prodId = fullHeader.replace(stripHeader, "");
  console.log('prodId', prodId);
  writeObject.ProductId = prodId;

  writeArray.push(writeObject);

  // returnObject.pNumber = prodNumber; returnObject.pHeader = prodHeader;
  // returnObject.pDescription = prodDescription; returnObject.pImageUrl =
  // prodImageUrl; return returnObject;

  

}




// ****************************************
// DO NOT USE THE ASYNC - WILL BREAK SERVER
// ****************************************
// Can use async if using a setInterval() or add an interval to ASYNC/AWAIT loop
/*

function getProductDetails(prodUrl) {
  var returnObject = {};
  axios
    .get(prodUrl)
    .then(response => {
      // load page html into cheerio
      var $ = cheerio.load(response.data);

      var prodHeader;
      var prodNumber;
      var prodDescription;
      var prodImageUrl;

      prodHeader = $('.breadcrumb_last').text();
      console.log("prodHeader", prodHeader);

      var descriptionArray = [];
      $('.hill_product_description ul').each(function (index, elem) {
        descriptionArray[index] = $(this).text();
      });

      prodDescription = descriptionArray.join(' ');
      console.log('prodDescription', prodDescription);

      prodImageUrl = $('a')
        .filter('.woocommerce-main-image')
        .attr('href');
      console.log('image url', prodImageUrl);

      // MODEL NUMBER could not find a good way to target just model number, pulling
      // the h1 tag and the header without id. then stripping out the header to have
      // just the id
      var fullHeader = $('h1[itemprop=name]').text();
      stripHeader = ` - ${prodHeader}`;
      var prodId = fullHeader.replace(stripHeader, "");
      console.log('prodId', prodId);

      returnObject.pNumber = prodNumber;
      returnObject.pHeader = prodHeader;
      returnObject.pDescription = prodDescription;
      returnObject.pImageUrl = prodImageUrl;

      // return returnObject;

    });
}

*/