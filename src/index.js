import 'jquery/dist/jquery.min';
const QRious = require('qrious/dist/qrious');
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './css/meyer-reset.css';
import 'bootstrap/dist/js/bootstrap.min';
import './load-custom-sections';
import { BASE_URL } from './constants';

window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
window.castReceiverManager.start();
window.castReceiverManager.onSenderDisconnected = function (event) {
    if (window.castReceiverManager.getSenders().length == 0 &&
        event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
        window.close();
    }
};

const appConfig = {
    brand: {
        logo: '',
        name: ''
    },
    theme: {

    },
    carouselData: [
        {
            "background": "images/group_309.png",
            "title": "Video on demand and pay per view",
            "description": "Cast movies and other contents on the smart TV using a smartphone </br> or tablet. Hotels can also leverage our rich content catalogue </br> and deliver content to their guest as a value-added service.",
        },

        {
            "background": "images/group_308.png",
            "title": "Turn off the lights, and roll up the curtain",
            "description": "Your guests can control all the in-room devices  using your own branded app.<br/> Controls to the air conditioner, smart lights, window panes,<br/> and other devices are at your guest's fingertips.",
        },
        {
            "background": "images/group_307.png",
            "title": "Support of Things",
            "description": "A command center to track the health of the deployed <br/> smart devices and video content consumption, with an <br/> AI engine for proactive anomaly detection. ",
        },
        {
            "background": "images/group_306.png",
            "title": "Alexa! Turn off the lights",
            "description": "From playing a movie on the TV to controlling the smart devices, <br/> your guest's can do it using voice commands through <br/> Amazon Alexa and Google Home",
        }
    ]
}

$(document).ready(function () {
    if (appConfig.carouselData) {
        for (var i = 0; i < appConfig.carouselData.length; i++) {
            $('<div class="item" style="width: 100%; height:60vh;"><div style=" background-image:url(\'' + String(appConfig.carouselData[i].background) + '\'); width : 100%; height:100%; background-position:center; background-size:cover;"></div><div class="carousel-caption "><h3 class= "caption-heading"> ' + appConfig.carouselData[i].title + '</h3><p class="caption-para">' + appConfig.carouselData[i].description + ' <p></div>   </div>').appendTo('.carousel-inner');
            $('<li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators');

        }
        $('.item').first().addClass('active');
        $('.carousel-indicators > li').first().addClass('active');
        $('#carousel-example-generic').carousel();
    }
});

(function() {
    function fetchRoomInfo() {
        fetch(BASE_URL + 'roominfo')
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                } else {
                    var image = document.getElementById('qr-code');
                    image.src = "placeholder.png";
                    document.getElementById("code-span").textContent = "";
                }
            })
            .then(function (myJson) {
                if (myJson) {
                    const url = new URL(myJson);
                    var qr = new QRious({
                        element: document.getElementById('qr-code'),
                        value: myJson,
                        size: 250,
                    });
                    document.getElementById("room-number").textContent = url.searchParams.get("roomno");
                    document.getElementById("code-span").textContent = "Fill in your room details and enter code: "+ url.searchParams.get("passcode");
                }
            })
            .catch(function (error) {
                console.log("Unable to connect to connect server.")
            });
    }
    fetchRoomInfo();
    window.setInterval(fetchRoomInfo, 10000);
})();
