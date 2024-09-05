import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import axios from "axios";
import { data } from "autoprefixer";

export default function Dropdown() {
    const [region, setRegion] = useState([]);
    const [lang, setLang] = useState([]);
    const [array, setArray] = useState(["true", "false"]); // Misalnya, boolean sebagai string
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isClick, setClick] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(response => {
                const data = response.data;

                // Olah `region` untuk mendapatkan nilai unik
                const uniqueRegion = [...new Set(data.map(item => item.region))];
                setRegion(uniqueRegion);

                // Olah `languages` untuk mendapatkan nilai unik
                const languageSet = new Set();
                data.forEach(item => {
                    if (item.languages) {
                        Object.values(item.languages).forEach(language => languageSet.add(language));
                    }
                });
                setLang([...languageSet]);

                // Olah `independent` untuk mendapatkan nilai unik
                const independentSet = new Set(data.map(item => item.independent ? "true" : "false"));
                setArray([...independentSet]);
            })
            .catch(error => console.error("Error fetching data: ", error));
    }, []);

    const handleClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false); // Tutup dropdown setelah memilih
    };

    const handleClicked = (item) => {
        setSelectedCategories(item);
    };

    const load = () => {
        let url = "";
        if (selectedItem === "region") {
            url = `https://restcountries.com/v3.1/region/${selectedCategories}`;
        } else if (selectedItem === "lang") {
            url = `https://restcountries.com/v3.1/lang/${selectedCategories}`;
        } else if (selectedItem === "independent") {
            if (selectedCategories === "true" || selectedCategories === "false") {
                url = `https://restcountries.com/v3.1/independent?status=${selectedCategories}`;
            }
        }

        if (url) {
            axios.get(url)
                .then(response => {
                    setData(response.data);
                    setClick(true);
                })
                .catch(error => console.error("Error fetching data: ", error));
        }
    };

    const getDataForSelectedItem = () => {
        switch (selectedItem) {
            case "region":
                return region;
            case "lang":
                return lang;
            case "independent":
                return array;
            default:
                return [];
        }
    };

    const dataToDisplay = getDataForSelectedItem();
    return (<>
        {!isClick && (
            <div className="relative flex flex-col items-center w-full ">
            <div className="relative flex flex-col items-center w-[750px] bg-gray-100">
                <button
                    className="bg-blue-500 p-4 w-full flex items-center font-bold rounded-lg tracking-wider border-5 border-transparent active:border-white active:text-white"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    Filter Country 
                    {!isOpen ? (
                        <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                    ) : (
                        <FontAwesomeIcon icon={faChevronUp} className="ml-2" />
                    )}
                </button>
                {isOpen && (
                    <div className="bg-blue-500 mt-2 rounded-lg shadow-lg w-full">
                        {["region", "lang", "independent"].map((item, i) => (
                            <div key={i} className="p-2 hover:bg-blue-700" onClick={() => handleClick(item)}>
                                <h3>{item}</h3>
                            </div>
                        ))}
                    </div>
                )}
                {selectedItem && (
                    <div className="bg-blue-100 mt-2 rounded-lg shadow-lg w-full">
                        {dataToDisplay.map((item, i) => (
                            <div key={i} className="p-2 hover:bg-blue-300" onClick={()=>handleClicked(item)}>
                                <h3>{item}</h3>
                            </div>
                        ))}
                    </div>
                )}
                {selectedCategories && (
                   <button className="bg-pink-500 border-transparent rounded-lg p-5" onClick={()=>load()}>Submit</button>
                )}
                 
            </div>
          
            </div>)}
        
        {isClick && (
                 <div className="flex flex-wrap  justify-center">
                 {data && (
                   <div>{
                       data.map((item,i)=>
                       (
                           <div className="p-4 w-full  mb-4">
                                <div key={i} className="p-2 my-3 w-full rounded-lg border-4 border-black place-content-center bg-pink-400 hover:bg-blue-300 flex flex-col items-center text-center" >
                               <h3 className="font-bold place-items-center"> Name : {item.name.common}</h3>
                               <img src={item.flags.png} alt="Fetched PNG" />
                               </div>
                           </div>
                          
                       )
                       )
                       
                   }      
                   </div>  
               )}
           </div>
            )}
        </>
      
    );
}
