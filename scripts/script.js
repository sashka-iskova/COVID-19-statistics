const apiURL = 'https://covid-19.dataflowkit.com/v1';
let headers = ['COUNTRY','ACTIVE CASES','NEW CASES','NEW DEATHS', 'TOTAL CASES', 'TOTAL DEATHS','TOTAL RECOVERED']

fetch(apiURL)
.then(response => response.json())
.then(data => {
  let last = data.pop();
  lastUpdate(last);
  let worldStats = data.shift();
  worldStatistics(worldStats);
  createTHead(headers);
  createTBody(data);
})

function lastUpdate(update){
  let span = document.querySelector('.update-date')
  span.innerText = update['Last Update'];
}

function worldStatistics(world){
  let divTitles = document.querySelector('.titles');
  let divStats = document.querySelector('.all-stats');
  let tr = document.createElement('tr');
  let trTitles = document.createElement('tr');
  for(el in world){
     let {
    'Active Cases_text': activeCases,
    'New Cases_text': newCases,
    'New Deaths_text': newDeaths,
    'Total Cases_text': totalCases,
    'Total Deaths_text': totalDeaths,
     'Total Recovered_text': totalRecovered,
   } = world;
    trTitles.innerHTML = `
        <td>ACTIVE CASES</td>
        <td>NEW CASES</td>
        <td>NEW DEATHS</td>
        <td>TOTAL CASES</td>
        <td>TOTAL DEATHS</td>
        <td>TOTAL RECOVERED</td>
        `
    tr.innerHTML = `
        <td class="active-cases-num">${activeCases}</td>
        <td class="new-cases-num">${newCases}</td>
        <td class="new-deaths-num">${newDeaths}</td>
        <td class="total-cases-num">${totalCases}</td>
        <td class="total-deaths-num">${totalDeaths}</td>
        <td class="total-recovered-num">${totalRecovered}</td>
        
   `;
    divTitles.append(trTitles);
    divStats.append(tr);
  }
}

function createTHead(headers){
  let tr = document.querySelector('.headers');
for(let title of headers){
    let td = document.createElement('td');
    td.append(title); 
    tr.appendChild(td);
  }
}
  
function createTBody (data){
  let tbody = document.querySelector('.tbody');
   for(let val of data){
     let tr = document.createElement('tr');
     tr.classList='content';
     let {
    'Active Cases_text': activeCases,
    Country_text: country,
    'New Cases_text': newCases,
    'New Deaths_text': newDeaths,
    'Total Cases_text': totalCases,
    'Total Deaths_text': totalDeaths,
     'Total Recovered_text': totalRecovered,
   } = val;
  tr.innerHTML = `
        <td id="country"">${country}</td>
        <td class="active-cases-num">${activeCases}</td>
         <td class="new-cases-num">${newCases}</td>
         <td class="new-deaths-num">${newDeaths}</td>
        <td class="total-cases-num">${totalCases}</td>
        <td class="total-deaths-num">${totalDeaths}</td>
        <td class="total-recovered-num">${totalRecovered}</td>      
   `;
   tbody.append(tr);
  } 
}
const api_key = "120d135af1d6b49faeb0784d0383cff4";
fetch(`https://gnews.io/api/v4/search?q=covid&token=${api_key}`)
.then(response => response.json())
.then(data =>{
 
  console.log(data.articles)
  createArticles(data.articles)
  
})
function createArticles(data){
  let newsDiv = document.querySelector('.news');
   for(let val of data){
     let div = document.createElement('div');
     div.className ='article'
     let {
      title,
      description,
      url,
      image,
      publishedAt,
      source
      
   } = val;
  
  div.innerHTML = `
    <div class="article-img">
    <img src="${image}" alt="img">
  </div>
  <div class="article-titles">
  <a class="link-style" href="${url}" target="_blank"><p>${title}</p></a>    
  </div>
  <div class="article-description">
    <p>${description}</p>
  </div>
  <div class="published-at">
    <p>${publishedAt}</p>
  </div> 
   <div class="source">
      <p>${source.name} ${source.url}</p>
    </div>       
   `;
   
   newsDiv.append(div);
  } 
}

let input = document.querySelector("#filter-input");
let table = document.getElementById("mainContent");
input.addEventListener('keyup', ()=>{
  let filteredValue = input.value.toUpperCase();
  let txtValue;
  let tr = document.querySelectorAll('.content');
  for(let i = 0; i < tr.length; i++){
    let td = tr[i].getElementsByTagName('td')[0];
if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filteredValue) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      } 
    }
  }
})

