import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function IndexSearch(){
  const [data, setData] = useState([]);
  // jadi kita bakal ubah setiap dia dapat 
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

     
      const filterName = (name) => {
        // Convert name to lowercase to make the search case-insensitive
        const lowercasedName = name.toLowerCase();
        return data.filter(item => item.name.common.toLowerCase().includes(lowercasedName));
      };
       const handleClick = (event) => {
        event.preventDefault()
        // const filteredCountries = filterName(searchTerm);
        // setSearchResults(prevResults => [...prevResults, ...filteredCountries.map(item => item.name.common)]);
        const filteredCountries = filterName(searchTerm);
        const newResults = filteredCountries.map(item => ({name:item.name.common
        }));
  
        // Create a Set with previous results and new results to ensure uniqueness
        const uniqueResults = new Set([...searchResults, ...newResults]);
  
      // Convert Set back to an array
        setSearchResults(Array.from(uniqueResults));
       }



  return(
    <>
   
  <form action="" className="   flex flex-wrap gap-1 place-content-center">
    <input type="text" placeholder="Search here" className="  bg-gray-500 rounded w-5/6 border-4 border-transparent active:border-white " id="search" value={searchTerm}
        onChange={handleInputChange}/>
    <button className="bg-green-300 rounded p-1" onClick={handleClick}>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
                >
                  <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>          
              </button> 
    </form>
    <ul>
      {
        searchResults.map((item,index)=>(
          <div key={index} className="flex flex-wrap gap-4 my-4">
              <li  className="bg-blue-300 p-5 w-4/5 rounded place-self-center ">{item.name} </li>
              <Link  to={`/countrySearch/${item.name}`}>
              <button className="bg-pink-400 rounded-lg border-spacing-1 h-full p-5"> Detail</button>
               </Link>
            
          </div>
        
        ))
      }
    </ul>




    
    
    </>
  )
}