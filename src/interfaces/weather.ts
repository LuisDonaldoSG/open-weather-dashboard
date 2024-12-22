interface CoordinatesI {
    lon: number;
    lat: number;
}

interface SysInfoI {
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
}

interface WeatherConditionI {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface MainWeatherDataI {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
}

interface WindDataI {
    speed: number;
    deg: number;
}

interface CloudsDataI {
    all: number;
}

export interface WeatherByCityI {
    coord: CoordinatesI;
    sys: SysInfoI;
    weather: WeatherConditionI[];
    main: MainWeatherDataI;
    visibility?: number;
    wind: WindDataI;
    clouds: CloudsDataI;
    dt: number;
    id: number;
    name: string;
}