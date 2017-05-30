/**
 * Uses AJAX to query an internet data source for myCountry codes
 * @param {string} country The element id that has the myCountry code
 * @param {string} year The element id that has the myYear code
 * @param {string} month The element id that has the myMonth code
 */
function getResponse(country, year, month) {
    // First get the myCountry code from the HTML textbox
    var myCountry = document.getElementById(country).value;
    var myYear = document.getElementById(year).value;
    var myMonth = document.getElementById(month).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            console.log("readyState is 4");
            if(this.status === 200) {
                // The request was successful!
                displayResponse(this.responseText);
                console.log("200");
            } else if (this.status === 404){
                // No holidays found
                displayholidays('{ "country" : "none" }');
                console.log("404");
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };
    // URL appended with myCountry, myYear and myMonth
    //TEST   30d78ea8-80f8-49e0-94e2-f32757b8ee32
    //       24957801-683a-498b-bb01-d6ef7fb876e4
    var url = "https://holidayapi.com/v1/holidays?key=24957801-683a-498b-bb01-d6ef7fb876e4&country=" + myCountry + "&year=" + myYear + "&month=" + myMonth;
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

/**
 * Displays the myCountry code holidays given the JSON data
 * @param {string} data JSON data representing holidays for given myCountry code
 */
function displayResponse(data){
    var selectedHolidays = JSON.parse(data);
    var chosenHolidays = [];
    console.log(selectedHolidays);
    if(selectedHolidays.holidays.length == 0) {
        document.getElementById("selectedHolidays").className = "alert alert-warning";
        document.getElementById("selectedHolidays").innerHTML = "No holidays found."
    } else {
        document.getElementById("selectedHolidays").className = "alert alert-success";
        for(i = 0; i < selectedHolidays.holidays.length; i++) {
            chosenHolidays.push(selectedHolidays.holidays[i].name + ":" + selectedHolidays.holidays[i].date + "<br>");
        }
        document.getElementById("selectedHolidays").innerHTML = chosenHolidays;;
    }
}
