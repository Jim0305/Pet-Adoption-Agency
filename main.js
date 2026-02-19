const template = document.querySelector('#pet-card-template');
const wrapper = document.createDocumentFragment();

const weatherUrl = 'https://api.weather.gov/gridpoints/MFL/110,50/forecast';

async function getWeather() {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    if (response.status === 200) {
      console.log('Success', data);
      const temperature = data.properties.periods[0].temperature;
      document.querySelector('#temperatureOutput').textContent = temperature;
    } else {
      console.log('Server Error', data.error.message);
    }
  } catch (error) {
    console.log('Fetch Error', error);
  }
}

getWeather();

async function petsArea() {
  try {
    const petsPromise = await fetch(
      'https://learnwebcode.github.io/bootcamp-pet-data/pets.json',
    );
    const petsData = await petsPromise.json();
    if (petsPromise.status === 200) {
      console.log('Success', petsData);
      petsData.forEach((pet) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.pet-card').dataset.species = pet.species;
        clone.querySelector('h3').textContent = pet.name;
        clone.querySelector('.pet-description').textContent = pet.description;
        clone.querySelector('.pet-age').textContent = createAgeText(
          pet.birthYear,
        );
        if (!pet.photo) pet.photo = 'images/fallback.jpg';
        clone.querySelector('.pet-card-photo img').src = pet.photo;
        clone.querySelector('.pet-card-photo img').alt =
          `A ${pet.species} named ${pet.name}`;
        wrapper.appendChild(clone);
      });
      document.querySelector('.list-of-pets').appendChild(wrapper);
    } else {
      console.log('Server Error', petsData.error.message);
    }
  } catch (error) {
    console.log('Fetch Error', error);
  }
}

petsArea();

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  if (age === 1) return '1 year old';
  if (age === 0) return 'Less than a year old';
  return `${age} years old`;
}

// pet filter buttons
const allButtons = document.querySelectorAll('.pet-filter button');
allButtons.forEach((btn) => {
  btn.addEventListener('click', handleBtnClick);
});

function handleBtnClick(e) {
  // remove active class
  allButtons.forEach((btn) => btn.classList.remove('active'));
  // add active class to btn clicked on
  e.target.classList.add('active');
  // filter the pets
  const currentFilter = e.target.dataset.filter;
  document.querySelectorAll('.pet-card').forEach((card) => {
    if (currentFilter == card.dataset.species || currentFilter == 'all') {
      card.style.display = 'grid';
    } else {
      card.style.display = 'none';
    }
  });
}
