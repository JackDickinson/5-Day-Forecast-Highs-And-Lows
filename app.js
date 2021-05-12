
// Obtain HTML elements for passing in data to after

var card_firstDay_title = document.getElementById("card_firstDay_title");
var card_secondDay_title = document.getElementById("card_secondDay_title");
var card_thirdDay_title = document.getElementById("card_thirdDay_title");
var card_fourthDay_title = document.getElementById("card_fourthDay_title");
var card_fifthDay_title = document.getElementById("card_fifthDay_title");

var card_highTemps = document.getElementsByClassName("highTemp");
var card_lowTemps = document.getElementsByClassName("lowTemp");
var submit_search_btn = document.getElementById("btn_submit");

var arrayOfTitles = [card_firstDay_title,card_secondDay_title,card_thirdDay_title,card_fourthDay_title,card_fifthDay_title];


// get input from user on submit of button press

submit_search_btn.addEventListener('click', () => {
    
var user_input = document.getElementById("location_input").value;

document.getElementById("location_input").value = "";

// carry out data analysis and retrieval 

fetchData(user_input);

});

 function fetchData(location) {
   
fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&appid=464f31ef61cf5555abd22fd241ab8908')
    .then((response) => {
        
        if (response.status == 400) {
alert("Location must not be empty - Please try entering a valid city or country");
        } else if (response.status == 404) {
            alert("Location not found - Please try inputting a valid city or country.");
        } else {

        response.json().then((data) => {

            // --data required--
            // min temp
            // max temp

            // set the days of the week for the card headings 
           setDaysOfWeek(data);

            // get the highest and minimum temperature for any given day (5 day max)
            var temps = [];
            var temps_highs = [];
            var temps_lows = [];

            for (var i = 0;i < 40;i++) {
              //  console.log(String(data.list[i].dt_txt).split(" ")[1])
                if (String(data.list[i].dt_txt).split(" ")[1] === "00:00:00") {
                  //  console.log( typeof data.list[i].main.temp);
                    temps_highs.push((Math.max(...temps) - 273.15).toFixed(1))
                    temps_lows.push((Math.min(...temps) - 273.15).toFixed(1))
             //       console.log(temps_highs)
             //       console.log(temps_lows)
                    temps = [];
                    
                } else {
              temps.push(data.list[i].main.temp)

            }
        }

        for (var i = 0; i < 5;i++) {
            card_highTemps[i].innerHTML = temps_highs[i];
            card_lowTemps[i].innerHTML = temps_lows[i];
        }

        })}
    })
}

function setDaysOfWeek(data) {
    var firstDate = new Date(String(data.list[0].dt_txt).split(" ")[0]);

    for (var i = 0;i < 5; i++) {
      var date = new Date();
      var dayOfWeek = ""
      date.setDate(firstDate.getDate() + i);
        switch (date.getDay()) {
            // 0 is the start of the week according to the api this is a sunday
            case 0:
                dayOfWeek = "Sunday"
                break;
            case 1:
                dayOfWeek = "Monday"
                break;
            case 2:
                dayOfWeek = "Tuesday"
                break;
            case 3:
                dayOfWeek = "Wednesday"
                break;
            case 4:
                dayOfWeek = "Thursday"
                break;
            case 5:
                dayOfWeek = "Friday"
                break;
            case 6:
                dayOfWeek = "Saturday"
                break;

            default:
                break;
        }

        // set day of card title
        arrayOfTitles[i].innerHTML = dayOfWeek

    }
}
 
document.getElementById("location_input").value = "London";
fetchData("London");