//Event listener using jQuery (select movie theatre)
$("#movietheatre").on('input', function() {
    var val = this.value;
    if ($('#theatres option').filter(function() {
        return this.value.toUpperCase() === val.toUpperCase();
    }).length) {
            //ajax request
            filterMovies(this.value);
        }
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
    $("#movietheatre").select();
    switch ($("#movietheatre").val()) {
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
            var name = $("#movietheatre").val();
            alert ("Teatterissa " + name + " ei mene tänään elokuvia, valitse jokin toinen.");
            $("#movietheatre").val("");

    }
    
    getInfo();
}

//Fetch info from api using jQuery and parse it
function getInfo() {
    if (theatreID != undefined) {
        $("#data").hide();
        var url = "https://www.finnkino.fi/xml/Schedule/?area=" + theatreID;

        $.get(url, function(data) {
            var i;
            var table1= "<table><tbody>";
            var shows = $(data).find("Show");
     // If there's no movies in the selected theatre, alert user
            if (shows.length == 0) {
                alert("Valitussa teatterissa " + theatreName + " ei mene tällä hetkellä elokuvia. Valitse jokin toinen.");
                $("#movietheatre").val("");
                
            } else {   
                for (i = 0; i < shows.length; i++) {
                    var image = "<img id='moviePic' src='" + $(shows[i]).find("EventSmallImagePortrait")[0].childNodes[0].nodeValue + "'></img>";
                    table1 += "<tr><td id='image'>" + image + "</td>" +
                    "<td id='title'>" + $(shows[i]).find("Title")[0].childNodes[0].nodeValue + 
                    "<br>" + "<p id='genre'>" + $(shows[i]).find("Genres")[0].childNodes[0].nodeValue + "</p></td>" +
                    //Format timestamp and punctuation
                    "<td id='showdate'>" + date + "<br>"+ "<p id =time>" + $(shows[i]).find("dttmShowStart")[0].childNodes[0].nodeValue.slice(11,16).replace(":", ".") + "</p></td>" +
                    "<td id='auditorium'>" + $(shows[i]).find("Theatre")[0].childNodes[0].nodeValue + "<br><p id='audName'>" + $(shows[i]).find("TheatreAuditorium")[0].childNodes[0].nodeValue + 
                    "</p></td></tr>";
                }
        table1 += "</tbody></table>";
        $("#data").html(table1);
        $("#data").slideDown(2200);

            }
            $("#movietheatre").val("");
    });
    }
}
