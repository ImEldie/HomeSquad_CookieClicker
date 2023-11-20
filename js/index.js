// ### CLASSES ###

class building {
    name;
    id;
    startPrice;
    currentPrice;

    cookiesPerSecond; // Amount of cookies per second, from 1 building instance
    totalCookiesPerSecond; // Amount of cookies per second from ALL buildings of this instance.
    
    amount;
    enoughCookiesToBuy;
    unlocked;

    htmlElementButton;
    htmlElementName;
    htmlElementAmount;
    htmlElementPrice;

    constructor(initId, initName, initBasePrice, initCookiesPerSecond){
        // Write start variables
        this.name = initName;
        this.startPrice = initBasePrice;
        this.currentPrice = this.startPrice;
        this.cookiesPerSecond = initCookiesPerSecond;
        this.id = initId;
        this.amount = 0;
        this.unlocked = false;

        // Declare html elements
        this._generateHtmlButton();
        this.htmlElementButton = document.getElementById("building" + this.id);
        this.htmlElementName = document.getElementById("building" + this.id + "-name");
        this.htmlElementAmount = document.getElementById("building" + this.id + "-amount");
        this.htmlElementPrice = document.getElementById("building" + this.id + "-price");

        // Add event listener, to run the "buy" command when button is clicked.
        this.htmlElementButton.addEventListener('click', () => {
            this.buy();
        });

        // render the button values
        this.updateInstance();
    }
    _generateHtmlButton(){  // Generates the HTML code for the button
        let idName = "building" + this.id;
        // Create a new button element
        var button = document.createElement("button");
        button.className = "building-button-open";
        button.id = idName;

        // Create the first div element for building-image
        var imageDiv = document.createElement("div");
        imageDiv.className = "building-image";
        imageDiv.id = idName + "-image";
        imageDiv.appendChild(document.createTextNode("img")); // Assuming you want to display "img" text

        // Create the second div element for building-name
        var nameDiv = document.createElement("div");
        nameDiv.className = "building-name";
        nameDiv.id = idName + "-name";
        nameDiv.appendChild(document.createTextNode(this.name));

        // Create a div element for to show amount & price on top of eachother
        var amountPriceDiv = document.createElement("div");
        amountPriceDiv.className = "building-number-div";

        // Create the div for building-amount
        var amountDiv = document.createElement("div");
        amountDiv.className = "building-amount";
        amountDiv.id = idName + "-amount";
        amountDiv.appendChild(document.createTextNode(this.amount)); // Set the initial value to 0

        // Create the div for building-price
        var priceDiv = document.createElement("div");
        priceDiv.className = "building-price-green";
        priceDiv.id = idName + "-price";
        priceDiv.appendChild(document.createTextNode(this.currentPrice)); // Set the initial price value to 10

        // Append amountDiv and priceDiv to a third div (amountPriceDiv)
        amountPriceDiv.appendChild(amountDiv);
        amountPriceDiv.appendChild(priceDiv);

        // Append imageDiv, nameDiv, and amountPriceDiv to the button
        button.appendChild(imageDiv);
        button.appendChild(nameDiv);
        button.appendChild(amountPriceDiv);

        // Append the button to the body (or any other container)
        const buildingShopDiv = document.getElementById("building-shop");
        buildingShopDiv.appendChild(button);
    }
    _renderHtml(){
        // ### Update Price ###
        // Price
        _visualiseHtmlNumber(this.htmlElementPrice,this.currentPrice);
        // Price colour
            // Update button class based on condition
        this.htmlElementButton.classList.remove('building-button-open', 'building-button-closed');
        this.htmlElementButton.classList.add(this.enoughCookiesToBuy ? 'building-button-open' : 'building-button-closed');

            // Update Price colour based on condition
        this.htmlElementPrice.classList.remove('building-price-green', 'building-price-red');
        this.htmlElementPrice.classList.add(this.enoughCookiesToBuy ? 'building-price-green' : 'building-price-red');

        // ### Update Amount ###
        this.htmlElementAmount.innerHTML = this.amount;

        // ### Check if Unlocked ###
        if (cookieTotal >= (this.startPrice * 0.75) && this.unlocked == false){
            // If we reach 75% of the startPrice once, unlock name forever
            this.unlocked = true;
        }

        if (this.unlocked) {
            this.htmlElementName.innerHTML = this.name;
        } else {
            this.htmlElementName.innerHTML = "???";
        }
    }
    _evaluateIfPurchaseable(){ // Checks if there is enough money in wallet to purchase this building, returns true or false
        this.enoughCookiesToBuy = (this.currentPrice <= cookieTotal);

        return this.enoughCookiesToBuy;
    }
    _calculateCurrentPrice(){ // calculates the price for the item, ran every time after a purchase
        let priceRaiseAmount = ((100 + (this.amount * buildingPriceIncreasePerPurchase))/100); // Raise price by 10% for every building
        this.currentPrice = this.currentPrice * priceRaiseAmount;
        this.currentPrice = Math.ceil(this.currentPrice);
    }
    calculateCookiesPerSecond(){    // Calculates how many cookies per second are being generated by all instances of this building
        this.totalCookiesPerSecond = this.amount * this.cookiesPerSecond * ((100 + cookiesPerSecondBonus)/100);
        return this.totalCookiesPerSecond;
    }
    buy() { // Purchase an instance of this building type
        if (this._evaluateIfPurchaseable()){
            cookieTotal = cookieTotal - this.currentPrice;
            this.amount++;

            this._calculateCurrentPrice();
        }
        
        this.updateInstance();
    }
    updateInstance(){   // Forces the button to render in HTML
        this._evaluateIfPurchaseable();
        this._renderHtml();
    }
}
class upgrade {
    name;
    id;
    startPrice;
    currentPrice;

    amount;
    enoughCookiesToBuy;
    requiredBuildingId;
    unlocked;

    htmlElementUpgradeButton;
    htmlElementUpgradeName;
    htmlElementUpgradeAmount;
    htmlElementUpgradePrice;

    constructor(initId, initName, initBasePrice,initCookiesPerSecond, requiredBuildingId, efficiencyBoost){
        this.name = initName;
        this.id = initId;
        this.currentPrice = initBasePrice;
        this.amount = 0;
        this.unlocked = false;
        this.requiredBuildingId = requiredBuildingId;
        this.cookiesPerSecond = initCookiesPerSecond;
        this.efficiencyBoost = efficiencyBoost;

        this._generateHtmlButton();
        this.htmlElementUpgradeButton = document.getElementById("upgrade" + this.id);
        this.htmlElementUpgradeName = document.getElementById("upgrade" + this.id + "-name");
        this.htmlElementUpgradeAmount = document.getElementById("upgrade" + this.id + "-amount");
        this.htmlElementUpgradePrice = document.getElementById("upgrade" + this.id + "-price");

        this.htmlElementUpgradeButton.addEventListener('click', () => {
            this.buy();
    });

    this.updateInstance();
  }
  _generateHtmlButton(){ 
    let idName = "upgrade" + this.id;
    const button = document.createElement("button");
    button.className = "upgrade-button-open";
    button.id = idName;

    const imageDiv = document.createElement("div");
        imageDiv.className = "upgrade-image";
        imageDiv.id = idName + "-image";
        imageDiv.appendChild(document.createTextNode("img"));

    const nameDiv = document.createElement("div");
        nameDiv.className = "upgrade-name";
        nameDiv.id = idName + "-name";
        nameDiv.appendChild(document.createTextNode(this.name));
        
    const amountPriceDiv = document.createElement("div");
        amountPriceDiv.className = "upgrade-number-div";
        
    const amountDiv = document.createElement("div");
        amountDiv.className = "upgrade-amount";
        amountDiv.id = idName + "-amount";
        amountDiv.appendChild(document.createTextNode(this.amount));
        
    const priceDiv = document.createElement("div");
        priceDiv.className = "upgrade-price-green";
        priceDiv.id = idName + "-price";
        priceDiv.appendChild(document.createTextNode(this.currentPrice));

        amountPriceDiv.appendChild(amountDiv);
        amountPriceDiv.appendChild(priceDiv);

        button.appendChild(imageDiv);
        button.appendChild(nameDiv);
        button.appendChild(amountPriceDiv);

    const upgradeShopDiv = document.getElementById("upgrade-buttons");
          upgradeShopDiv.appendChild(button);
  }
  _renderHtml(){
    _visualiseHtmlNumber(this.htmlElementUpgradePrice,this.currentPrice);

    this.htmlElementUpgradeButton.classList.remove('upgrade-button-open', 'upgrade-button-closed');
    this.htmlElementUpgradeButton.classList.add(this.enoughCookiesToBuy ? 'upgrade-button-open' : 'upgrade-button-closed');

    this.htmlElementUpgradePrice.classList.remove('upgrade-price-green', 'upgrade-price-red');
    this.htmlElementUpgradePrice.classList.add(this.enoughCookiesToBuy ? 'upgrade-price-green' : 'upgrade-price-red');

    this.htmlElementUpgradeAmount.innerHTML = this.amount;

    if (cookieTotal >= (this.currentPrice * 0.75) && this.unlocked == false){

        this.unlocked = true;
    }

    if ( this.amount > 0 ){
        this.htmlElementUpgradeButton.style.display = 'none';
    } else if (this.unlocked) {
        this.htmlElementUpgradeButton.style.display = 'block';
    } else {
        this.htmlElementUpgradeButton.style.display = 'none';
    }
  }

    _evaluateIfPurchaseable(){ 
    this.enoughCookiesToBuy = (this.currentPrice <= cookieTotal && buildings[this.requiredBuildingId].amount > 0);

    return this.enoughCookiesToBuy;
    }

    buy() { 
        if (this._evaluateIfPurchaseable()){
            cookieTotal = cookieTotal - this.currentPrice;
            this.amount++;
        }
        const building = buildings[this.requiredBuildingId];
        building.cookiesPerSecond *= this.efficiencyBoost;

        this.updateInstance();
    }
    updateInstance(){   
        this._evaluateIfPurchaseable();
        this._renderHtml();
    }
}
// ### VARIABLES ###
const cookieTotalText = document.getElementById("cookie-total");
const cookiesPerSecondText = document.getElementById("cookies-per-second");

let cookiesPerSecondBonus = 0; // Percentual bonus to cookies per second (0 = 100% / 10 = 110%)
const buildingPriceIncreasePerPurchase = 5; // Percentage that a building's price increases with upon purchase

let cookieTotal = 1000;
let cookiesPerSecond = 0; // To be written by amount of buildings later

let buildings = [
    new building(0,"Clicker",10,0.1),
    new building(1,"Granny",115,1),
    new building(2,"Farm",1100,8),
    new building(3,"Test",5500,16)
]

let upgrades = [
    new upgrade(0, "Plastic-mouse",200,0.5,0,1.5),
    new upgrade(1, "Metal-mouse",300,2.5,1,2),
    new upgrade(2, "Golden-mouse",400,5,2,2.5),
    new upgrade(3, "Platinum-mouse",500,50,3,3)
]

// ### FUNCTIONS ###
function _calculateGlobalCookiesPerSecond(){
    let bufferValue = 0;

    for (let i = 0; i < buildings.length; i++) {
        if (buildings[i].amount != 0){
            bufferValue = bufferValue + buildings[i].calculateCookiesPerSecond();
        }
    }
    cookiesPerSecond = bufferValue;
    return cookiesPerSecond;
}
function _visualiseHtmlNumber(htmlElement,checkValue){ //Writes a html element's numerical value as 0.0/100/10.0k/1.000 Million
    // ### Instructions for the required variables ###
        /* 
        htmlElement example: 
        first make a variable like this example:
        const cookieTotalText = document.getElementById("cookie-total"); 

        call this variable within this function like so:
        _visualiseHtmlNumber(cookieTotalText, ...);
        */
       /*
       checkValue is the value that we will check visualise inside the htmlElement
       */

    if (checkValue < 1000){    // Show number with 1 decimal (0 - 99.9)
        htmlElement.innerHTML = checkValue.toFixed(1); // Rounds the number to 1 decimal
    } else if (cookieTotal < 10000){   
        htmlElement.innerHTML = Math.round(checkValue); // Rounds the number without decimals
    }
    else if (cookieTotal < 1000000){ // Show rounded number (100 - 9999)k (thousands)
        htmlElement.innerHTML = (checkValue/1000).toFixed(1) + "k"; // Rounds the number without decimals
    } else { // show value in millions
        htmlElement.innerHTML = (checkValue/1000000).toFixed(3) + " Million"; // Rounds the number without decimals
    }   // MORE VARIANTS TO BE ADDED WHENEVER NECESARRY
}
function cookiesPerSecondWalletUpdate(intervalTime) { // Supply intervalTime in ms, adds cookies per second to cookietotal.
    setInterval(() => {
        // ### CALCULATE COOKIES PER SECOND ###
        _calculateGlobalCookiesPerSecond();

        // ### ADD COOKIES PER SECOND TO COOKIE TOTAL ###
        // Count cookieTotal + Cookies per second, cookiesPerSecond will always update correctly, even if we decide to update every 200ms
        // Also adds the percentual CPS bonus
        let cookiesPerSecondEffectiveBoost = ((100 + cookiesPerSecondBonus)/100);
        cookieTotal = cookieTotal + (cookiesPerSecond * (intervalTime / 1000) * cookiesPerSecondEffectiveBoost);

        // ### UPDATE HTML VALUES ###
        // Cookies total update
        _visualiseHtmlNumber(cookieTotalText,cookieTotal);
        _visualiseHtmlNumber(cookiesPerSecondText,cookiesPerSecond);
    }, intervalTime);
}
function periodicStoreRender(intervalTime){ // Supply intervaltime, forces all buttons to render every x ms, needed to visualise that a building is purchaseable
    setInterval(() => {
        for (let i = 0; i < buildings.length; i++) {
            buildings[i].updateInstance();
        }
    }, intervalTime);
    
    setInterval(() => {
        for (let i = 0; i < buildings.length; i++) {
            buildings[i].updateInstance();
        }
        if(buildings[0].amount >= 3){
            upgrades[0].unlocked = true;
            upgrades[0].updateInstance();
        }
        if (buildings[1].amount >= 3) {
            upgrades[1].unlocked = true;
            upgrades[1].updateInstance();
        }

        if (buildings[2].amount >= 3) {
            upgrades[2].unlocked = true;
            upgrades[2].updateInstance();
        }
        if (buildings[3].amount >= 3) {
            upgrades[3].unlocked = true;
            upgrades[3].updateInstance();
        }
    }, intervalTime)
}

// ### RUNTIME ###
cookiesPerSecondWalletUpdate(100);
periodicStoreRender(250);