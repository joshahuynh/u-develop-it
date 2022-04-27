
var apiKey="5ae2e3f221c38a28845f05b638afcb8c9d06e5de03ab7d559143f323"  
var lat;
var lon;
var cityName;
var xidNumber;
var Btn=$("#searchBtn")
var searchForm=$("#search-form")
var attraction=$(".attraction")
var attractionInfo=$(".attractioninfo")

function getLatLon(){
    var apiKey1="be682886f203a1917d6b9e1b2aa026e8";
    cityName=searchForm.val();
    console.log(cityName)
    var apiUrlGeoCood=`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey1}`;
    fetch(apiUrlGeoCood)
        .then(function(response){
            if(response.ok){
                response.json()
                .then(function(data){
                    if(data.length>0){
                        var Name=data[0].name;
                        var State=data[0].state;
                        
                        lat=data[0].lat;
                        lon=data[0].lon;
                        console.log(lat,lon)
                        getData(lat,lon);
                    }else{
                        console.log("no data")
                    }

                })
            }else{
                console.log("no data")
            }
        })
        .catch(function(error){
                            
            alert("Unable to connect to OpenWeather One Call API.Check your internet connection")
        })
}
function getData(lat,lon){
    
    var apiUrl="https://api.opentripmap.com/0.1/en/places/radius?radius=100000&lon="+lon+"&lat="+lat+"&kinds=interesting_places&rate=3&limit=10&apikey="+apiKey
    fetch(apiUrl)   
        .then(function(response){
            if (response.ok){
                response.json()
                .then(function(data){
                    console.log(data)
                    
                    var attractionContainer=$("<div class='container'>")
                    for(let i=0; i<data.features.length; i++){
                        
                        var id=(data.features[i].properties.xid)
        
                    var attractionUl=$("<ul class='containerdiv'>")
                    var attractionItem=$("<button>").text(data.features[i].properties.name).attr("id",id)
                    attractionItem.appendTo(attractionUl)
                    attractionUl.appendTo(attractionContainer)
                    attractionContainer.appendTo(attraction)
                    }
                    GetInfo();
                })

            }else{

            }
        })
        .catch(function(err){
            console.log("fetch error:")
        })

}

function GetInfo(){
    // xidNumber='Q5723038'
    $("ul").on("click","button",function(event){
        console.log("click")
        event.preventDefault;
        xidNumber=$(this).attr("id")
        console.log(xidNumber)
    
    
    
    var apiUrlInfo="https://api.opentripmap.com/0.1/en/places/xid/"+xidNumber+"?apikey="+apiKey
    fetch(apiUrlInfo)
        .then(function(response){
            if(response.ok){
                response.json()
                .then(function(data){
                    console.log(data)
                    var imgicon=(data.preview.source)
                   var img=$("<img>").attr("src", imgicon)
                   var address= data.address.county
                   console.log(address)
                   console.log(data.image)
                    var text =$("<p>").text("data.wikipedia_extracts")
                    text.appendTo(attractionInfo)
                    img.appendTo(attractionInfo)
                    
                    
            
                })
            }
        })

    })
}

// $("ul").on("click","button",function(event){
//     console.log("click")
//     event.preventDefault;
//     xidNumber=$(this).attr("id")
//     console.log(xidNumber)


// })
    



Btn.on('click',getLatLon)

