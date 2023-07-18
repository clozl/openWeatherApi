
$(document).ready(function() {
    
})

let cityList=[
    {"cityKor":"서울", "cityEng":"Seoul"},
    {"cityKor":"대전", "cityEng":"Daejeon"},
    {"cityKor":"대구", "cityEng":"Daegu"},
    {"cityKor":"부산", "cityEng":"Busan"},
    {"cityKor":"울산", "cityEng":"Ulsan"}
]


let city="";
$("svg path").text('');
function searchWeather() {
    if(city==='') {
        alert('도시를 입력하세요')
    }
    $.ajax({
        url:`https://api.openweathermap.org/data/2.5/weather?q=${city},kor&APPID=...`,
        method:'GET',
        dataType:'json'
    }).done(function(response){
        console.log(response)
        console.log(response.main.temp)
        var cel=response.main.temp-273.15
        cel=cel.toFixed(1)
        $("#temp").text(cel+"°")

        const $Icon = (response.weather[0].icon).substr(0,2);
        const feels_like=(response.main.feels_like-273.15).toFixed(1)
        const humidity=response.main.humidity
        const speed=response.wind.speed

       $("#weather-img").attr('src', 'http://openweathermap.org/img/wn/' + $Icon+ 'd@2x.png')
        $("#feels-like>b").text(feels_like+"℃")
        $("#humidity>b").text(humidity+"%")
        $("#wind>b").text(speed+'m/s')
    })
    }

function inputWeather() {
    console.log('inputWeather')
    var inputVal = $("#city").val()
    console.log(inputVal)

    for(var i=0; i<cityList.length; i++) {
        if(cityList[i].cityKor==inputVal) {
            city=cityList[i].cityEng
            console.log(city)
            break;
        }
    }
}

function keyPress() {
    if(window.keyCode===13) {
        searchWeather()
    }
}