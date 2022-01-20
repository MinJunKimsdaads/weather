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
let bg =document.getElementById('wrap');

setInterval(function(){
  let today = new Date();
  let nowMonth = today.getMonth()+1,
  nowDate = today.getDate(),
  nowHours = today.getHours(),
  nowMinutes = today.getMinutes(),
  nowSecondes = today.getSeconds();
  // gettime.innerText=nowHours+':'+nowMinutes+':'+nowSecondes;
  gettime.innerHTML = `${nowHours<10 ? `0${nowHours}`:nowHours}:${nowMinutes<10 ? `0${nowMinutes}`:nowMinutes}:${nowSecondes<10 ? `0${nowSecondes}`:nowSecondes}`;
},1000);

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
function onGeoOk(position){
  const userLat=position.coords.latitude;
  const userLon=position.coords.longitude;
  function _0x23dc(_0x1971ed,_0x54f531){const _0x1288c1=_0x1288();return _0x23dc=function(_0x23dc01,_0x30d789){_0x23dc01=_0x23dc01-0xeb;let _0x468302=_0x1288c1[_0x23dc01];return _0x468302;},_0x23dc(_0x1971ed,_0x54f531);}const _0x307339=_0x23dc;function _0x1288(){const _0x3f6b87=['2221520gQGFEN','466yTdysy','188850xWlbqf','1865555neQgIz','489ed0b7bc478aa6bbe249e12b428b9a','14211yaLVHH','1803qjmodm','2444754pvGHuV','4264plIliv','1155588BXmhIW'];_0x1288=function(){return _0x3f6b87;};return _0x1288();}(function(_0x4ddaf6,_0x2bc7a4){const _0x332444=_0x23dc,_0x51ae1d=_0x4ddaf6();while(!![]){try{const _0x2ae4d7=parseInt(_0x332444(0xee))/0x1+-parseInt(_0x332444(0xed))/0x2*(-parseInt(_0x332444(0xf2))/0x3)+parseInt(_0x332444(0xeb))/0x4+parseInt(_0x332444(0xef))/0x5+parseInt(_0x332444(0xf3))/0x6+-parseInt(_0x332444(0xec))/0x7+-parseInt(_0x332444(0xf4))/0x8*(parseInt(_0x332444(0xf1))/0x9);if(_0x2ae4d7===_0x2bc7a4)break;else _0x51ae1d['push'](_0x51ae1d['shift']());}catch(_0x36ca62){_0x51ae1d['push'](_0x51ae1d['shift']());}}}(_0x1288,0x3a717));const keyApi=_0x307339(0xf0);
  const urlCurrent=`http://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${keyApi}&units=metric`;
  const urlPlan = `http://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLon}&appid=${keyApi}&units=metric`;
  const geourl = `http://api.openweathermap.org/geo/1.0/direct?q=Seoul,KR&limit=5&appid=${keyApi}`;
  
  fetch(urlCurrent).then(response => response.json()).then(data=>{
    const WeatherDescription = data.weather[0].description;
    weatherSummary.innerText=data.weather[0].description;
    cityName.innerText=data.name;
    temp.innerText=data.main.temp+'℃';
    let timeSet = new Date(data.dt*1000);
    date.innerText=timeSet;
    feelslikeValue.innerText=data.main.feels_like+'℃';
    tempMinValue.innerText=data.main.temp_min+'℃';
    tempMaxValue.innerText=data.main.temp_max+'℃';
    humidityValue.innerText=data.main.humidity+'km/h';
    // console.log(timeSet.getHours());
    // console.log(WeatherDescription.search('clear'));

    //아침 & clear
    if(timeSet.getHours()<18&&WeatherDescription.search('clear')!=-1){
      bg.style.backgroundImage="url('../weather/img/sun_morning.gif')";
    //저녁 & clear
    } else if(timeSet.getHours()>18&&WeatherDescription.search('clear')!=-1) {
      bg.style.backgroundImage="url('../weather/img/sun_night.gif')";
    //아침 & cloud
    } else if(timeSet.getHours()<18&&WeatherDescription.search('cloud')!=-1){
      bg.style.backgroundImage="url('../weather/img/cloud_morning.gif')";
    //저녁 & cloud
    } else if(timeSet.getHours()>18&&WeatherDescription.search('cloud')!=-1){
      bg.style.backgroundImage="url('../weather/img/cloud_night.gif')";
    //아침 & rain
    } else if(timeSet.getHours()<18&&WeatherDescription.search('rain')!=-1){
      bg.style.backgroundImage="url('../weather/img/rain_morning.gif')";
    //저녁 & rain
    } else if(timeSet.getHours()>18&&WeatherDescription.search('rain')!=-1){
      bg.style.backgroundImage="url('../weather/img/rain_night.gif')";
    //아침 & snow
    } else if(timeSet.getHours()<18&&WeatherDescription.search('snow')!=-1){
      bg.style.backgroundImage="url('../weather/img/snow_morning.gif')";
    //저녁 & snow
    } else if(timeSet.getHours()>18&&WeatherDescription.search('snow')!=-1){
      bg.style.backgroundImage="url('../weather/img/snow_morning.gif')";
    }

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
  function _0x1ef8(_0x5d0d4b,_0x462d81){const _0x51a1f6=_0x51a1();return _0x1ef8=function(_0x1ef859,_0x33c63e){_0x1ef859=_0x1ef859-0xbd;let _0x2bab39=_0x51a1f6[_0x1ef859];return _0x2bab39;},_0x1ef8(_0x5d0d4b,_0x462d81);}function _0x51a1(){const _0x1662a0=['20083kNBWQP','2600EcBdxc','323835AprSUA','967430vUPpmb','88JlHBPN','15059KTwrVF','4picuNc','58430gfGBOr','138iEIslM','489ed0b7bc478aa6bbe249e12b428b9a','792rOVRmP','12504iDljYq','5895ApqtKR'];_0x51a1=function(){return _0x1662a0;};return _0x51a1();}const _0x30874d=_0x1ef8;(function(_0x45026,_0x255492){const _0x345379=_0x1ef8,_0x35deba=_0x45026();while(!![]){try{const _0x4a457a=-parseInt(_0x345379(0xc9))/0x1*(parseInt(_0x345379(0xbd))/0x2)+parseInt(_0x345379(0xc6))/0x3+-parseInt(_0x345379(0xc8))/0x4*(parseInt(_0x345379(0xbe))/0x5)+parseInt(_0x345379(0xbf))/0x6*(-parseInt(_0x345379(0xc4))/0x7)+-parseInt(_0x345379(0xc5))/0x8*(-parseInt(_0x345379(0xc3))/0x9)+parseInt(_0x345379(0xc7))/0xa+-parseInt(_0x345379(0xc1))/0xb*(-parseInt(_0x345379(0xc2))/0xc);if(_0x4a457a===_0x255492)break;else _0x35deba['push'](_0x35deba['shift']());}catch(_0x141732){_0x35deba['push'](_0x35deba['shift']());}}}(_0x51a1,0x2207e));const keyApi1=_0x30874d(0xc0);
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
  function _0x1a18(_0x3be875,_0x4181ad){const _0x1d1164=_0x1d11();return _0x1a18=function(_0x1a1813,_0x4dc969){_0x1a1813=_0x1a1813-0xdd;let _0x1a05f7=_0x1d1164[_0x1a1813];return _0x1a05f7;},_0x1a18(_0x3be875,_0x4181ad);}const _0x275ef4=_0x1a18;(function(_0x2555b8,_0x2ae062){const _0x10d385=_0x1a18,_0x264ca3=_0x2555b8();while(!![]){try{const _0x4785e4=-parseInt(_0x10d385(0xdf))/0x1*(parseInt(_0x10d385(0xe7))/0x2)+parseInt(_0x10d385(0xe4))/0x3+parseInt(_0x10d385(0xe1))/0x4*(parseInt(_0x10d385(0xe6))/0x5)+parseInt(_0x10d385(0xe3))/0x6+-parseInt(_0x10d385(0xe2))/0x7*(-parseInt(_0x10d385(0xe8))/0x8)+parseInt(_0x10d385(0xe5))/0x9+-parseInt(_0x10d385(0xde))/0xa*(parseInt(_0x10d385(0xe0))/0xb);if(_0x4785e4===_0x2ae062)break;else _0x264ca3['push'](_0x264ca3['shift']());}catch(_0x550ad0){_0x264ca3['push'](_0x264ca3['shift']());}}}(_0x1d11,0xa9f92));function _0x1d11(){const _0x2f133f=['10XSnCqk','556030Tppdrn','21598181KUWYch','31120SjhYhU','265699GFmqMv','1788762DtLKVH','3974109KyvJLz','6724962asyTHR','80swKFLk','2LjdFMw','152BiSYPv','489ed0b7bc478aa6bbe249e12b428b9a'];_0x1d11=function(){return _0x2f133f;};return _0x1d11();}const keyApi2=_0x275ef4(0xdd);
  const urlCurrent1=`http://api.openweathermap.org/data/2.5/weather?lat=${otherPosition[0]}&lon=${otherPosition[1]}&appid=${keyApi2}&units=metric`;
  const urlPlan1 = `http://api.openweathermap.org/data/2.5/forecast?lat=${otherPosition[0]}&lon=${otherPosition[1]}&appid=${keyApi2}&units=metric`;
  await fetch(urlCurrent1).then(response => response.json()).then(data=>{
    const WeatherDescription = data.weather[0].description;
    weatherSummary.innerText=data.weather[0].description;
    cityName.innerText=data.name;
    temp.innerText=data.main.temp+'℃';
    let timeSet = new Date(data.dt*1000);
    date.innerText=timeSet
    feelslikeValue.innerText=data.main.feels_like+'℃';
    tempMinValue.innerText=data.main.temp_min+'℃';
    tempMaxValue.innerText=data.main.temp_max+'℃';
    humidityValue.innerText=data.main.humidity+'km/h';

    if(timeSet.getHours()<18&&WeatherDescription.search('clear')!=-1){
      bg.style.backgroundImage="url('../weather/img/sun_morning.gif')";
    //저녁 & clear
    } else if(timeSet.getHours()>18&&WeatherDescription.search('clear')!=-1) {
      bg.style.backgroundImage="url('../weather/img/sun_night.gif')";
    //아침 & cloud
    } else if(timeSet.getHours()<18&&WeatherDescription.search('cloud')!=-1){
      bg.style.backgroundImage="url('../weather/img/cloud_morning.gif')";
    //저녁 & cloud
    } else if(timeSet.getHours()>18&&WeatherDescription.search('cloud')!=-1){
      bg.style.backgroundImage="url('../weather/img/cloud_night.gif')";
    //아침 & rain
    } else if(timeSet.getHours()<18&&WeatherDescription.search('rain')!=-1){
      bg.style.backgroundImage="url('../weather/img/rain_morning.gif')";
    //저녁 & rain
    } else if(timeSet.getHours()>18&&WeatherDescription.search('rain')!=-1){
      bg.style.backgroundImage="url('../weather/img/rain_night.gif')";
    //아침 & snow
    } else if(timeSet.getHours()<18&&WeatherDescription.search('snow')!=-1){
      bg.style.backgroundImage="url('../weather/img/snow_morning.gif')";
    //저녁 & snow
    } else if(timeSet.getHours()>18&&WeatherDescription.search('snow')!=-1){
      bg.style.backgroundImage="url('../weather/img/snow_morning.gif')";
    }
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





