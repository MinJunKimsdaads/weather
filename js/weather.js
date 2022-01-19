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
let dailyDate=document.getElementsByClassName('daily_date');
let dailyTemp=document.getElementsByClassName('daily_temp');
let dailyIcon=document.getElementsByClassName('daily_icon');
let gettime=document.getElementById('time');

setInterval(function(){
  let today = new Date();
  let nowMonth = today.getMonth()+1,
  nowDate = today.getDate(),
  nowHours = today.getHours(),
  nowMinutes = today.getMinutes(),
  nowSecondes = today.getSeconds();
  // gettime.innerText=nowHours+':'+nowMinutes+':'+nowSecondes;

  gettime.innerHTML = `${nowHours<10 ? `0${nowHours}`:nowHours}:${nowMinutes<10 ? `0${nowMinutes}`:nowMinutes}:${nowSecondes<10 ? `0${nowSecondes}`:nowSecondes}`
},1000);

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
function onGeoOk(position){
  const userLat=position.coords.latitude;
  const userLon=position.coords.longitude;
  const keyApi='489ed0b7bc478aa6bbe249e12b428b9a';
  const urlCurrent=`http://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${keyApi}&units=metric`;
  const urlPlan = `http://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLon}&appid=${keyApi}&units=metric`;
  const geourl = `http://api.openweathermap.org/geo/1.0/direct?q=Seoul,KR&limit=5&appid=${keyApi}`;
  
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
    dailyDate[0].innerText=data.list[9].dt_txt.substring(5,10);
    dailyDate[1].innerText=data.list[17].dt_txt.substring(5,10);
    dailyDate[2].innerText=data.list[25].dt_txt.substring(5,10);
    dailyDate[3].innerText=data.list[33].dt_txt.substring(5,10);
    dailyDate[4].innerText=data.list[39].dt_txt.substring(5,10);
    dailyTemp[0].innerText=data.list[9].main.temp+'℃';
    dailyTemp[1].innerText=data.list[17].main.temp+'℃';
    dailyTemp[2].innerText=data.list[25].main.temp+'℃';
    dailyTemp[3].innerText=data.list[33].main.temp+'℃';
    dailyTemp[4].innerText=data.list[39].main.temp+'℃';
    for(var i=0;i<5;i++){
      let icon = data.list[8*i+7].weather[0].main;
      if(icon.indexOf('Snow')!==-1){
        dailyIcon[i].innerHTML='<i class="fas fa-snowflake"></i>';
      } else if(icon.indexOf('Cloud')!==-1){
        dailyIcon[i].innerHTML='<i class="fas fa-cloud"></i>';
      } else if(icon.indexOf('Rain')!==-1){
        dailyIcon[i].innerHTML='<i class="fas fa-cloud-showers-heavy"></i>';
      } else {
        dailyIcon[i].innerHTML='<i class="fas fa-sun"></i>';
      }
    }
    // console.log(data.list[9].weather[0].main.match('Snow'));
  })
}

function onGeoError(){
  alert('cant workl');
}

function test() {
  weatherSummary.innerText='dassdd'
}

function test2(){
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
}
var otherPosition=[];

async function otherCity() {
  let cityName = document.getElementById('searchcity').value;
  const keyApi1='489ed0b7bc478aa6bbe249e12b428b9a';
  const geourl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},KR&limit=5&appid=${keyApi1}`;
  await fetch(geourl).then(response => response.json()).then(data=>{
    latSelected = data[0].lat;
    otherPosition.splice(0,2,latSelected);
    lonSelected = data[0].lon;
    otherPosition.push(lonSelected);
  })
  // console.log(otherPosition);
  otherCityWeather();
}

async function otherCityWeather(){
  const keyApi2='489ed0b7bc478aa6bbe249e12b428b9a';
  const urlCurrent1=`http://api.openweathermap.org/data/2.5/weather?lat=${otherPosition[0]}&lon=${otherPosition[1]}&appid=${keyApi2}&units=metric`;
  const urlPlan1 = `http://api.openweathermap.org/data/2.5/forecast?lat=${otherPosition[0]}&lon=${otherPosition[1]}&appid=${keyApi2}&units=metric`;
  await fetch(urlCurrent1).then(response => response.json()).then(data=>{
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
  await fetch(urlPlan1).then(response => response.json()).then(data=>{
    am06temp.innerText=data.list[0].main.temp+'℃';
    am12temp.innerText=data.list[2].main.temp+'℃';
    pm06temp.innerText=data.list[4].main.temp+'℃';
    pm09temp.innerText=data.list[5].main.temp+'℃';
    am06.innerText=data.list[0].dt_txt.substring(11,16);
    am12.innerText=data.list[2].dt_txt.substring(11,16);
    pm06.innerText=data.list[4].dt_txt.substring(11,16);
    pm09.innerText=data.list[5].dt_txt.substring(11,16);
    dailyDate[0].innerText=data.list[9].dt_txt.substring(5,10);
    dailyDate[1].innerText=data.list[17].dt_txt.substring(5,10);
    dailyDate[2].innerText=data.list[25].dt_txt.substring(5,10);
    dailyDate[3].innerText=data.list[33].dt_txt.substring(5,10);
    dailyDate[4].innerText=data.list[39].dt_txt.substring(5,10);
    dailyTemp[0].innerText=data.list[9].main.temp+'℃';
    dailyTemp[1].innerText=data.list[17].main.temp+'℃';
    dailyTemp[2].innerText=data.list[25].main.temp+'℃';
    dailyTemp[3].innerText=data.list[33].main.temp+'℃';
    dailyTemp[4].innerText=data.list[39].main.temp+'℃';
    for(var i=0;i<5;i++){
      let icon = data.list[8*i+7].weather[0].main;
      if(icon.indexOf('Snow')!==-1){
        dailyIcon[i].innerHTML='<i class="fas fa-snowflake"></i>';
      } else if(icon.indexOf('Cloud')!==-1){
        dailyIcon[i].innerHTML='<i class="fas fa-cloud"></i>';
      } else if(icon.indexOf('Rain')!==-1){
        dailyIcon[i].innerHTML='<i class="fas fa-cloud-showers-heavy"></i>';
      } else {
        dailyIcon[i].innerHTML='<i class="fas fa-sun"></i>';
      }
    }
  })
}




