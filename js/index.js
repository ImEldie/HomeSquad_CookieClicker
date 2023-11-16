// pre-declaration of variables and HTML values
const cookieTotalText = document.getElementById("cookie-total");
const cookiesPerSecondText = document.getElementById("cookies-per-second");

let cookiesPerSecondBonus = 0; // Percentual bonus to cookies per second (0 = 100% / 10 = 110%)

let cookieTotal = 0;
let cookiesPerSecond = 1; // To be written by amount of buildings later

// Classes
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
        this.name = initName;
        this.startPrice = initBasePrice;
        this.currentPrice = this.startPrice;
        this.cookiesPerSecond = initCookiesPerSecond;
        this.id = initId;
        this.amount = 0;
        this.unlocked = false;

        this.htmlElementButton = document.getElementById("building" + this.id);
        this.htmlElementName = document.getElementById(this.htmlElementButton + "-name");
        this.htmlElementAmount = document.getElementById(this.htmlElementButton + "-amount");
        this.htmlElementPrice = document.getElementById(this.htmlElementButton + "-price");

        this.updateInstance();
    }

    _renderHtml(){
        // ### Update Price ###
        // Price
        this.htmlElementPrice.innerHTML = this.currentPrice;
        // Price colour
        if (this.enoughCookiesToBuy) {
            this.htmlElementButton.class = "building-button-open";
            this.htmlElementPrice.class = "building-price-green";
        } else {
            this.htmlElementButton.class = "building-button-closed";
            this.htmlElementPrice.class = "building-price-red";
        }

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

    _evaluateIfPurchaseable(){
        this.enoughCookiesToBuy = (this.currentPrice < cookieTotal);
    }

    _calculateCurrentPrice(){
        let priceRaiseAmount = this.currentPrice * ((100 + (this.amount * 10))/100); // Raise price by 10% for every building
        this.currentPrice = this.currentPrice + priceRaiseAmount;
    }

    buy() {
        this._evaluateIfPurchaseable();

        if (this.enoughCookiesToBuy){
            cookieTotal = cookieTotal - this.currentPrice;
            this.amount++;
            this.updateInstance();
        }
    }

    updateInstance(){
        this._calculateCurrentPrice();
        this._evaluateIfPurchaseable();
        this._renderHtml();
    }
}

// Functions
function cookiesPerSecondWalletUpdate(intervalTime) { // Supply intervalTime in ms, adds cookies per second to cookietotal.
    setInterval(() => {
        // Count cookieTotal + Cookies per second, cookiesPerSecond will always update correctly, even if we decide to update every 200ms
        // Also adds the percentual CPS bonus
        let cookiesPerSecondEffectiveBoost = ((100 + cookiesPerSecondBonus)/100);
        cookieTotal = cookieTotal + (cookiesPerSecond * (intervalTime / 1000) * cookiesPerSecondEffectiveBoost);
        // Update HTML page
        cookieTotalText.innerHTML = cookieTotal.toFixed(1); // Rounds the number to 1 decimal
        cookiesPerSecondText.innerHTML = cookiesPerSecond * cookiesPerSecondEffectiveBoost; // Visualises current cookies per second
    }, intervalTime);
}

// Runtime
cookiesPerSecondWalletUpdate(100);