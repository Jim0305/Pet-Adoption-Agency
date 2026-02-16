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
