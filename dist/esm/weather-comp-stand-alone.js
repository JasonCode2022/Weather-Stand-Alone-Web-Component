import { p as promiseResolve, b as bootstrapLazy } from './index-8772a97a.js';
export { s as setNonce } from './index-8772a97a.js';

/*
 Stencil Client Patch Browser v4.0.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["jji-weather-comp",[[1,"jji-weather-comp",{"tit":[513],"visible":[1540],"countryCityEnteredByUser":[1537,"country-city-entered-by-user"],"numbeOfDaysToForecast":[1538,"numbe-of-days-to-forecast"],"fetchedCountry":[32],"fetchedCity":[32],"fetchedCurrentDate":[32],"fetchedCurrentTemperature":[32],"fetchedCurrentWind":[32],"fetchedCurrentHumidity":[32],"fetchedPlusOneCurrentDate":[32],"fetchedPlusOneCurrentTemperature":[32],"fetchedPlusOneCurrentWind":[32],"fetchedPlusOneCurrentHumidity":[32],"fetchedPlusTwoCurrentDate":[32],"fetchedPlusTwoCurrentTemperature":[32],"fetchedPlusTwoCurrentWind":[32],"fetchedPlusTwoCurrentHumidity":[32],"countryUserInput":[32],"inputCityCountryValid":[32],"error":[32],"forecastData":[32],"numberOfDaysToBeForecasted":[32],"openWeatherComp":[64]}]]]], options);
});

//# sourceMappingURL=weather-comp-stand-alone.js.map