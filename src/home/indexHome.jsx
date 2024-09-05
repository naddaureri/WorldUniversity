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
          <div className="flex items-center justify-center ">
          <div className="rounded p-6 bg-green-400">
            <h1 className="text-white font-bold text-2xl mb-4">World University</h1>
            <p className="text-white">
              World University is an application that provides detailed information about various countries around the world. The application is designed to offer users a comprehensive view of different nations, including their demographics, geography, economy, culture, and more.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4  gap-2 mb-4 mt-4">
          {data.slice(0, 4).map((dt) => (
            <Link key={dt.cca2} to={`/pertemuanTujuh/${dt.cca2}`}>
              <ul className="bg-purple-400 rounded-md p-4">
                <li className="line-clamp-1 font-bold rounded-t-md">{dt.name.common}</li>
                <div className="flex flex-wrap gap-2">
                {dt.flags && dt.flags.svg ? (
                  <img src={dt.flags.svg} alt={`Flag of ${dt.name.common}`} style={{ width: '25px', height: '25px' }} />
                ) : (
                  <p>Loading flag...</p>
                )}
                <p>{dt.capital}</p>

                </div>
                
              </ul>
            </Link>
          ))}
        </div>



        <div className="grid grid-rows-5 gap-3">
           
          <div className="about bg-purple-400 ">
            <h1>Home</h1>
            <p>Features: Displays a brief overview of WorldUniversity, highlights key features, and shows popular countries with basic details like name and flag.</p>

         </div>
         
         <div className="about bg-purple-400">
            <h1>Country Search</h1>
            <p>Features: Displays a brief overview of WorldUniversity, highlights key features, and shows popular countries with basic details like name and flag.</p>

         </div>
         <div className="about bg-purple-400">
            <h1>Country Detail</h1>
            <p>Features: Displays a brief overview of WorldUniversity, highlights key features, and shows popular countries with basic details like name and flag.</p>

         </div>
         <div className="about bg-purple-400">
            <h1>Country Filter</h1>
            <p>Features: Displays a brief overview of WorldUniversity, highlights key features, and shows popular countries with basic details like name and flag.</p>

         </div>
         <div className="about bg-purple-400">
            <h1>About</h1>
            <p>Features: Displays a brief overview of WorldUniversity, highlights key features, and shows popular countries with basic details like name and flag.</p>

         </div>

            </div>
       


        </>
    )
                }