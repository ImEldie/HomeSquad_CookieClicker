// ### CLASSES ###
class building {
    name;
    id;
    startPrice;
    currentPrice;

    cookiesPerSecond; // Amount of cookies per second, from 1 building instance
    totalCookiesPerSecond; // Amount of cookies per second from ALL buildings of this instance.
    cookiesPerSecondPercentage; // Percuantual income by this building type
    
    amount;
    enoughCookiesToBuy;
    unlocked;
    imageYCoordinate;

    htmlElementButton;
    htmlElementName;
    htmlElementAmount;
    htmlElementPrice;
    htmlElementImage;
    htmlElementTooltip;

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
        this.htmlElementImage = document.getElementById("building" + this.id + "-image");
        this.htmlElementTooltip = document.getElementById("building" + this.id + "-tooltip");

        // Add event listener, to run the "buy" command when button is clicked.
        this.htmlElementButton.addEventListener('click', () => {
            this.buy();
        });

        // render the button values
        this.updateInstance();
    }
    _generateHtmlButton(){  // Generates the HTML code for the button
        const idName = "building" + this.id;
        // Create a new button element
        const button = document.createElement("button");
        button.className = "building-button-open";
        button.id = idName;

        // Create the first div element for building-image
        const imageDiv = document.createElement("img");
        imageDiv.className = "building-image";
        imageDiv.id = idName + "-image";
        imageDiv.alt= "img-" + this.name;
        imageDiv.src = "https://orteil.dashnet.org/cookieclicker/img/buildings.png";
        
        // Set the positioning for the 
        if (this.id < 2){ 
            this.imageYCoordinate = -(this.id * 64);
        } else { // Shift the position by 1, since row 3 consists of angry grandmas
            this.imageYCoordinate = -((this.id + 1) * 64);
        }

        this.imageYCoordinate = this.imageYCoordinate + "px"; // Add px to the end, since the coord value is in Pixels.

        console.log("Generating image for:", this.name + "-button with y-coord", this.imageYCoordinate);
        // -64px => Black image
        imageDiv.style.objectPosition = '-64px' + ' ' + this.imageYCoordinate;
    

        imageDiv.appendChild(document.createTextNode("img")); // Assuming you want to display "img" text

        // Create the second div element for building-name
        const nameDiv = document.createElement("div");
        nameDiv.className = "building-name";
        nameDiv.id = idName + "-name";
        nameDiv.appendChild(document.createTextNode(this.name));

        // Create a div element for to show amount & price on top of eachother
        const amountPriceDiv = document.createElement("div");
        amountPriceDiv.className = "building-number-div";

        // Create the div for building-amount
        const amountDiv = document.createElement("div");
        amountDiv.className = "building-amount";
        amountDiv.id = idName + "-amount";
        amountDiv.appendChild(document.createTextNode(this.amount)); // Set the initial value to 0

        // Create the div for building-price
        const priceDiv = document.createElement("div");
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

        // create tooltip code
        let tooltipDiv = document.createElement("div");
        tooltipDiv.className = "tooltip-locked";    // tooltip will be invisible until building is unlocked by the player
        tooltipDiv.id = idName + "-tooltip";
        tooltipDiv.innerHTML = "DESCRIPTION GOES HERE";

        // Append the button & tooltip to the body (or any other container)
        const buildingShopDiv = document.getElementById("building-shop");
        buildingShopDiv.appendChild(button);
        buildingShopDiv.appendChild(tooltipDiv);
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
            
            // Update image opacity based on condition
        if (this.unlocked) {
            this.htmlElementImage.classList.remove('building-image', 'building-image-hidden');
            this.htmlElementImage.classList.add(this.enoughCookiesToBuy ? 'building-image' : 'building-image-hidden');
        }

        // ### Update Amount ###
        this.htmlElementAmount.innerHTML = this.amount;

        // ### Check if Unlocked ###
        if (cookieTotal >= (this.startPrice * 0.75) && this.unlocked == false){
            // If we reach 75% of the startPrice once, unlock name forever
            this.unlocked = true;
            // Set htmlElement for tooltip's class to "tooltip" instead of "tooltip-locked"
            const idName = "building" + this.id;
            const tooltipDiv = document.getElementById(idName + "-tooltip")
            tooltipDiv.classList = "tooltip";
            // Set image x-coordinate to the visible version
            this.htmlElementImage.style.objectPosition = '0px' + ' ' + this.imageYCoordinate;
        }

        if (this.unlocked) {
            this.htmlElementName.innerHTML = this.name;
        } else {
            this.htmlElementName.innerHTML = "???";
        }

        // ### Update tooltip ###
        this.calculateCookiesPerSecond();
        this.htmlElementTooltip.innerHTML = this.name + " adds " + this.cookiesPerSecond + "CpS per instance, currently getting " + this.totalCookiesPerSecond.toFixed(1) + "CpS ("+ this.cookiesPerSecondPercentage.toFixed(1) +"% of total CpS) from these buildings.";
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
        if (this.amount == 0){
            this.totalCookiesPerSecond = 0;
            this.cookiesPerSecondPercentage = 0;
        } else {
            this.totalCookiesPerSecond = this.amount * this.cookiesPerSecond * ((100 + cookiesPerSecondBonus)/100);
            this.cookiesPerSecondPercentage = ((this.totalCookiesPerSecond / cookiesPerSecond) * 100);
            if (this.cookiesPerSecondPercentage >= 100) {   // Visual bug that shows the percentage as 200%/133% for a little bit, if percentage goes over 100 we force it to be 100.
                this.cookiesPerSecondPercentage = 100;
            }
        }
        
        return this.totalCookiesPerSecond;
    }
    buy() { // Purchase an instance of this building type
        if (this._evaluateIfPurchaseable()){
            cookieTotal = cookieTotal - this.currentPrice;
            sessionStorage.setItem("CookieTotal", cookieTotal);
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

// ### VARIABLES ###
const cookieTotalText = document.getElementById("cookie-total");
const cookiesPerSecondText = document.getElementById("cookies-per-second");

let cookiesPerSecondBonus = 0; // Percentual bonus to cookies per second (0 = 100% / 10 = 110%)
const buildingPriceIncreasePerPurchase = 5; // Percentage that a building's price increases with upon purchase

let cookieTotal = 0;
sessionStorage.setItem("CookieTotal", cookieTotal);
let cookiesPerSecond = 0; // To be written by amount of buildings later
let cookiesPerClick = 1;

let buildings = [
    new building(0,"Cursor",10,0.1),
    new building(1,"Granny",115,1),
    new building(2,"Farm",1100,8),
    new building(3,"Mine",4200,32)
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
        cookieTotal = parseFloat(sessionStorage.getItem('CookieTotal'));
      
        // ### ADD COOKIES PER SECOND TO COOKIE TOTAL ###
        // Count cookieTotal + Cookies per second, cookiesPerSecond will always update correctly, even if we decide to update every 200ms
        // Also adds the percentual CPS bonus
        let cookiesPerSecondEffectiveBoost = ((100 + cookiesPerSecondBonus)/100);
        cookieTotal = cookieTotal + (cookiesPerSecond * (intervalTime / 1000) * cookiesPerSecondEffectiveBoost);
        sessionStorage.setItem("CookieTotal", cookieTotal);

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
}

// ### RUNTIME ###
cookiesPerSecondWalletUpdate(100);
periodicStoreRender(250);