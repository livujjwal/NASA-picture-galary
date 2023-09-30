console.log("high");
const api_key = "3fOse4Vn81NxYUPwMF9l8V9qBWQBTtNNEbH3LcLV";
const card = document.getElementById("current-image-container");
const btn = document.getElementById("btn");
const history = document.getElementById("search-history");

//getCurrentImageOfTheDay
async function getCurrentImageOfTheDay() {
  const date = new Date();
  const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  console.log(today);
  const url = `https://api.nasa.gov/planetary/apod?date=${today}&api_key=${api_key}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  card.innerHTML = `<h1 id="hero_header">NASA Picture of the Day</h1>
    <img id="hero_img" src=${data.hdurl} alt="${date.title}">
    <h2 id="hero_title">${data.title}</h2>
    <p id="hero_para">${data.explanation}</p>`;
  saveSearch(today);
}
getCurrentImageOfTheDay();

//getImageOfTheDay
async function getImageOfTheDay(event) {
  event.preventDefault();

  const date = document.getElementById("search-input").value;
  console.log(date);
  const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  card.innerHTML = `<h1 id="hero_header">NASA On ${date}</h1>
    <img id="hero_img" src=${data.hdurl} alt="${data.title}">
    <h2 id="hero_title">${data.title}</h2>
    <p id="hero_para">${data.explanation}</p>`;
  saveSearch(date);
}
btn.addEventListener("click", getImageOfTheDay);

//saveSearch
const dateArray =[];
 function saveSearch(date) {
    if(dateArray.length == 0){
        dateArray.push({ Date: date });
    }else{
                dateArray.push({ Date: date });
    }
  const dateString = JSON.stringify(dateArray);
  localStorage.setItem("search", dateString);
  addSearchToHistory(date);
}
//addSearchToHistory
async function addSearchToHistory(date) {
    history.innerHTML = '';
  const dateString = await localStorage.getItem("search");
  const dateArr = JSON.parse(dateString);
  console.log(dateArr);
  dateArr.forEach((element) => {
    const list = document.createElement("li");
    list.innerHTML = `
    <a href="">${element.Date}</a>`;
    history.append(list);
  });
}
