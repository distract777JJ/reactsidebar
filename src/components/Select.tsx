import React, { useEffect, useState } from 'react';
import { Select, MenuItem ,SelectChangeEvent,FormControl, InputLabel } from '@mui/material';
//下拉選單少量

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

// Define an interface for the data
interface MyData {
    id: number|string;
    name: string;
  }


  export default function BasicSelect(url:string) {
    const [data, setData] = useState<MyData[]>([]);
    const [selectedValue, setSelectedValue] = React.useState('');
  
    useEffect(() => {
      // Fetch data from your API here
      fetch(url)
        .then((response) => response.json())
        .then((apiData) => {
          // Assuming the API response is an array of objects with 'id' and 'name' properties
          setData(apiData);
        })
        .catch((error) => {
          console.error('API request failed:', error);
        });
    }, []);


    const handleChange =  (event: SelectChangeEvent) => {
        setSelectedValue(event.target.value as string); // Use the correct type
      };
  
    return (
      <div>
        <Select
          value={selectedValue}
          onChange={handleChange}
          autoWidth
        >
          {data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }
  

  
  export function SearchableSelect(url:string) {
    const [data, setData] = useState<MyData[]>([]);
    const [selectedValues, setSelectedValues] = useState<MyData[]>([]);
    const [inputValue, setInputValue] = React.useState('');
  
    useEffect(() => {
      // Fetch data from your API here
      fetch(url)
        .then((response) => response.json())
        .then((apiData: MyData[]) => {
          setData(apiData);
        })
        .catch((error) => {
          console.error('API request failed:', error);
        });
    }, []);
  
    const handleInputChange = (event: React.SyntheticEvent, newInputValue:string) => {
      setInputValue(newInputValue);
    };
  
    const handleSelectionChange = (
      event: React.SyntheticEvent,
      newValue: MyData[]
    ) => {
      setSelectedValues(newValue);
    };
  
    return (
      <div>
        <Autocomplete
          multiple
          id="my-select"
          autoHighlight
          options={data}
          getOptionLabel={(option) => option.name}
          value={selectedValues}
          onChange={handleSelectionChange}
          inputValue={inputValue}
          // onInputChange={(event, newInputValue) => {
          //   setInputValue(newInputValue);
          // }}
          onInputChange={handleInputChange}
          renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
               
                '('+{option.id}+')'+{option.name}
              </Box>
            )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Select"
              placeholder="Search or select items"
            />
          )}
        />
      </div>
    );
  }
  

  export function SelectFixed({ mydata }: { mydata: MyData[] }) {
    return (
      <FormControl variant="outlined">
        <InputLabel htmlFor="my-select">Select Option</InputLabel>
        <Select
          label="Select Option"
          inputProps={{
            id: 'my-select',
          }}
        >
          {mydata.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  
  export function RelatedSelects(MURL:string,DURL:string) {
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [countryData, setCountryData] = useState<MyData[]>([]);
    const [cityData, setCityData] = useState<{ [key: string]: MyData[] }>({});
    const cities = cityData[selectedCountry] || [];
  

    useEffect(() => {
        // Fetch country data from the API
        fetch(MURL)
          .then((response) => response.json())
          .then((data) => setCountryData(data))
          .catch((error) => console.error('Error fetching countries:', error));
    
        // Fetch city data from the API
        fetch(DURL)
          .then((response) => response.json())
          .then((data) => setCityData(data))
          .catch((error) => console.error('Error fetching cities:', error));
      }, []);
    
      const handleCountryChange = (event:SelectChangeEvent) => {
        const selectedCountryValue = event.target.value;
        setSelectedCountry(selectedCountryValue);
        setSelectedCity('');
      };
    
      const handleCityChange = (event:SelectChangeEvent) => {
        const selectedCityValue = event.target.value;
        setSelectedCity(selectedCityValue);
      };

  return (
    <div>
      <FormControl>
        <InputLabel>Country</InputLabel>
        <Select value={selectedCountry} onChange={handleCountryChange}>
          {countryData.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>City</InputLabel>
        <Select value={selectedCity} onChange={handleCityChange}>
          {cities.map((city) => (
            <MenuItem key={city.id} value={city.id}>
              {city.name}
            </MenuItem> 
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
