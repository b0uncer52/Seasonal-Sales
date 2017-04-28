var display = document.getElementById("display");
var season = document.getElementById("season");
season.addEventListener("change", displayProducts);
var rawProductList, categories;

function dataRequestFailed(event) {
  console.log("Data request failed");
}
function depRequestComplete(event) {
  categories = JSON.parse(event.target.responseText);
  categories = categories.categories;
}
function prodRequestComplete(event) {
  rawProductList = JSON.parse(event.target.responseText);
  rawProductList = rawProductList.products;
  displayProducts();
}
function displayProducts(){
  display.innerHTML = "";
  var discountSeason = season.value;
  var disPercent = 1.00;
  for(cat in categories) {
    if(categories[cat].id == Number(discountSeason)) {
      disPercent = 1.00 - categories[cat].discount;
    }
  }
  for(item in rawProductList) {
    var price = rawProductList[item].price;
    if(discountSeason == rawProductList[item].category_id) {
      price = Math.round(price * disPercent * 100) / 100;
    }
    var itemString = document.createElement('div');
    itemString.innerHTML = `<div id="season${rawProductList[item].category_id}">${rawProductList[item].name}<br>Price: ${price}</div>`;
    display.appendChild(itemString);
  }
}
var depData = new XMLHttpRequest();

depData.addEventListener("load", depRequestComplete);
depData.addEventListener("error", dataRequestFailed);

depData.open("GET", "categories.json");
depData.send();

var prodData = new XMLHttpRequest();

prodData.addEventListener("load", prodRequestComplete);
prodData.addEventListener("error", dataRequestFailed);

prodData.open("GET", "products.json");
prodData.send();