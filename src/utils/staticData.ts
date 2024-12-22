import { ResponseListI } from "@interfaces/response";
import { WeatherByCityI } from "@interfaces/weather";

export const dummyDashboardData: ResponseListI<WeatherByCityI[]> = {
    "cnt": 12,
    "list": [
        {
            "coord": {
                "lon": -99.1277,
                "lat": 19.4285
            },
            "sys": {
                "country": "MX",
                "timezone": -21600,
                "sunrise": 1734786370,
                "sunset": 1734825813
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "main": {
                "temp": 57.04,
                "feels_like": 55.17,
                "temp_min": 54.05,
                "temp_max": 57.13,
                "pressure": 1021,
                "sea_level": 1021,
                "grnd_level": 767,
                "humidity": 58
            },
            "visibility": 10000,
            "wind": {
                "speed": 6.91,
                "deg": 360
            },
            "clouds": {
                "all": 100
            },
            "dt": 1734844573,
            "id": 3530597,
            "name": "Mexico City"
        },
        {
            "coord": {
                "lon": -97.1,
                "lat": 18.85
            },
            "sys": {
                "country": "MX",
                "timezone": -21600,
                "sunrise": 1734785816,
                "sunset": 1734825394
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "main": {
                "temp": 58.8,
                "feels_like": 59.09,
                "temp_min": 58.8,
                "temp_max": 58.8,
                "pressure": 1025,
                "sea_level": 1025,
                "grnd_level": 818,
                "humidity": 100
            },
            "wind": {
                "speed": 4,
                "deg": 88
            },
            "clouds": {
                "all": 100
            },
            "dt": 1734844572,
            "id": 3522307,
            "name": "Orizaba"
        },
        {
            "coord": {
                "lon": -103.3333,
                "lat": 20.6667
            },
            "sys": {
                "country": "MX",
                "timezone": -21600,
                "sunrise": 1734787525,
                "sunset": 1734826677
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "main": {
                "temp": 55.17,
                "feels_like": 53.73,
                "temp_min": 55.17,
                "temp_max": 55.17,
                "pressure": 1019,
                "sea_level": 1019,
                "grnd_level": 844,
                "humidity": 71
            },
            "visibility": 10000,
            "wind": {
                "speed": 0,
                "deg": 0
            },
            "clouds": {
                "all": 20
            },
            "dt": 1734844602,
            "id": 4005539,
            "name": "Guadalajara"
        },
        {
            "coord": {
                "lon": -106.4167,
                "lat": 23.2167
            },
            "sys": {
                "country": "MX",
                "timezone": -25200,
                "sunrise": 1734788574,
                "sunset": 1734827109
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "main": {
                "temp": 68.92,
                "feels_like": 69.55,
                "temp_min": 64.36,
                "temp_max": 68.92,
                "pressure": 1014,
                "sea_level": 1014,
                "grnd_level": 1013,
                "humidity": 86
            },
            "visibility": 10000,
            "wind": {
                "speed": 1.99,
                "deg": 304
            },
            "clouds": {
                "all": 0
            },
            "dt": 1734844601,
            "id": 3996322,
            "name": "Mazatlan"
        },
        {
            "coord": {
                "lon": -100,
                "lat": 25.6667
            },
            "sys": {
                "country": "MX",
                "timezone": -21600,
                "sunrise": 1734787341,
                "sunset": 1734825261
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "main": {
                "temp": 61.63,
                "feels_like": 61.92,
                "temp_min": 61.52,
                "temp_max": 62.28,
                "pressure": 1024,
                "sea_level": 1024,
                "grnd_level": 986,
                "humidity": 94
            },
            "visibility": 8047,
            "wind": {
                "speed": 4.61,
                "deg": 130
            },
            "clouds": {
                "all": 100
            },
            "dt": 1734844572,
            "id": 3522542,
            "name": "Nuevo Leon"
        },
        {
            "coord": {
                "lon": -101.6667,
                "lat": 21.1167
            },
            "sys": {
                "country": "MX",
                "timezone": -21600,
                "sunrise": 1734787179,
                "sunset": 1734826224
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "main": {
                "temp": 59.05,
                "feels_like": 57.29,
                "temp_min": 59.05,
                "temp_max": 59.05,
                "pressure": 1020,
                "sea_level": 1020,
                "grnd_level": 811,
                "humidity": 56
            },
            "visibility": 10000,
            "wind": {
                "speed": 3.11,
                "deg": 95
            },
            "clouds": {
                "all": 99
            },
            "dt": 1734844601,
            "id": 3998655,
            "name": "Leon"
        },
        {
            "coord": {
                "lon": -96.6667,
                "lat": 19.3333
            },
            "sys": {
                "country": "MX",
                "timezone": -21600,
                "sunrise": 1734785768,
                "sunset": 1734825234
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "main": {
                "temp": 63.28,
                "feels_like": 63.54,
                "temp_min": 63.28,
                "temp_max": 63.28,
                "pressure": 1024,
                "sea_level": 1024,
                "grnd_level": 973,
                "humidity": 90
            },
            "visibility": 10000,
            "wind": {
                "speed": 1.81,
                "deg": 228
            },
            "clouds": {
                "all": 100
            },
            "dt": 1734844569,
            "id": 3514780,
            "name": "Veracruz"
        },
        {
            "coord": {
                "lon": -96.9167,
                "lat": 19.5333
            },
            "sys": {
                "country": "MX",
                "timezone": -21600,
                "sunrise": 1734785852,
                "sunset": 1734825270
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "main": {
                "temp": 55.31,
                "feels_like": 55.24,
                "temp_min": 55.31,
                "temp_max": 55.31,
                "pressure": 1025,
                "sea_level": 1025,
                "grnd_level": 856,
                "humidity": 100
            },
            "visibility": 1661,
            "wind": {
                "speed": 2.13,
                "deg": 142
            },
            "clouds": {
                "all": 100
            },
            "dt": 1734844572,
            "id": 3526617,
            "name": "Xalapa"
        },
        {
            "coord": {
                "lon": -115,
                "lat": 30
            },
            "sys": {
                "country": "MX",
                "timezone": -28800,
                "sunrise": 1734791523,
                "sunset": 1734828282
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "main": {
                "temp": 56.32,
                "feels_like": 53.2,
                "temp_min": 56.32,
                "temp_max": 56.32,
                "pressure": 1019,
                "sea_level": 1019,
                "grnd_level": 946,
                "humidity": 33
            },
            "visibility": 10000,
            "wind": {
                "speed": 2.48,
                "deg": 336
            },
            "clouds": {
                "all": 54
            },
            "dt": 1734844603,
            "id": 4017700,
            "name": "Baja California"
        },
        {
            "coord": {
                "lon": -99.8901,
                "lat": 16.8634
            },
            "sys": {
                "country": "MX",
                "timezone": -21600,
                "sunrise": 1734786259,
                "sunset": 1734826291
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "main": {
                "temp": 80.42,
                "feels_like": 85.62,
                "temp_min": 80.42,
                "temp_max": 80.42,
                "pressure": 1015,
                "sea_level": 1015,
                "grnd_level": 1004,
                "humidity": 83
            },
            "visibility": 8047,
            "wind": {
                "speed": 2.3,
                "deg": 80
            },
            "clouds": {
                "all": 75
            },
            "dt": 1734844574,
            "id": 3533462,
            "name": "Acapulco de Juarez"
        },
        {
            "coord": {
                "lon": -86.8466,
                "lat": 21.1743
            },
            "sys": {
                "country": "MX",
                "timezone": -18000,
                "sunrise": 1734870056,
                "sunset": 1734909088
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "main": {
                "temp": 67.96,
                "feels_like": 68.31,
                "temp_min": 62.53,
                "temp_max": 67.96,
                "pressure": 1020,
                "sea_level": 1020,
                "grnd_level": 1019,
                "humidity": 82
            },
            "visibility": 10000,
            "wind": {
                "speed": 4.61,
                "deg": 300
            },
            "clouds": {
                "all": 40
            },
            "dt": 1734844574,
            "id": 3531673,
            "name": "Cancun"
        },
        {
            "coord": {
                "lon": -98.2833,
                "lat": 26.0833
            },
            "sys": {
                "country": "MX",
                "timezone": -21600,
                "sunrise": 1734786983,
                "sunset": 1734824795
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "main": {
                "temp": 64.22,
                "feels_like": 63.73,
                "temp_min": 61.86,
                "temp_max": 66.22,
                "pressure": 1024,
                "sea_level": 1024,
                "grnd_level": 1018,
                "humidity": 72
            },
            "visibility": 9656,
            "wind": {
                "speed": 4.61,
                "deg": 140
            },
            "clouds": {
                "all": 75
            },
            "dt": 1734844571,
            "id": 3520339,
            "name": "Reynosa"
        }
    ]
}