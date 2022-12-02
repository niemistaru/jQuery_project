//Event listener to input (select movie theatre)
//
document.querySelector('input').addEventListener('input', function(event) {
    filterMovies(event.target.value);
});

//Variables needed
var theatreID;

//Get date and display it in a Finnish way
var date = new Date();
var day = date.getDate();
var month = (date.getMonth() + 1);
var year = date.getFullYear();
date = day + "." + month + "." + year;
document.getElementById("date").innerHTML = date;

//Select a theatre from drop-down menu --> filter information
function filterMovies() {
    document.getElementById("movietheatre").select();
    switch (document.getElementById("movietheatre").value) {
        case "Pääkaupunkiseutu":
            theatreID = 1014;
            break;
        case "Espoo":
            theatreID = 1012;
            break;
        case "Espoo: Omena":
            theatreID = 1039;
            break;    
        case "Espoo: Sello":
            theatreID = 1038;
            break;
        case "Helsinki":
            theatreID = 1002;
            break;
        case "Helsinki: Itis":
            theatreID = 1045;
            break;
        case "Helsinki: Kinopalatsi":
            theatreID = 1031;
            break;
        case "Helsinki: Maxim":
            theatreID = 1032;
            break;
        case "Helsinki: Tennispalatsi":
            theatreID = 1033;
            break;
        case "Vantaa: Flamingo":
            theatreID = 1013;
            break;
     
        default:
            theatreID = null;
            var name = document.getElementById("movietheatre").value;
            alert ("Teatterissa " + name + " ei mene tänään elokuvia, valitse jokin toinen.");
            document.getElementById("movietheatre").value = "";
    }
    getInfo();
}

//Function to fetch info from api
function getInfo() {
    if (theatreID != undefined) {
        var url = "https://www.finnkino.fi/xml/Schedule/?area=" + theatreID;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                filterInfo(this);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

//Function to parse xml: image, title
function filterInfo(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table1= "<table><tbody>";
    var shows = xmlDoc.getElementsByTagName("Show");
     // If there's no movies in the selected theatre, alert user
     if (shows.length == 0) {
            alert("Valitussa teatterissa " + theatreName + " ei mene tällä hetkellä elokuvia. Valitse jokin toinen.")
            document.getElementById("movietheatre").value = "";
        } else {   
            for (i = 0; i < shows.length; i++) {
                var image = "<img id='moviePic' src='" + shows[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue + "'></img>";
                table1 += "<tr><td id='image'>" + image + "</td>" +
                "<td id='title'>" + shows[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue + 
                "<br>" + "<p id='genre'>" + shows[i].getElementsByTagName("Genres")[0].childNodes[0].nodeValue + "</p></td>" +
                //Format timestamp and punctuation
                "<td id='showdate'>" + date + "<br>"+ "<p id =time>" + shows[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue.slice(11,16).replace(":", ".") + "</p></td>" +
                "<td id='auditorium'>" + shows[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue + "<br><p id='audName'>" +shows[i].getElementsByTagName("TheatreAuditorium")[0].childNodes[0].nodeValue + 
                "</p></td></tr>";
            }
    table1 += "</tbody></table>";
    document.getElementById("data").innerHTML = table1;
    document.getElementById("movietheatre").value = "";
    }
}
