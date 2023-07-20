import { r as registerInstance, h, g as getElement } from './index-8772a97a.js';

const AV_API_KEY = '52d75f6c17b0457e88d144124231207';

const weatherCompCss = "aside{position:fixed;top:0;left:-100%;width:40rem;max-width:70%;color:#fff;background-color:#333;box-shadow:10px -2px 20px 2px rgb(0 0 0 / 30%);transition:left 0.3s ease-out;z-index:100;margin:20px auto;padding:0 20px 20px 20px;border-radius:6px}aside h1{font-size:1.5rem;color:#fff;margin-top:1rem;margin-bottom:0.5rem}aside.expanded{top:50%;left:50%;transform:translate(-50%, -50%);max-height:calc(100vh - 40px);overflow-y:auto}.input-container{margin-top:0.6rem}.container{display:flex;flex-wrap:wrap;justify-content:flex-start}.box{flex:0 0 calc(33% - 1.5rem);margin-bottom:1.5rem;margin-right:1.2rem;background-color:lightblue;color:black;border:1px solid gray;padding:1rem;border-radius:6px}.location{display:grid;grid-template-columns:auto;align-items:center}.info{grid-column:1}.location img{grid-column:2}header{padding:1rem;background-color:lightblue;position:relative;border:1px solid gray;border-radius:6px}header h1{font-size:1.5rem;color:black;margin:0}header button{position:absolute;top:0;right:0;padding:1rem;padding:0.5rem 1rem;color:#fff;background-color:#ff0000;border:none;font-size:1.2rem;border-radius:4px;cursor:pointer;transition:background-color 0.3s ease}header button:hover{background-color:#cc0000}:host([visible]) aside{left:50%;top:50%;transform:translate(-50%, -50%)}.backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;background-color:rgba(0, 0, 0, 0.75);z-index:10;opacity:0;pointer-events:none;transition:opacity 0.3s ease-out}:host([visible]) .backdrop{opacity:1;pointer-events:all}form button:disabled{background-color:#ccc;border-color:#ccc;color:white;cursor:not-allowed}.button-40{background-color:#111827;border:1px solid transparent;border-radius:.75rem;box-sizing:border-box;margin-top:1rem;color:#FFFFFF;cursor:pointer;flex:0 0 auto;font-family:\"Inter var\",ui-sans-serif,system-ui,-apple-system,system-ui,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\";font-size:0.8rem;font-weight:600;line-height:1rem;padding:.5rem 1rem;text-align:center;text-decoration:none #6B7280 solid;text-decoration-thickness:auto;transition-duration:.2s;transition-property:background-color,border-color,color,fill,stroke;transition-timing-function:cubic-bezier(.4, 0, 0.2, 1);user-select:none;-webkit-user-select:none;touch-action:manipulation;width:auto}.button-40:hover{background-color:#374151}.button-40:focus{box-shadow:none;outline:2px solid transparent;outline-offset:2px}@media (min-width: 768px){.button-40{padding:.75rem 1.5rem}}select{appearance:none;background-color:#FFFFFF;border:1px solid #CCCCCC;border-radius:4px;padding:0.5rem 1rem;font-size:1rem;color:#333333}select:hover{border-color:#888888}select:focus{outline:none;box-shadow:0 0 0 2px rgba(66, 153, 225, 0.5)}aside form label{display:block;margin-bottom:0.5rem;font-size:1rem;color:white;font-family:sans-serif}aside form input{appearance:none;background-color:#FFFFFF;border:1px solid #CCCCCC;border-radius:4px;padding:0.5rem 1rem;font-size:1rem;color:#333333}aside form input:hover{border-color:#888888}aside form input:focus{outline:none;box-shadow:0 0 0 2px rgba(66, 153, 225, 0.5)}";

const WeatherComp = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.tit = undefined;
    this.visible = undefined;
    this.countryCityEnteredByUser = undefined;
    this.numbeOfDaysToForecast = undefined;
    this.fetchedCountry = undefined;
    this.fetchedCity = undefined;
    this.fetchedCurrentDate = undefined;
    this.fetchedCurrentTemperature = undefined;
    this.fetchedCurrentWind = undefined;
    this.fetchedCurrentHumidity = undefined;
    this.fetchedPlusOneCurrentDate = undefined;
    this.fetchedPlusOneCurrentTemperature = undefined;
    this.fetchedPlusOneCurrentWind = undefined;
    this.fetchedPlusOneCurrentHumidity = undefined;
    this.fetchedPlusTwoCurrentDate = undefined;
    this.fetchedPlusTwoCurrentTemperature = undefined;
    this.fetchedPlusTwoCurrentWind = undefined;
    this.fetchedPlusTwoCurrentHumidity = undefined;
    this.countryUserInput = undefined;
    this.inputCityCountryValid = false;
    this.error = undefined;
    this.forecastData = [];
    this.numberOfDaysToBeForecasted = undefined;
  }
  weatherCityCountryChange(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.countryUserInput = newValue;
      this.fetchCountryCityWeather(newValue, this.numberOfDaysToBeForecasted);
    }
  }
  // handleDaysToForecastChange(event: Event) {
  //     const selectedOption = (event.target as HTMLSelectElement).value;
  //     this.numberOfDaysToBeForecasted = parseInt(selectedOption);
  // }
  handleDaysToForecastChange(event) {
    const selectedOption = event.target.value;
    const newNumberOfDaysToForecast = parseInt(selectedOption);
    if (newNumberOfDaysToForecast !== this.numberOfDaysToBeForecasted) {
      this.numberOfDaysToBeForecasted = newNumberOfDaysToForecast;
      if (this.countryCityEnteredByUser) {
        this.fetchCountryCityWeather(this.countryCityEnteredByUser, this.numberOfDaysToBeForecasted);
      }
    }
  }
  async openWeatherComp() {
    console.log('Snow Is Coming...');
    this.visible = true;
  }
  closeWeatherComp() {
    console.log('Back To Summer...');
    this.visible = false;
    this.fetchedCountry = '';
    this.fetchedCity = '';
  }
  onUserInput(event) {
    this.countryUserInput = event.target.value;
    if (this.countryUserInput.trim() !== '') {
      this.inputCityCountryValid = true;
    }
    else {
      this.inputCityCountryValid = false;
    }
  }
  onFetchWeatherData(event) {
    event.preventDefault();
    this.countryCityEnteredByUser = this.inputCityCountry.value;
    console.log('Submitted!');
  }
  componentWillLoad() {
    if (this.countryCityEnteredByUser && this.numbeOfDaysToForecast) {
      (this.countryUserInput = this.countryCityEnteredByUser) && (this.numberOfDaysToBeForecasted = this.numbeOfDaysToForecast);
      this.inputCityCountryValid = true;
    }
  }
  fetchCountryCityWeather(countryCityEntered, numbeOfDaysToForecast) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${AV_API_KEY}&q=${countryCityEntered}&days=${numbeOfDaysToForecast}&aqi=no&alerts=no`)
      .then(res => {
      if (res.status !== 200) {
        throw new Error('Invalid!!');
      }
      return res.json();
    })
      // .then(parsedRes => {
      //     console.log(parsedRes)
      // if (!parsedRes['location']['country']) {
      //     throw new Error('Invalid Entry!');
      // }
      // this.error = null;
      // this.fetchedCountry = parsedRes['location']['country'];
      // this.fetchedCity = parsedRes['location']['name'];
      // this.fetchedCurrentTemperature = parsedRes['current']['temp_c'];
      // this.fetchedCurrentWind = parsedRes['current']['wind_kph'];
      // this.fetchedCurrentHumidity = parsedRes['current']['humidity'];
      // this.fetchedCurrentDate = parsedRes['forecast']['forecastday'][0]['date'];
      // this.fetchedPlusOneCurrentDate = parsedRes['forecast']['forecastday'][1]['date'];
      // this.fetchedPlusOneCurrentTemperature = parsedRes['forecast']['forecastday'][1]['day']['avgtemp_c'];
      // this.fetchedPlusOneCurrentWind = parsedRes['forecast']['forecastday'][1]['day']['maxwind_kph'];
      // this.fetchedPlusOneCurrentHumidity = parsedRes['forecast']['forecastday'][1]['day']['avghumidity'];
      // this.fetchedPlusTwoCurrentDate = parsedRes['forecast']['forecastday'][2]['date'];
      // this.fetchedPlusTwoCurrentTemperature = parsedRes['forecast']['forecastday'][2]['day']['avgtemp_c'];
      // this.fetchedPlusTwoCurrentWind = parsedRes['forecast']['forecastday'][2]['day']['maxwind_kph'];
      // this.fetchedPlusTwoCurrentHumidity = parsedRes['forecast']['forecastday'][2]['day']['avghumidity'];
      .then(parsedRes => {
      console.log(parsedRes);
      if (!parsedRes['location']['country']) {
        throw new Error('Invalid Entry!');
      }
      this.error = null;
      this.fetchedCountry = parsedRes['location']['country'];
      this.fetchedCity = parsedRes['location']['name'];
      this.forecastData = parsedRes['forecast']['forecastday'].map((day) => ({
        date: day['date'],
        temperature: day['day']['avgtemp_c'],
        wind: day['day']['maxwind_kph'],
        humidity: day['day']['avghumidity'],
        icon: day['day']['condition']['icon']
      }));
    })
      .catch(err => {
      console.log(err);
      this.error = err.message;
    });
  }
  render() {
    let mainContent = null;
    let secondContent = null;
    let thirdContent = null;
    if (this.visible) {
      mainContent = (h("div", null, h("header", null, h("h1", null, this.tit), h("button", { onClick: this.closeWeatherComp.bind(this) }, "X")), h("form", { onSubmit: this.onFetchWeatherData.bind(this) }, h("div", { class: "input-container" }, h("label", null, "Enter A Country\\City:", h("input", { placeholder: "Country: Italy\\City: Batroun", id: "country-city-input", ref: el => this.inputCityCountry = el, value: this.countryUserInput, onInput: this.onUserInput.bind(this) }), " ")), h("div", null, h("select", { name: "daysToForecast", id: "daysToForecast", onChange: this.handleDaysToForecastChange.bind(this) }, h("option", { value: "", disabled: true, selected: true, hidden: true }, "Days To Forecast"), h("option", { value: "0" }, "Current"), h("option", { value: "2" }, "Tomorrow"), h("option", { value: "3" }, "After Tomorrow"), h("option", { value: "4" }, "With Next 3 Days"), h("option", { value: "5" }, "With Next 4 Days"))), h("div", null, h("button", { type: "submit", class: "button-40", role: "button", disabled: !this.inputCityCountryValid }, "Strike Me")))));
      if (this.error) {
        secondContent = (h("div", null, h("div", { class: "error-message" }, h("h1", null, this.error))));
      }
      else {
        thirdContent = (h("div", { class: "location" }, h("div", { class: "info" }, h("h1", null, "Country: ", this.fetchedCountry), h("h3", null, "City: ", this.fetchedCity))));
        secondContent = (h("div", { class: "container" }, this.forecastData.map(day => (h("div", { class: "box" }, h("h3", null, "Date: ", day.date), h("img", { src: day.temperature < 10
            ? "../../assets/icons/13d.png"
            : day.temperature >= 10 && day.temperature < 20
              ? "../../assets/icons/03d.png"
              : day.temperature >= 20 && day.temperature < 27
                ? "../../assets/icons/02d.png"
                : "../../assets/icons/01d.png", alt: "weather" }), h("h2", null, day.temperature, "\u00B0C"), h("h4", null, "Wind Today: ", day.wind, "kph"), h("h4", null, "Humidity Today: ", day.humidity, "%"))))));
      }
    }
    let asideClass = this.visible ? 'expanded' : '';
    return [
      h("div", { class: `backdrop ${asideClass}`, onClick: this.closeWeatherComp.bind(this) }),
      h("aside", { class: asideClass }, h("main", null, mainContent, thirdContent), secondContent),
    ];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "countryCityEnteredByUser": ["weatherCityCountryChange"],
    "numbeOfDaysToForecast": ["handleDaysToForecastChange"]
  }; }
};
WeatherComp.style = weatherCompCss;

export { WeatherComp as jji_weather_comp };

//# sourceMappingURL=jji-weather-comp.entry.js.map