import { Component, h, Method, Prop, State, Element, Watch } from "@stencil/core";
import { AV_API_KEY } from "../global-use/my-api-key";



@Component({
    tag: 'jji-weather-comp',
    styleUrl: './weather-comp.css',
    shadow: true,
})
export class WeatherComp {
    inputCityCountry: HTMLInputElement;




    @Element() el: HTMLElement;


    @Prop({ reflect: true, }) tit: string;
    @Prop({ reflect: true, mutable: true }) visible: boolean;
    @Prop({ reflect: true, mutable: true }) countryCityEnteredByUser: string;
    @Prop({ reflect: true, mutable: true }) numbeOfDaysToForecast: number;


    @Watch('countryCityEnteredByUser')
    weatherCityCountryChange(newValue: string, oldValue: string) {
        if (newValue !== oldValue) {
            this.countryUserInput = newValue;
            this.fetchCountryCityWeather(newValue, this.numberOfDaysToBeForecasted);
        }
    }

    @Watch('numbeOfDaysToForecast')
    // handleDaysToForecastChange(event: Event) {
    //     const selectedOption = (event.target as HTMLSelectElement).value;
    //     this.numberOfDaysToBeForecasted = parseInt(selectedOption);
    // }
    handleDaysToForecastChange(event: Event) {
        const selectedOption = (event.target as HTMLSelectElement).value;
        const newNumberOfDaysToForecast = parseInt(selectedOption);

        if (newNumberOfDaysToForecast !== this.numberOfDaysToBeForecasted) {
            this.numberOfDaysToBeForecasted = newNumberOfDaysToForecast;

            if (this.countryCityEnteredByUser) {
                this.fetchCountryCityWeather(this.countryCityEnteredByUser, this.numberOfDaysToBeForecasted);
            }
        }
    }

    @State() fetchedCountry: string;
    @State() fetchedCity: string;

    @State() fetchedCurrentDate: Date;
    @State() fetchedCurrentTemperature: number;
    @State() fetchedCurrentWind: number;
    @State() fetchedCurrentHumidity: number;

    @State() fetchedPlusOneCurrentDate: Date;
    @State() fetchedPlusOneCurrentTemperature: number;
    @State() fetchedPlusOneCurrentWind: number;
    @State() fetchedPlusOneCurrentHumidity: number;

    @State() fetchedPlusTwoCurrentDate: Date;
    @State() fetchedPlusTwoCurrentTemperature: number;
    @State() fetchedPlusTwoCurrentWind: number;
    @State() fetchedPlusTwoCurrentHumidity: number;



    @State() countryUserInput: string;
    @State() inputCityCountryValid = false;
    @State() error: string;
    @State() forecastData: {
        date: Date;
        temperature: number;
        wind: number;
        humidity: number;
    }[] = [];


    @State() numberOfDaysToBeForecasted: number;




    @Method()
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


    onUserInput(event: Event) {
        this.countryUserInput = (event.target as HTMLInputElement).value;
        if (this.countryUserInput.trim() !== '') {
            this.inputCityCountryValid = true;
        }
        else {
            this.inputCityCountryValid = false;
        }
    }

    onFetchWeatherData(event: Event) {
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



    fetchCountryCityWeather(countryCityEntered: string, numbeOfDaysToForecast: number) {
        fetch(

            `http://api.weatherapi.com/v1/forecast.json?key=${AV_API_KEY}&q=${countryCityEntered}&days=${numbeOfDaysToForecast}&aqi=no&alerts=no`
        )
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Invalid!!');
                }
                return res.json()

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

                console.log(parsedRes)
                if (!parsedRes['location']['country']) {
                    throw new Error('Invalid Entry!');
                }
                this.error = null;
                this.fetchedCountry = parsedRes['location']['country'];
                this.fetchedCity = parsedRes['location']['name'];

                this.forecastData = parsedRes['forecast']['forecastday'].map((day: any) => ({
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

        if (this.visible) {
            mainContent = (

                <div>
                    <header>
                        <h1>{this.tit}</h1>
                        <button onClick={this.closeWeatherComp.bind(this)}>X</button>
                    </header>
                    <form onSubmit={this.onFetchWeatherData.bind(this)}>
                        <div class="input-container">
                            <label>Enter A Country\City:
                                <input
                                    placeholder="Country: Italy\City: Batroun"
                                    id="country-city-input"
                                    ref={el => this.inputCityCountry = el}
                                    value={this.countryUserInput}
                                    onInput={this.onUserInput.bind(this)}
                                /> </label>
                        </div>
                        <div>
                            <select name="daysToForecast" id="daysToForecast" onChange={this.handleDaysToForecastChange.bind(this)}>
                                <option value="" disabled selected hidden>Days To Forecast</option>
                                <option value="0">Current</option>
                                <option value="2">Tomorrow</option>
                                <option value="3">After Tomorrow</option>
                                <option value="4">With Next 3 Days</option>
                                <option value="5">With Next 4 Days</option>
                            </select>
                        </div>
                        {/* <div>
                            <label>Enter A Date: <input placeholder="Day/Month/Year" id="date-input" /> </label>
                        </div> */}

                        <div>
                            <button type="submit" class="button-40" role="button" disabled={!this.inputCityCountryValid}>Strike Me</button>
                        </div>

                    </form >
                </div >


            )

            if (this.error) {
                secondContent = (
                    <div>
                        <div class="error-message"><h1>{this.error}</h1></div>
                    </div>
                )
            }
            else {
                secondContent = (
                    <div class="container">
                        {/* <div class="box">
                            <h3>Date: {this.fetchedCurrentDate}</h3>
                            <h4>Temperature Today: {this.fetchedCurrentTemperature}&deg;C</h4>
                            <h4>Wind Today: {this.fetchedCurrentWind}kph</h4>
                            <h4>Humidity Today: {this.fetchedCurrentHumidity}%</h4>
                        </div>

                        <div class="box">
                            <h3>Date: {this.fetchedPlusOneCurrentDate}</h3>
                            <h4>Temperature Today: {this.fetchedPlusOneCurrentTemperature}&deg;C</h4>
                            <h4>Wind Today: {this.fetchedPlusOneCurrentWind}kph</h4>
                            <h4>Humidity Today: {this.fetchedPlusOneCurrentHumidity}%</h4>
                        </div>

                        <div class="box">
                            <h3>Date: {this.fetchedPlusTwoCurrentDate}</h3>
                            <h4>Temperature Today: {this.fetchedPlusTwoCurrentTemperature}&deg;C</h4>
                            <h4>Wind Today: {this.fetchedPlusTwoCurrentWind}kph</h4>
                            <h4>Humidity Today: {this.fetchedPlusTwoCurrentHumidity}%</h4>
                        </div> */}


                        {this.forecastData.map(day => (
                            <div class="box">
                                <h3>Date: {day.date}</h3>
                                <img
                                    src={
                                        day.temperature < 10
                                            ? "../../assets/icons/13d.png"
                                            : day.temperature >= 10 && day.temperature < 20
                                                ? "../../assets/icons/03d.png"
                                                : day.temperature >= 20 && day.temperature < 27
                                                    ? "../../assets/icons/02d.png"
                                                    : "../../assets/icons/01d.png"
                                    }
                                    alt="weather"
                                />
                                <h2>{day.temperature}&deg;C</h2>
                                <h4>Wind Today: {day.wind}kph</h4>
                                <h4>Humidity Today: {day.humidity}%</h4>
                            </div>
                        ))}
                    </div>
                )
            }

        }
        let asideClass = this.numberOfDaysToBeForecasted > 1 ? 'expanded' : '';
        return [
            <div class={`backdrop ${asideClass}`} onClick={this.closeWeatherComp.bind(this)}></div>,
            <aside class={asideClass}>
                <main>
                    {mainContent}
                    <div class="location">
                        <div class="info">
                            <h1>Country: {this.fetchedCountry}</h1>
                            <h3>City: {this.fetchedCity}</h3>
                        </div>
                        {/* <img src="../../assets/icons/01d.png" alt="weather" /> */}
                    </div>
                </main>

                <div class="container">
                    {secondContent}
                </div>

            </aside>,
        ];
    }
}


