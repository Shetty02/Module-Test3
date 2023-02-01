const baseUrl = 'https://api.geoapify.com/v1/geocode/reverse',
      currentTimeZone = document.getElementById('currentTimeZone'),
      Address = document.getElementById("Address"),
      addressUrl ='https://api.geoapify.com/v1/geocode/search',
      submit = document.getElementById('submit'),
      enteredTimeZone = document.getElementById('enteredTimeZone'),
      enteredTimeZoneMsg = document.getElementById('enteredTimeZoneMsg');

      const locationPromise = new Promise((resolve, reject)=>{
    navigator.geolocation.getCurrentPosition(resolve);
})
const renderCurrentTimezoneContainer = (weather) =>{
    currentTimeZone.style.display = 'block';
    const data = [
        {
            label:"Name of Time Zone: ",
            data: weather.timezone.name,
        },
        {
            label:"Latituted: ",
            data: weather.lat,
        },
        {
            label:"Longituted: ",
            data: weather.lon,
        },
        {
            label:"Offset STD: ",
            data: weather.timezone.offset_STD,
        },
        {
            label:"Offset STD Seconds: ",
            data: weather.timezone.offset_STD_seconds,
        },
        {
            label:"Offset DST : ",
            data: weather.timezone.offset_DST,
        },
        {
            label:"Offset DST Seconds: ",
            data: weather.timezone.offset_DST_seconds,
        },
        {
            label:"Country: ",
            data: weather.country,
        },
        {
            label:"PostCode: ",
            data: weather.postcode,
        },
        {
            label:"City: ",
            data: weather.county,
        },
 
    ]

    data.forEach((weatherObj)=>{
        const div = document.createElement('div');
        const label = document.createElement('span');
        const value = document.createElement('span');

        div.classList.add("divContainer")
        label.textContent = weatherObj.label;
        value.textContent = weatherObj.data;

        div.appendChild(label);
        div.appendChild(value);

        currentTimeZone.appendChild(div);
    })
}
const renderEnteredAddressContainer = (weather) =>{
    displayResult.style.display = 'block';
    enteredTimeZoneMsg.style.display = 'none';
    const data = [
        {
            label:"Name of Time Zone: ",
            data: weather.features[0].properties.timezone.name,
        },
        {
            label:"Latituted: ",
            data: weather.features[0].properties.lat,
        },
        {
            label:"Longituted: ",
            data: weather.features[0].properties.lon,
        },
        {
            label:"Offset STD: ",
            data: weather.features[0].properties.timezone.offset_STD,
        },
        {
            label:"Offset STD Seconds: ",
            data: weather.features[0].properties.timezone.offset_STD_seconds,
        },
        {
            label:"Offset DST : ",
            data: weather.features[0].properties.timezone.offset_DST,
        },
        {
            label:"Offset DST Seconds: ",
            data: weather.features[0].properties.timezone.offset_DST_seconds,
        },
        {
            label:"Country: ",
            data: weather.features[0].properties.country,
        },
        {
            label:"PostCode: ",
            data: weather.query.parsed.postcode,
        },
        {
            label:"City: ",
            data: weather.features[0].properties.city,
        },
 
    ]

    data.forEach((weatherObj)=>{
        const div = document.createElement('div');
        const label = document.createElement('span');
        const value = document.createElement('span');

        
        label.textContent = weatherObj.label;
        value.textContent = weatherObj.data;

        div.appendChild(label);
        div.appendChild(value);

        enteredTimeZone.appendChild(div);
    })
}

const renderAddressDetails = async ()=>{
    const address = Address.value;
    // `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=YOUR_API_KEY`
    const url = `${addressUrl}?text=${encodeURIComponent(address)}&apiKey=da2c337686044397bb3bdf5d5d30d2b2`
    const res = await fetch(url);
    const data = await res.json();

    console.log("Address Details",data)
    // console.log("Address Details",data.query.parsed.postcode);
    // console.log("Address Details",data.features[0].properties.lat);
    // console.log("Address Details",data.features[0].properties.lon);
    // console.log("Address Details",data. features[0])

    renderEnteredAddressContainer(data);
}
const renderCurrentTimeZoneDetails = async (lat, long)=>{

// https://api.geoapify.com/v1/geocode/reverse?lat=21.6248&lon=73.003&format=json&apiKey=da2c337686044397bb3bdf5d5d30d2b2
    const url = `${baseUrl}?lat=${lat}&lon=${long}&format=json&apiKey=da2c337686044397bb3bdf5d5d30d2b2`
    const res = await fetch(url);
    const data = await res.json();

    // console.log("weather Details",data.results[0])
    // console.log("weather Details",data)

    renderCurrentTimezoneContainer(data.results[0]);
}
const fetchUserLocation = async()=>{
    const data = await locationPromise;
    console.log("location", data);

    const lat = data.coords.latitude
    const long = data.coords.longitude

    // console.log("LAt",lat)
    // console.log("Long",long)

    renderCurrentTimeZoneDetails(lat,long);
}

document.addEventListener('DOMContentLoaded',fetchUserLocation);
submit.addEventListener("click",renderAddressDetails)