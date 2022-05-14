window.addEventListener('load',()=>{
    let long
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

    let ubicacion= document.getElementById('ubicacion')
    let icon= document.getElementById('icono')
    let vientoVelocidad= document.getElementById('velocidad-viento')

    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion =>{
            console.log(posicion.coords)

            lat = posicion.coords.latitude
            long = posicion.coords.longitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=57e238f33faef6cd1ffb3e7794124e10`

            fetch(url)
                .then (response => {return response.json()})
                .then(data => {
                    console.log(data.main.temp)
                    
                    let temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = `${temp} temperatura actual`
                    console.log(data.weather[0].description)
                    
                    let desc = data.weather[0].description
                    temperaturaDescripcion.textContent = desc.toUpperCase()
                    
                    console.log(data)
                    ubicacion.textContent = `${data.name} ${data.sys.country}`
                    vientoVelocidad.textContent = `${data.wind.speed} m/s`
                
                    //icons
                    //et iconCode = data.weather[0].icon
                    //const urlIcons = `http://openweathermap.org/img/wn/${iconCode}.png`
                
                    //console.log(urlIcons)

                    //animations icons
                    console.log(data.weather[0].main)
                    switch(data.weather[0].main){
                        case 'Clouds':
                            icon.src='animated/cloudy.svg'
                            break;
                        case 'Clear':
                            icon.src='animated/day.svg'
                            break;
                        case 'Thunderstorm':
                            icon.src='animated/thunder.svg'
                            break;
                        case 'Drizzle':
                            icon.src='animated/rainy-2.svg'
                            break;
                        case 'Rain':
                            icon.src='animated/rainy-7.svg'
                            break;

                        case 'Snow':
                            icon.src='animated/snowy-6.svg'
                            break;
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
        })
    }
})