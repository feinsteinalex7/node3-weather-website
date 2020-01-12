console.log("Client side JavaScript file is loaded!");

fetch('http://localhost:3000/weather?address=boston').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data.location, data.forecastData);
        }
    })
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = "";
    messageTwo.textContent = "Loading...";
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = "";
            } else {
                messageOne.textContent = "";
                messageTwo.textContent = data.location + " " + data.forecastData;                
            }
        })
    });
})