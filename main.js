const key ="946a14d430d42d71c82534fb9f8a8b32";
const formEl =document.querySelector("form");
const details = document.querySelector(".details");

formEl.addEventListener("submit",(e) =>{
    e.preventDefault();
    details.innerHTML = `<h1>Loading...</h1>`;
    const location = e.target.location.value;
    wheatherApp(location);
});

async function wheatherApp(location){
  const data =await fetchAPI(location);
  generateHTML(data);

}

async function fetchAPI(location){
    const baseURL = `http://api.weatherstack.com/current?access_key=${key}&query=${location}`;
    const res = await fetch(baseURL);
    const data = await res.json();
    console.log(data);

    return data;
}

function generateHTML(data){

   const html = ` <h1 class="temp">${data.current.temperature}°c</h1>
   <h1 class="status">${data.current.weather_descriptions.map(item => item).join(" ")}</h1>
   <div class="more-info">
      <p>Hour- ${data.current.observation_time}</p>
       <p>Humidity- ${data.current.humidity}%</p>
       <p>Wind Speed- ${data.current.wind_speed}km/h</p>
       <p>Precipitation- ${data.current.precip}</p>
       <p>Presure- ${data.current.pressure}MB</p>
   </div>
   <p>Location- ${data.request.query}</p>`
   ;
   details.innerHTML = html;
}
