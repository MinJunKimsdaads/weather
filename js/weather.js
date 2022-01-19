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

function otherCity() {
  let cityName = '서울'
  const keyApi='09A376B6-886C-3877-8D72-B59F5AE68017'
  const url1=`http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${cityName}&refine=true&simple=false&format=json&type=road&key=${keyApi}`
  console.log(url1);
  // fetch(url1).then(response => response.json()).then(data=>{
  //   console.log(data.response)
  // })

  // fetch(url1)
  //   .then((response)=>{
  //     if(response.ok){
  //       return response.json();
  //     }
  //     throw new Error('Network response was not ok.');
  //   }).then((data)=>{
  //     console.log(JSON.stringify(data));
  //   }).catch((error)=>{
  //     console.log(`error:${error}`)
  //   })

      async function geocoding(url) {
        const req = await fetch(url);
        return req.json();
    }
    async function doGeocoding(address) {
        const result = await geocoding(url1);
        console.log(result);
    }
    doGeocoding('서울시 성동구 아차산로7나길 18');
}

// fetch()
// .then((response)=>{
//   if(response.ok){
//     return response.json();
//   }
//   throw new Error('Network response was not ok.');
// }).then((data)=>{
//   console.log(JSON.stringify(data));
// }).catch((error)=>{
//   console.log(`error:${error}`)
// })
  

function test() {
  weatherSummary.innerText='dassdd'
}

function test2(){
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
}


