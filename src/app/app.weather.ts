import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
 @Component({
     selector: "weather",
     templateUrl:"./app.weather.html",
     providers: [HttpClient],
     styleUrls: ["./app.weather.css"]
 })
export class AppWeatherComponent{
  
    apiKey: string = "5fe31cd39a9c53f454565437a2504496";
    cities: Array<string> = ["Hyderabad", "Mumbai", "Bangalore", "Chennai", "New Delhi", "Kolkata"];    
    temperature: number;
    humidity: number;
    pressure: number;
    population: number;
    _city: string = "Hyderabad";
    weatherForm: FormGroup;
    url:string = `http://api.openweathermap.org/data/2.5/forecast?q=${this._city}&appid=${this.apiKey}`;
    get weatherUrl(){           
           return `http://api.openweathermap.org/data/2.5/forecast?q=${this._city}&appid=${this.apiKey}`;            
    }
    set city(city){
        this._city = city;
    }
    get city(){
        return this._city;
    }
    constructor(private http: HttpClient){

    }
    ngOnChanges() {
  
    console.log(`ngOnChanges - data is ${this.city}`);
  }
  refresh(){

  }
    ngOnInit(){
      this.weatherForm = new FormGroup({
            city: new FormControl("Hyderabad")
        })
    this.getWeather();
    }
    getWeather(){   
    console.log("sdfd");
        this.city = this.weatherForm.value.city;           
        this.http.get(this.weatherUrl).subscribe(r => {
            console.log(r.list[0]);
            this.temperature = r.list[0].main.temp/10;
             this.humidity = r.list[0].main.humidity;
             this.pressure = r.list[0].main.pressure;
             this.population = r.city.population;
        }); 
    }
}