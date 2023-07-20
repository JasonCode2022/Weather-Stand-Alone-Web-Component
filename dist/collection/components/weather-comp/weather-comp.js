import { h } from "@stencil/core";
import { AV_API_KEY } from "../global-use/my-api-key";
export class WeatherComp {
  constructor() {
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
      this.fetchCountryCityWeather[(this.countryCityEnteredByUser, this.numbeOfDaysToForecast)];
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
  static get is() { return "jji-weather-comp"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["./weather-comp.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["weather-comp.css"]
    };
  }
  static get properties() {
    return {
      "tit": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "tit",
        "reflect": true
      },
      "visible": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "visible",
        "reflect": true
      },
      "countryCityEnteredByUser": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "country-city-entered-by-user",
        "reflect": true
      },
      "numbeOfDaysToForecast": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "numbe-of-days-to-forecast",
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "fetchedCountry": {},
      "fetchedCity": {},
      "fetchedCurrentDate": {},
      "fetchedCurrentTemperature": {},
      "fetchedCurrentWind": {},
      "fetchedCurrentHumidity": {},
      "fetchedPlusOneCurrentDate": {},
      "fetchedPlusOneCurrentTemperature": {},
      "fetchedPlusOneCurrentWind": {},
      "fetchedPlusOneCurrentHumidity": {},
      "fetchedPlusTwoCurrentDate": {},
      "fetchedPlusTwoCurrentTemperature": {},
      "fetchedPlusTwoCurrentWind": {},
      "fetchedPlusTwoCurrentHumidity": {},
      "countryUserInput": {},
      "inputCityCountryValid": {},
      "error": {},
      "forecastData": {},
      "numberOfDaysToBeForecasted": {}
    };
  }
  static get methods() {
    return {
      "openWeatherComp": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "countryCityEnteredByUser",
        "methodName": "weatherCityCountryChange"
      }, {
        "propName": "numbeOfDaysToForecast",
        "methodName": "handleDaysToForecastChange"
      }];
  }
}
//# sourceMappingURL=weather-comp.js.map
