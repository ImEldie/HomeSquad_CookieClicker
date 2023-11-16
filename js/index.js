// pre-declaration of variables and HTML values
const cookieTotalText = document.getElementById("cookie-total");
const cookiesPerSecondText = document.getElementById("cookies-per-second");

let cookiesPerSecondBonus = 0; // Percentual bonus to cookies per second (0 = 100% / 10 = 110%)

let cookieTotal = 0;
let cookiesPerSecond = 0.1; // To be written by amount of buildings later

// Functions
function cookiesPerSecondWalletUpdate(intervalTime) { // Supply intervalTime in ms, adds cookies per second to cookietotal.
    setInterval(() => {
        // Count cookieTotal + Cookies per second, cookiesPerSecond will always update correctly, even if we decide to update every 200ms
        // Also adds the percentual CPS bonus
        let cookiesPerSecondEffectiveBoost = ((100 + cookiesPerSecondBonus)/100);
        cookieTotal = cookieTotal + (cookiesPerSecond * (intervalTime / 1000) * cookiesPerSecondEffectiveBoost);
        // Update HTML page
        cookieTotalText.innerHTML = cookieTotal.toFixed(1); // Rounds the number to 1 decimal
        cookiesPerSecondText.innerHTML = cookiesPerSecond * cookiesPerSecondEffectiveBoost;
    }, intervalTime);
}

// Runtime
cookiesPerSecondWalletUpdate(100);