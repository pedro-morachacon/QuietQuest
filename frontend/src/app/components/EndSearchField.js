import React, { useState, useEffect, useRef } from 'react';
import {GoogleProvider} from 'leaflet-geosearch';

const EndSearchField = ({ setEndLocation, setEndInputValue, savedRouteAddress }) => {
  const [inputValue, setInputValue] = useState(savedRouteAddress || '');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const provider = new GoogleProvider({
    apiKey:'AIzaSyB6QE55spfSZJU3WEDAsB28z4Y0_k_D7iE',
  });

  const inputRef = useRef(null); // Ref to hold the input element

  useEffect(() => {
    setInputValue(savedRouteAddress || '');
  }, [savedRouteAddress]);

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
        }, 150);
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
    setEndInputValue(result.label);
    setInputValue(result.label);
    setAutocompleteResults([]); // Clear the autocomplete results after selecting an address
  };

  return (
    <form id="end-search-form">
      <input
        ref={inputRef} // Use the inputRef here
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter Destination"
      />
      {autocompleteResults.length > 0 && (
        <ul>
          {autocompleteResults.slice(0, 5).map((result, index) => (
            <li key={index} onClick={() => handleListItemClick(result)}>
              {result.label}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default EndSearchField;
