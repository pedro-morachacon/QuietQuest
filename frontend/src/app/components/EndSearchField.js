import React, { useState, useEffect, useRef } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const EndSearchField = ({ setEndLocation }) => {
  const [inputValue, setInputValue] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const provider = new OpenStreetMapProvider({
    params: {
      bounded: 1,
      viewbox: [-74.25909, 40.477398, -73.700181, 40.917577], // Bounding box for New York City
      limit: 5,
      addressdetails: [1],
    },
  });

  const inputRef = useRef(null); // Ref to hold the input element

  useEffect(() => {
    let timer; // Variable to hold the timer ID

    const handleInputChange = async (event) => {
      const value = event.target.value;
      setInputValue(value);

      if (value.trim() !== '') {
        // Clear the previous timer to avoid making premature API requests
        clearTimeout(timer);

        // Set a new timer to wait for 2.5 seconds before making the API request
        timer = setTimeout(async () => {
          const results = await provider.search({ query: value });
          setAutocompleteResults(results);
        }, 250);
      } else {
        setAutocompleteResults([]);
      }
    };

    if (inputRef.current) {
      // Use the inputRef to add the event listener
      inputRef.current.addEventListener('input', handleInputChange);
    }

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      clearTimeout(timer); // Clear the timer when the component is unmounted
      if (inputRef.current) {
        // Use the inputRef to remove the event listener
        inputRef.current.removeEventListener('input', handleInputChange);
      }
    };
  }, []); // Empty dependency array to run the effect only once during component mount

  const handleListItemClick = (result) => {
    const { x: lng, y: lat } = result;
    setEndLocation([lng, lat]);
    setInputValue(result.label.split(', New York County')[0]);
    setAutocompleteResults([]); // Clear the autocomplete results after selecting an address
  };

  return (
    <form className="search_form">
      <input
          className="search_input"
        ref={inputRef} // Use the inputRef here
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Destination"
      />
      {autocompleteResults.length > 0 && (
        <ul>
          {autocompleteResults.map((result, index) => (
            <li key={index} onClick={() => handleListItemClick(result)} >
              {result.label.split(', New York County')[0]}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default EndSearchField;
