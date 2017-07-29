// var axios = require('axios');
var request = require('sync-request');
var cheerio = require('cheerio');
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
getProductDetailsSync(targetUrl);

testUrls.forEach(function (url) {
  // console.log(url) getProductDetails(url);
  getProductDetailsSync(url);
});

function getProductDetailsSync(prodUrl) {
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

  // returnObject.pNumber = prodNumber; returnObject.pHeader = prodHeader;
  // returnObject.pDescription = prodDescription; returnObject.pImageUrl =
  // prodImageUrl; return returnObject;

}
// ****************************************
// DO NOT USE THE ASYNC - WILL BREAK SERVER
// ****************************************
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