import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './config/firebase-config';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [country, setCountry] = useState('');

  useEffect(() => {
    const colRef = collection(db, 'clicks');
    const countDocRef = doc(colRef, 'count');
    const getCount = async () => {
      try {
        const docSnap = await getDoc(countDocRef);
        if (docSnap.exists()) {
          const { count } = docSnap.data();
          setCount(count);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    getCount();
  }, []);

  const handleClick = async () => {
    const colRef = collection(db, 'clicks');
    const countDocRef = doc(colRef, 'count');
    try {
      await updateDoc(countDocRef, { count: count + 1 });
      setCount(count + 1);
      getCountry();
    } catch (err) {
      console.log(err);
    }
  };

  const getCountry = async () => {
    const apiKey = 'f58f7409169949fa975dd880a339d517';
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const endpoint = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&no_annotations=1&language=en`;

      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          const country = data.results[0].components.country;
          setCountry(country);
        })
        .catch(error => console.error(error));
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <button onClick={handleClick}>Click me!</button>
      <p>Total clicks: {count}</p>
      <p>Country: {country}</p>
    </div>
  );
}

export default App;
