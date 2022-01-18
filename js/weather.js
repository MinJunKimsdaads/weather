let weatherSummary = document.getElementById('weather_summary');
let cityName = document.getElementById('city_name');
let temp = document.getElementById('temp');
let date = document.getElementById('date');
let feelslikeValue=document.getElementById('feelslike_value');
let tempMinValue=document.getElementById('tempmin_value');
let tempMaxValue=document.getElementById('tempmax_value');
let humidityValue=document.getElementById('humidity_value');
let am06 = document.getElementById('am06');
let am12 = document.getElementById('am12');
let pm06 = document.getElementById('pm06');
let pm09 = document.getElementById('pm09');
let am06temp = document.getElementById('am06temp');
let am12temp = document.getElementById('am12temp');
let pm06temp = document.getElementById('pm06temp');
let pm09temp = document.getElementById('pm09temp');

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
function onGeoOk(position){
  const userLat=position.coords.latitude;
  const userLon=position.coords.longitude;
  const keyApi='489ed0b7bc478aa6bbe249e12b428b9a';
  const urlCurrent=`http://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${keyApi}&units=metric`;
  const urlPlan = `http://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLon}&appid=${keyApi}&units=metric`
  console.log(urlCurrent);
  console.log(urlPlan);
  fetch(urlCurrent).then(response => response.json()).then(data=>{
    weatherSummary.innerText=data.weather[0].description;
    cityName.innerText=data.name;
    temp.innerText=data.main.temp+'℃';
    let timeSet = new Date(data.dt*1000);
    date.innerText=timeSet;
    feelslikeValue.innerText=data.main.feels_like+'℃';
    tempMinValue.innerText=data.main.temp_min+'℃';
    tempMaxValue.innerText=data.main.temp_max+'℃';
    humidityValue.innerText=data.main.humidity+'km/h';
  })
  fetch(urlPlan).then(response => response.json()).then(data=>{
    am06temp.innerText=data.list[0].main.temp+'℃';
    am12temp.innerText=data.list[2].main.temp+'℃';
    pm06temp.innerText=data.list[4].main.temp+'℃';
    pm09temp.innerText=data.list[5].main.temp+'℃';
    am06.innerText=data.list[0].dt_txt.substring(11,16);
    am12.innerText=data.list[2].dt_txt.substring(11,16);
    pm06.innerText=data.list[4].dt_txt.substring(11,16);
    pm09.innerText=data.list[5].dt_txt.substring(11,16);
  })
}

function onGeoError(){
  alert('cant workl');
}
