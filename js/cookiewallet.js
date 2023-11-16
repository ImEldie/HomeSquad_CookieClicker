// pre-declaration of variables and HTML values
const cookieTotal = document.getElementById("cookie-total");
const cookiesPerSecond = document.getElementById("cookies-per-second");

// Functions
function cookiesPerSecondUpdate(intervalTime) { // Supply intervalTime in ms, adds cookies per second to cookietotal.
    
    // Code breaks if cookiesPerSecond is lower than 0.1, due to rounding issues.
    if (intervalTime < 55) {    // intervalTime protection, if intervalTime is too low, set to functional minimum
        console.log("intervalTime for cookiesPerSecondUpdate() too low! is:", intervalTime , "ms, now set to 550ms.")
        intervalTime = 55;
    }
    
    setInterval(() => {
        /*  IMPORTANT
            .innerHTML returns a string value, it needs to be converted to number for calculations.
            To convert this we use 'parseFloat()'
        */
        // Count cookieTotal + Cookies per second, cookiesPerSecond will always update correctly, even if we decide to update every 200ms
        const newCookieTotal = parseFloat(cookieTotal.innerHTML) + (parseFloat(cookiesPerSecond.innerHTML) * (intervalTime / 1000));
        cookieTotal.innerHTML = newCookieTotal.toFixed(2); // Rounds the number to 1 decimal.
    }, intervalTime);
}

// Runtime
cookiesPerSecondUpdate(100);