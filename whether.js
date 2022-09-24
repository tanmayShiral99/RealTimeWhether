const SubmitNow = document.getElementById("submitForm");
const result = document.getElementById("result");

const cityname = document.getElementById("cityName");
const temperature = document.getElementById("temp");
const status = document.getElementById("stat");
const latu = document.getElementById("lati");
const longu = document.getElementById("longi");
const MAX_TEMP = document.getElementById("max-Temp");
const MIN_TEMP = document.getElementById("min-Temp");
const HUMI = document.getElementById("humid");
const HUMIDITY = document.getElementById("humid");
const PRESSURE = document.getElementById("press");
const COUNTRY = document.getElementById("coun");

SubmitNow.addEventListener("click", async (event) => {
  await start(event);
});

async function start(event) {
  event.preventDefault();
  let city = cityname.value;
  if (city === "") {
    result.innerText = `Enter City Name before Search`;
  } else {
    try {
      //Getting the coordinates of entered location
      let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=141c13dc2f62749479af077a39b9a7de`;
      const laton = await fetch(url);
      let data = await laton.json();
      let lati = data[0].lat;
      let long = data[0].lon;
      let country = data[0].country;

      //Getting the Temperature of Entered Location based on latitude and longitude
      let wheurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=141c13dc2f62749479af077a39b9a7de`;
      const infoAboutWhether = await fetch(wheurl);
      let DataAboutTemp = await infoAboutWhether.json();
      let TempAr = [DataAboutTemp];

      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const d = new Date();
      let day = weekday[d.getDay()];
      const DAY = document.getElementById("day");
      DAY.innerText = `Today is ${day}`;

      // let Temperature =DataAboutTemp[0].main.temp;
      // console.log(Temperature);
      result.classList.add("results");
      latu.innerText = `The Latitude of ${city} is ${lati}`;
      longu.innerText = `The Longitude of ${city} is ${long}`;
      COUNTRY.innerText = `The Country is ${country}`;
      MAX_TEMP.innerText = ` The maximum Temperature is ${TempAr[0].main.temp_max}`;
      MIN_TEMP.innerText = ` The minimum Temperature is ${TempAr[0].main.temp_min}`;
      HUMIDITY.innerText = `The Humidity is ${TempAr[0].main.humidity}%`;
      PRESSURE.innerText = ` The Pressure is ${TempAr[0].main.pressure}mb`;
    } catch (error) {
      result.classList.remove("results");
      console.log(error);
      result.innerText = `Wrong City Name Enter City Name Properly and try again`;
      result.classList.add("err");
      await start(event);
    }
  }
}
