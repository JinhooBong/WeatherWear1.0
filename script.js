/* 
NEED TO DO:
- gather information on the city that the user inputs (DONE)
    - perhaps give error message if city is not properly input 

- position placements for displaying of information 
(weather, city name, weather description, maybe weather icon)

- add div to the side that display several clothing option suggestions (DONE)
*/

function getWeather() {
    displayInfo();
    var cityQuery = document.getElementById("city").value;
    const appid = "452bcd2ca7a0d4d440a64fea34d1c4ba";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery + "&appid=" + appid + "&units=" + unit;

    $.getJSON(url, function (data) {
        console.log(data);
        var temp = data.main.temp;
        var tempFeelsLike = data.main.feels_like;
        var cityName = data.name;
        var countryName = data.sys.country;
        var description = data.weather[0].description;
        displayTemp(temp, tempFeelsLike, cityName, countryName, description);
    })
}

function displayInfo() {
    var main = document.getElementById("main");
    main.style.width = "80vw";
    main.style.height = "40vh";
    main.style.transitionDuration = "3s";

    var locationInput = document.getElementById("locationInput");
    locationInput.style.display = "none";
    locationInput.style.transitionDuration = "3s";

    var input = document.getElementById("city");
    input.style.display = "none";
    input.style.transitionDuration = "5s";
}

function displayTemp(temp, feelLike, cityName, countryName, cityDescription) {

    var major = document.getElementById("majorChange");
    major.style.marginBottom = "1em";

    var temperature = document.getElementById("temperature");
    temperature.style.display = "block";
    temperature.style.transitionDuration = "3s";
    temperature.innerHTML = temp + " &deg;F";
    temperature.style.marginBottom = "0";

    var feels_like = document.getElementById('feelsLike');
    feels_like.style.display = "block";
    feels_like.style.transitionDuration = "3s";
    feels_like.innerHTML = "Feels like " + feelLike + " &deg;F";

    var cityTitle = document.getElementById("cityName");
    cityTitle.style.display = "block";
    cityTitle.style.marginTop = "1em;"
    cityTitle.style.transitionDuration = "3s";
    cityTitle.innerHTML = cityName + ", " + countryName;

    var leftHalf = document.getElementById("leftHalf");
    leftHalf.style.width = "50%";
    leftHalf.style.verticalAlign = "top";

    var rightHalf = document.getElementById("rightHalf");
    rightHalf.style.width = "40%";
    rightHalf.style.display = "inline-block";
    rightHalf.style.transitionDuration = "2s";
    rightHalf.style.verticalAlign = "top";

    var clothingTitle = document.getElementById("clothingTitle");
    clothingTitle.style.display = "block";
    clothingTitle.style.transitionDuration = "3s";

    var clothingList = document.getElementById("clothingList");
    clothingList.style.display = "block";

    clothing(clothingList, temp);
}

function clothing(clothingList, temp) {   

    if(temp > 75) {
        var node = document.createElement("LI");             
        var textnode = document.createTextNode("A T-shirt");        
        node.appendChild(textnode);                              
        clothingList.appendChild(node);
        var node2 = document.createElement("LI");
        var textnode2 = document.createTextNode("Some shorts");
        node2.appendChild(textnode2);
        clothingList.appendChild(node);
    } else if(temp < 75 && temp > 50) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode("A jacket");
        node.appendChild(textnode);
        clothingList.appendChild(node);
        var node2 = document.createElement("LI");
        var textnode2 = document.createTextNode("Jeans or some long pants");
        node2.appendChild(textnode2);
        clothingList.appendChild(node2);
    } else {
        var node = document.createElement("LI");
        var textnode = document.createTextNode("A thick jacket / Winter Coat");
        node.appendChild(textnode);
        var node2 = document.createElement("LI");
        var textnode2 = document.createTextNode("Some warm pants");
        node2.appendChild(textnode2);
        clothingList.appendChild(node2);
    }
}