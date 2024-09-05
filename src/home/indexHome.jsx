import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexHome(){
    const [data, setData] = useState([]);
    function ambilData() {
        axios.get('https://restcountries.com/v3.1/all')
          .then(function (response) {
            setData(response.data);
          })
          .catch(function (error) {
            console.log(error);
            return null;
          })
          .finally(function () {
            console.log("We are done");
          });
      }
      useEffect(() => {
        ambilData();
      }, []);
    return(
        <>
         <div className="bg-gradient-to-r from-green-600 to-green-300">
         <div className="flex items-center justify-center bg-gradient-to-r from-green-600 to-green-300">
          <div className="rounded p-6 bg-green-400 border-4 hover:border-white hover:border-2">
            <h1 className="text-white font-bold text-2xl mb-4 ">World University</h1>
            <p className="text-white hover:text-gray-500">
              World University is an application that provides detailed information about various countries around the world. The application is designed to offer users a comprehensive view of different nations, including their demographics, geography, economy, culture, and more.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4  gap-2 mb-4 mt-4">
          {data.slice(0, 4).map((dt) => (
            <Link key={dt.cca2} to={`/pertemuanTujuh/${dt.cca2}`}>
              <ul className="bg-purple-400 rounded-md p-4">
                <li className="line-clamp-1 font-bold rounded-t-md text-white">{dt.name.common}</li>
                <div className="flex flex-wrap gap-2">
                {dt.flags && dt.flags.svg ? (
                  <img src={dt.flags.svg} alt={`Flag of ${dt.name.common}`} style={{ width: '25px', height: '25px' }} />
                ) : (
                  <p>Loading flag...</p>
                )}
                <p className="text-white">Capital City :{dt.capital}</p>

                </div>
                
              </ul>
            </Link>
          ))}
        </div>



        <div className="grid grid-rows-5 gap-3 text-white">
           
          <div className="about bg-purple-400 text-white hover:bg-blue-400">
            <h1>Home</h1>
            <p>Welcome to WorldUniversity, your gateway to exploring countries from all corners of the globe. Here, you'll find an overview of our platform’s features, designed to provide you with quick access to essential country information. Browse popular countries, view their flags, and get a glimpse of what each nation has to offer. Whether you're researching for academic purposes or simply curious, WorldUniversity is your trusted resource for discovering the world, one country at a time. Start your journey now!</p>

         </div>
         
         <div className="about bg-purple-400  hover:bg-blue-400">
            <h1>Country Search</h1>
            <p>Easily explore countries from around the world using our powerful search feature. Simply type the name of a country into the search bar, and the list will automatically filter to display matching results. Whether you're looking for popular nations or rare destinations, our search tool provides quick access to essential information like the country’s name, flag, and more. Click on a country to discover detailed insights, including capital, population, and language. Discover the world at your fingertips!</p>

         </div>
         <div className="about bg-purple-400  hover:bg-blue-400">
            <h1>Country Detail</h1>
            <p>Displays a brief overview of WorldUniversity, highlights key features, and shows popular countries with basic details like name and flag.</p>

         </div>
         <div className="about bg-purple-400  hover:bg-blue-400">
            <h1>Country Filter</h1>
            <p>Dive deeper into the rich details of each country with our Country Detail page. Once you've selected a country, you’ll find comprehensive information, including the country’s flag, capital city, population, area, official language, currency, and more. This page provides you with a thorough look at the unique aspects of each nation, helping you understand its culture, geography, and key facts. Whether for study, travel, or curiosity, this is your go-to source for in-depth country insights.</p>

         </div>
         <div className="about bg-purple-400  hover:bg-blue-400">
            <h1>About</h1>
            <p>Displays a brief overview of WorldUniversity, highlights key features, and shows popular countries with basic details like name and flag.</p>

         </div>

            </div>
       

         </div>


        </>
    )
                }