import React, { useState, useEffect } from 'react';

function Temp() {
  // Define state variable and setter function
  const [myVariable, setMyVariable] = useState("");

  // Function to handle changes to myVariable
  const handleChange = (event) => {
    setMyVariable(event.target.value);
  };

  // useEffect hook to save myVariable to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('myVariable', myVariable);
  }, [myVariable]);

  // useEffect hook to retrieve myVariable from local storage when component mounts
  useEffect(() => {
    const storedVariable = localStorage.getItem('myVariable');
    if (storedVariable) {
      setMyVariable(storedVariable);
    }
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return (
    <div>
      <input type="text" value={myVariable} onChange={handleChange} />
      <p>Value stored in local storage: {myVariable}</p>
    </div>
  );
}

export default Temp;
