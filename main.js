const url = 'https://api.weather.gov/gridpoints/MFL/110,50/forecast';
async function getData() {
  try {
    const response = await fetch(url);
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

getData();
