
// api.openweathermap.org/data/2.5/weather?zip=362230,IN&appid=df4f31b00947f5393daccfc2dfa9e3d6


const getTempData = () => {
    let val = document.getElementById('zipcode').value;
    // console.log(typeof(val));
    if (val.length === 6) {
        fetchData(val, 'IN');
        document.getElementById('container').style.display = 'block';
    }
    else{
        document.getElementById('container').style.display = 'none';
        
    }
}

function changes(data) {
    document.getElementById('city').innerText = data.name;
    document.getElementById('heading').innerText = ((data.main.temp) - 273).toFixed(2) + '° C';
    document.getElementById('wheather').innerText = data.weather[0].main;

    const timeParser = (item) => item < 10 ? '0' + item : item;
    setInterval(() => {
        const d = new Date();
        if (d.getSeconds() < 10 || d.getMinutes() < 10 || d.getHours() < 10) {

        }
        document.getElementById('times').innerText = timeParser(d.getHours()) + ':' + timeParser(d.getMinutes()) + ':' + timeParser(d.getSeconds());
    }, 1000);
    document.getElementById('humidity').innerText = data.main.humidity + '%';
    document.getElementById('wind').innerText = data.wind.speed + ' km/h';
    document.getElementById('pressure').innerText = data.main.pressure;
    document.getElementById('image').src= `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
}

function fetchData(zipcode, country) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${country}&appid=df4f31b00947f5393daccfc2dfa9e3d6`).then(response => response.json()).then(data => {
        // console.log(data);

        changes(data);
    }).catch(err => console.error(err));
}