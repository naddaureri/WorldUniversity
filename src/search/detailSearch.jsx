import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function DetailSearch(){
    const [data,setData]=useState(null);
    const {name} = useParams();
    useEffect(() => {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => {
          setData(response.data[0]); // Use the first matching country
        })
        .catch((error) => {
          console.log(error);
        });
    }, [name]);

    const mapContainerStyle = {
      width: '100%',
      height: '400px',
    };

    
    if (!data) {
      return <p>Loading...</p>;
    }
    const location = {
      lat: data.latlng[0],  // 36.0 (latitude)
      lng: data.latlng[1]   // 138.0 (longitude)
    };
  
    const currencies = data.currencies || {};
    const currencyEntries = Object.entries(currencies);
    const languanges = data.languages || {};
    const languangeEntries = Object.entries(languanges);

    
    return(
              <>
              <div className="bg-blue-300 rounded flex flex-wrap">
         <div>
            <div className="font-bold text-2xl">{data.name.common}</div>
              <img src={data.flags.png} alt="Fetched PNG" />
         </div>

         <div className="data">

         <div className="">Capital : {data.capital}</div>
          <div className="">Population : {data.population}</div>
          <div className="">Area : {data.area}</div>
          
          {currencyEntries.length > 0 ? (
            currencyEntries.map(([currencyCode, currencyInfo]) => (
              <div key={currencyCode}>
                <div className="">Currency name : {currencyInfo.name}</div>
                <div className="">Currency symbol : {currencyInfo.symbol}</div>
              </div>
            ))
          ) : (
            <p>Error</p>
          )}
          
          {languangeEntries.length > 0 ? (
            languangeEntries.map(([languageCode, languageInfo]) => (
              <div key={languageCode}>
                <div className="">Language : {languageInfo}</div>
              </div>
            ))
          ) : (
            <p>Error</p>
          )}
         </div>

         <LoadScript googleMapsApiKey="AIzaSyCAGflOKotTXRXaqHmdO51GT9r-w-b-eUE">
              <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={location}
              zoom={10}
              >
              <Marker position={location} />
            </GoogleMap>
    </LoadScript>
          
        </div>

       </>
       
    )
}