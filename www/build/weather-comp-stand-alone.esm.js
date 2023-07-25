import { B as BUILD, c as consoleDevInfo, H, d as doc, N as NAMESPACE, p as promiseResolve, b as bootstrapLazy } from './index-aee5870f.js';
export { s as setNonce } from './index-aee5870f.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v4.0.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        // because the mark/measure APIs are designed to write entries to a buffer in the browser that does not exist,
        // simply stub the implementations out.
        // TODO(STENCIL-323): Remove this patch when support for older browsers is removed (breaking)
        // @ts-ignore
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? (scriptElm || {})['data-opts'] || {} : {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["jji-weather-comp",[[1,"jji-weather-comp",{"tit":[513],"visible":[1540],"countryCityEnteredByUser":[1537,"country-city-entered-by-user"],"numbeOfDaysToForecast":[1538,"numbe-of-days-to-forecast"],"fetchedCountry":[32],"fetchedCity":[32],"fetchedCurrentDate":[32],"fetchedCurrentTemperature":[32],"fetchedCurrentWind":[32],"fetchedCurrentHumidity":[32],"fetchedPlusOneCurrentDate":[32],"fetchedPlusOneCurrentTemperature":[32],"fetchedPlusOneCurrentWind":[32],"fetchedPlusOneCurrentHumidity":[32],"fetchedPlusTwoCurrentDate":[32],"fetchedPlusTwoCurrentTemperature":[32],"fetchedPlusTwoCurrentWind":[32],"fetchedPlusTwoCurrentHumidity":[32],"countryUserInput":[32],"inputCityCountryValid":[32],"error":[32],"forecastData":[32],"numberOfDaysToBeForecasted":[32],"openWeatherComp":[64]}]]]], options);
});

//# sourceMappingURL=weather-comp-stand-alone.esm.js.map