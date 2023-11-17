let cookiesPerClick = 1;

function cookieButtonClick(){
    let cookieTotal = parseFloat(sessionStorage.getItem('CookieTotal'));
    cookieTotal += cookiesPerClick;
    sessionStorage.setItem("CookieTotal", cookieTotal);
}
