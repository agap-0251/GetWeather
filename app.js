// api key = 901cb749b9c44857b0e85731230902
const app = document.querySelector('body');
const timeAt = document.querySelector('.time');
const inField = document.querySelector('#search');
const btn = document.querySelector('.fa-search');
const cityName = document.querySelector('.city-name');
const temp = document.querySelector('.temp');
const type = document.querySelector('.type');
const cloud = document.querySelector('.cloudy-v');
const humid = document.querySelector('.humid-v');
const wind = document.querySelector('.wind-v');
const iconSet = document.querySelector('#iconI');
const cityList = document.querySelectorAll('.city');

//temp location
inField.value = "Mumbai";
fetchData();

cityList.forEach(c => {
  c.addEventListener('click',()=>{
    inField.value = c.innerText;
    fetchData();
  })
}); 

function getDayOfWeek(day,month,year) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
  return days[new Date(`${year},${month},${day}`).getDay()];
}

function checkDay(res) {
  return (res.current.is_day === 0)?"night":"day";
}

function  backGChange(res) {
  let isDay = res.current.is_day;
  let imgSpec = checkDay(res);
  let code = res.current.condition.code;
  //clear code
  if(code === 1000) {
      app.style.backgroundImage = `url(./images/${imgSpec}/${imgSpec}.jpg)`;   
  }
  //cloud code
  else if(code === 1003 ||
    code === 1006 ||
    code === 1009 ||
    code === 1030 ||
    code === 1069 ||
    code === 1087 ||
    code === 1135 ||
    code === 1273 ||
    code === 1276 ||
    code === 1279 ||
    code === 1282
    ) {
      app.style.backgroundImage =  `url(./images/${imgSpec}/${imgSpec}Clouds.jpg)`;
    }
    //rain code
    else if(code === 1063 ||
      code === 1069 ||
      code === 1072 ||
      code === 1150 ||
      code === 1180 ||
      code === 1183 ||
      code === 1153 ||
      code === 1186 ||
      code === 1189 ||
      code === 1192 ||
      code === 1195 ||
      code === 1204 ||
      code === 1207 ||
      code === 1240 ||
      code === 1243 ||
      code === 1246 ||
      code === 1249 ||
      code === 1252
      ) {
        app.style.backgroundImage =  `url(./images/${imgSpec}/${imgSpec}Rain.jpg)`;
      }
      //else snow
      else {
        app.style.backgroundImage =  `url(./images/${imgSpec}/${imgSpec}Snow.jpg)`;
      }
}

function assignVal(report) {
  backGChange(report);
  let localTime = report.location.localtime;
  const year = localTime.split("-")[0];
  const month = localTime.split("-")[1]
  const dateDay = localTime.split("-")[2].substr(0,2);
  const time = localTime.split(" ")[1];
  const weekday = getDayOfWeek(dateDay,month,year);
  timeAt.innerHTML = `${time}<span> - </span><span class = 'data'>${weekday}  ${dateDay} , ${month}  ${year}</span>`;
  cityName.innerText = inField.value;
  temp.innerHTML = `${report.current.temp_c}&#176;`
  type.innerText = report.current.condition.text;
  cloud.innerText = `${report.current.cloud}%`;
  humid.innerText = `${report.current.humidity}%`;
  wind.innerText = `${report.current.wind_kph}Kmph`;
  iconSet.src = report.current.condition.icon;
}

btn.addEventListener('click',(e)=>{
  e.preventDefault();
  fetchData();
})

function fetchData() {
    const url = `https://api.weatherapi.com/v1/current.json?key=${YourKey}&q=${inField.value}&aqi=no`
    if(inField.value != null) {
      fetch(url)
      .then(res => res.json())
      .then(data =>assignVal(data))
    }
}
