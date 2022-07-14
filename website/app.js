/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '4100c6a84ef33735b7128664c8d63f01';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
const halfUrl = '&units=imperial&appid='+apiKey;
const zip = document.querySelector('#zip');
const generate = document.getElementById('generate');
const feeling = document.getElementById('feelings');
const showTemp = document.getElementById('temp');
const showDate = document.getElementById('date');
const showFeeling = document.getElementById('content');

// async Function to send data to POST Route
const postData = async(url = '',
data = {}) =>{
  console.log(data);
  const response = await fetch (url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log('Response Data', newData);
    return newData
  }catch(error){
    console.log('error', error);
  }
}

// async Function to update UI elements
const updateUI = async ()=>{
  const res = await fetch('/getdata');
  const alldata = await res.json();
  showTemp.innerText = alldata.mytemp;
  showDate.innerText = alldata.mydate;
  showFeeling.innerText = alldata.myfeeling;
}

// async Function to fetch URL after Inputing zipCode
async function weather(){
  const zipCode = zip.value;
  const requestUrl = `${baseUrl}${zipCode}${halfUrl}`;
  const res = await fetch(requestUrl);
  const data = await res.json();
  const temp = data.main.temp;
  
  // Create a new date instance dynamically with JS
  let d = new Date();
  let newDate = (d.getMonth()+1) +'/'+ d.getDate()+'/'+ d.getFullYear();
  const myData = {mytemp: temp, myfeeling: feeling.value, mydate: newDate};
  const resp = await postData('/postdata', myData);
  await updateUI();

}

// Adding data from the Button
generate.addEventListener('click', weather);