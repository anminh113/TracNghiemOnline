
//    function countDown(secs,elem) {
// 	var element = document.getElementById(elem);
// 	element.innerHTML = "Please wait for "+secs+" seconds";
// 	if(secs < 1) {
//         clearTimeout(timer);
//     element.innerHTML = '<h2>Countdown Complete!</h2>';
//         element.innerHTML += '<a href="#">Click here now</a>';
//         function Redirect() {
//             window.location.replace("index");
//          }
//     }
// secs--;
// var timer = setTimeout('countDown('+secs+',"'+elem+'")',1000);
// }

// Set the date we're counting down to
var countDownDate = new Date("May 25, 2018 23:25:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("status").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("status").innerHTML = "EXPIRED";
    }
}, 1000);
