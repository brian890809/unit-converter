export function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
  }
  
  export function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
  }
  
  export function celsiusToKelvin(celsius) {
    return celsius + 273.15;
  }
  
  export function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }
  
  export function fahrenheitToKelvin(fahrenheit) {
    return (fahrenheit - 32) * 5/9 + 273.15;
  }
  
  export function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
  }