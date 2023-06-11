
$(document).ready(()=>{
    
    function getWeather (city){
        // ajax setup
        $.ajaxSetup({
            headers: {
                'Referrer-Policy': 'strict-origin-when-cross-origin',
                'Accept': 'application/json'
            }
        })

        $.ajax({
            method: 'GET',
            url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
            headers: {
                'X-RapidAPI-Key': '29c21a8d61mshca5484ade8c2bc3p191158jsnf393c21295a6',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            },
            data: {
                q: city,
                days: '3'
            }
        }).done((response)=>{
            if (response['current']['is_day'] == 0){
                $('#currentWeatherImg').attr('src','https://cdn.weatherapi.com/weather/64x64/night/'+response['current']['condition']['icon']);
            }else{
                $('#currentWeatherImg').attr('src','https://cdn.weatherapi.com/weather/64x64/day/'+response['current']['condition']['icon']);
            }

            let days = ['today','tomarrow','afterTomarrow'];
            for(let i=0;i<days.length;i++){
                let icon = response['forecast']['forecastday'][i]['day']['condition']['icon'];
                let split = icon.split('/');
                $('#'+days[i]+'WeatherDate').html(response['forecast']['forecastday'][i]['date']);
                $('#'+days[i]+'WeatherImg').attr('alt',response['location']['name']);
                $('#'+days[i]+'WeatherImg').attr('src','https://cdn.weatherapi.com/weather/64x64/day/'+split[6]);
                $('#'+days[i]+'WeatherText').html(response['forecast']['forecastday'][i]['day']['condition']['text']);
                $('#'+days[i]+'WeatherTemp').html('AVG Temp: '+response['forecast']['forecastday'][i]['day']['avgtemp_c']+'°C');
                $('#'+days[i]+'WeatherMaxWind').html('Wind:'+response['forecast']['forecastday'][i]['day']['maxwind_kph']+'km/h');
                $('#'+days[i]+'WeatherHumidity').html('Humidity: '+response['forecast']['forecastday'][i]['day']['avghumidity']+'%');
                $('#'+days[i]+'WeatherChancerain').html('Chance of rain: '+response['forecast']['forecastday'][i]['day']['daily_chance_of_rain']+'%');
                $('#'+days[i]+'WeatherMinTemp').html(' / Min: '+response['forecast']['forecastday'][i]['day']['mintemp_c']+'°C');
                $('#'+days[i]+'WeatherMaxTemp').html('Temp Max '+response['forecast']['forecastday'][i]['day']['maxtemp_c']+'°C');
            }
        }).fail((error)=>{
            $('#youtField').val('City not found!');
        })
    }

    $('#getWeather').on('submit',(e)=>{
        e.preventDefault();
        let city = $('#youtField').val();
        getWeather(city);
    });

    // getWeather();

})
