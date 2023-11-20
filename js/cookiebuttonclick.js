//Add Cookies to bank

let cookiesPerClick = 1;

function cookieButtonClick(){
    let cookieTotal = parseFloat(sessionStorage.getItem('CookieTotal'));
    cookieTotal += cookiesPerClick;
    sessionStorage.setItem("CookieTotal", cookieTotal);
}

//Function for all particles
function cookieButtonParticle(event){
    //Create new cookiePerClickParticle
    //const newcpcParticle = new cookieButtonParticle();
    //newcpcParticle._generateHtmlText(event);
    //Create new cookie particle
    const newParticle = new cookieParticle();
    newParticle._generateHtmlImg(event);
}

//WERKT NIET Shows cookies per click
/*class cookiePerClickParticle{
    constructor(){
        // Generate a unique ID for every particle
        this.id = "cookiePerClickParticle" + new Date().getTime();
    }

    _generateHtmlText(){ //Generates the HTML for every text particle 
        //Creates a new text element
        const cpcParticle = document.createElement("div");
        //set the attributes for the text element
        cpcParticle.style.zIndex = 9999;
        cpcParticle.style.pointerEvents = "none";
        cpcParticle.clickable = false;
        cpcParticlesPer.id = this.id;
        //Sets the cookies per click in particle
        cpcParticle.innerText = "+1";

        //Particle on click location
        let x = event.clientX - 35;
        let y = event.clientY - 45;
        cpcParticle.style.position = "absolute";
        cpcParticle.style.left = x + "px";
        cpcParticle.style.top = y + "px";

        //Creates the particle
        document.body.appendChild(cpcParticle);

        //Particle goes up
        let y2 = y;
        let opacity = 1;
        //Particle up
        let timerUp = setInterval(() => {
            cpcParticle.style.top = y + "px";
            y = y - 1;
            cpcParticle.style.opacity = opacity;
            opacity -= 0.02;

            if (y < y2 - 36) {
              clearInterval(timerUp);
              setTimeout(() => {
                    document.getElementById(this.id).remove();
                  }, 100); //Timer for how long after animation particle gets deleted
            }
        }, 30); //Up speed
    }
}*/

//Small cookie animation on click
//cookieParticle Class
class cookieParticle{
    constructor(){
        this.src = "IMG/SmallCookie.png";
        this.width = 48;
        this.height = 48;

        // Generate a unique ID for every particle
        this.id = "particle" + new Date().getTime();
    }
    _generateHtmlImg(){ //Generates the HTML for the particle img
        // Create a new image element
        const smallCookie = document.createElement("img");
        // Set the attributes for the image element
        smallCookie.src = this.src;
        smallCookie.width = this.width;
        smallCookie.height = this.height;
        smallCookie.id = this.id;
        smallCookie.draggable = false;
        smallCookie.clickable = false;
        smallCookie.style.pointerEvents = "none";

        //Particle on click location
        let x = event.clientX - 15;
        let y = event.clientY - 45;
        smallCookie.style.position = "absolute";
        smallCookie.style.left = x + "px";
        smallCookie.style.top = y + "px";

        //Randomly rotates the particle
        let randomRotation = Math.random() * (359 - 1) + 1;
        let rotation = "rotate(" + randomRotation + "deg)";
        smallCookie.style.transform = rotation;

        //Creates the particle
        document.body.appendChild(smallCookie);

        //Particle goes up and down
        let y2 = y;
        let opacity = 1;
        //Particle up
        let timerUp = setInterval(() => {
            smallCookie.style.top = y + "px";
            y = y - 1;

            if (y < y2 - 18) {
              clearInterval(timerUp);

              //Particle down & fadeout
              let timerDown = setInterval(() => {
                smallCookie.style.top = y + "px";
                smallCookie.style.opacity = opacity;
                y = y + 1;
                opacity -= 0.02;

                if (y > y2 + 36) {
                  clearInterval(timerDown);
                  //Delete particle after fadeout
                  setTimeout(() => {
                    document.getElementById(this.id).remove();
                  }, 100); //Timer for how long after animation particle gets deleted
                } else if (y > y2 + 10){
                     smallCookie.style.opacity = Math.max(opacity, 0);
                }
              }, 30); //Down speed
            }
        }, 10); //Up speed
    }
}
