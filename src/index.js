import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

document.querySelector('#search-box').placeholder = 'Search for any country...';



const searchCountry = e => {
    const inputText= searchBox.value.trim();

  fetchCountries(inputText)
    .then(data => {
      countriesData(data);
    })
    .catch(error => {
      if (inputText !== '') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });

  e.preventDefault();
};

function countriesData(data) {
  if (data.length > 10) {
    clearData(countryList);
    clearData(countryInfo);

    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1 && data.length <= 10) {
    clearData(countryList);
    clearData(countryInfo);

    return (countryList.innerHTML = data
      .map(
        item => `
                
                    <li class = 'country'>
                        <img src = '${item.flags.svg}' />
                        <p>${item.name}</p>
                    </li>
                
                `
      )
      .join(''));
  } else {
    clearData(countryList);
    clearData(countryInfo);

    return (countryInfo.innerHTML = data
      .map(
        item => `
                
                    <div class = 'country'>
                    
                        <img src = '${item.flags.svg}' />
    
                        <div class = 'country-body'>
                        
                            <h3>${item.name}</h3>
                            <p><b>Region: </b> ${item.region}</p>
                            <p><b>Capital: </b> ${item.capital}</p>
                            <p><b>Population: </b> ${item.population.toLocaleString()}</p>
                            <p><b>Languages: </b> ${item.languages[0].name}</p>
                        </div>
    
                    </div>
                
                `
      )
      .join(''));
  }
}
 searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function clearData() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

