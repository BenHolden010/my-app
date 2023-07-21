import React, { ChangeEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import { searchCities, getCity }from './ApiCalls'
import { useState, useEffect } from 'react';
import Card from "./Components/Card";


function App() {
  const [locationName, setLocationName] = useState<string>("")
  const [locationRegion, setLocationRegion] = useState<string>("")
  const [locationCountry, setLocationCountry] = useState<string>("")
  const [input, setInput] = useState<string>("")
  const [temp, setTemp] = useState<number>(0)
  const [conditionText, setConditionText] = useState<string>('')
  const [conditionIcon, setConditionIcon] = useState<string>('')
  const [locations, setLocations] =useState<[]>([])
  
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value)
  }
  
  useEffect(() => {
    // if (!input) {
    //   return <p>"Please enter a Location"</p>
    // }
    searchCities(input)
    .then(data => setLocations(data))
    // .then(data => setTemp(data.current.temp_f))
  }, [input])

  useEffect(() => {
    getCity(input)
    .then(data => {
      setTemp(data?.current?.temp_f)
      setLocationName(data?.location?.name)
      setLocationRegion(data?.location?.region)
      setLocationCountry(data?.location?.country)
      setConditionText(data?.current?.condition?.text)
      setConditionIcon(data?.current?.condition?.icon)
    })
    // .then(data=>{
    //   console.log(data.current.temp_f)
    //   if(data.current.temp_f){
    //     return console.log(data.current.temp_f)
    //   }
    //   return console.log("Please enter valid location")
    // })
  }, [input])
  // console.log(locations)
  // console.log(condition)

  return (
    <div className="app">
      <h1>Select Your Location</h1>
      <input type="text" placeholder="search for city here" onChange={handleChange}></input>
      {/* <button>SEARCH</button> */}
      <section className="weather-card-container">
      {locationName && <Card temp={temp} locationName={locationName} conditionText={conditionText}
         conditionIcon={conditionIcon} locationRegion={locationRegion} locationCountry={locationCountry}/>}
      </section>
      {/* <h1>{input}</h1>
      <h2>{temp}</h2>
      <h2>{condition}</h2> */}
    </div>
  )
}


export default App;