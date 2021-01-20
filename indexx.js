// 1st declare which item we change dynamically

let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;

const searchInput = document.getElementById("search-input");
const  searchButton = document.getElementById("search-button");


// now last part code for particular position---1st to stop browser auto take up location
searchButton.addEventListener('click', (e)=>{


    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
 
    
});

const getWeather = async (city)=>{

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ddde25db7dab976ac4578c73cbe1ca44`,

          {mode: 'cors'}
        );

        const weatherData = await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];

        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like-273);

        if(id>200 && id<300)
        {
            tempicon.src="images/storm.png";
        }
        else if(id>=300 && id<400)
        {
            tempicon.src="images/clouds.png";
        }
        else if(id>=500 && id<600)
        {
            tempicon.src="images/rain.png";
        }
        else if(id>=600 && id<700)
        {
            tempicon.src="images/snowflake.png";
        }
        else if(id==721)
        {
            tempicon.src="images/fog.png";
        }
        else if(id>=700 && id<800)
        {
            tempicon.src="images/haze.png";
        }
        else if(id==800)
        {
            tempicon.src="images/sun.png";
        }
        else if(id>800)
        {
            tempicon.src="images/clouds.png";
        }
        


    }
    catch(error){
        alert('city not found');
    }
};




window.addEventListener("load", ()=>{

    let long;
    let lat;

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>{

            long  = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ddde25db7dab976ac4578c73cbe1ca44`;

            fetch(api).then((response)=>{

                 return response.json();

            })
            .then(data =>{

                // here convert json data to normal
                const{name}=data;
                // here name is a avariable and all data store in name variable
                const{feels_like}=data.main;
                const{id,main}=data.weather[0];



                // here we set our current location on location id
                loc.textContent=name;
                climate.textContent=main;
                tempvalue.textContent=Math.round(feels_like-273);
                
                if(id>=200 && id<300)
                {
                    tempicon.src="images/storm.png";
                }
                else if(id>=300 && id<400)
                {
                    tempicon.src="images/clouds.png";
                }
                else if(id>=500 && id<600)
                {
                    tempicon.src="images/rain.png";
                }
                else if(id>=600 && id<700)
                {
                    tempicon.src="images/snowflake.png";
                }
                else if(id==721)
                {
                    tempicon.src="images/fog.png";
                }
                else if(id>=700 && id<800)
                {
                    tempicon.src="images/haze.png";
                }
                else if(id==800)
                {
                    tempicon.src="images/sun.png";
                }
                else if(id>=801)
                {
                    tempicon.src="images/clouds.png";
                }
                
                





            })





        })
    }
} )



