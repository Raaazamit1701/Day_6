import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Grocery = () => {
  const [items, setItems] = useState("");
  const [data, setData] = useState([]);
  const notify1 = () => toast("Write something !!",{ position: "top-center" });
  const notify2 = () => toast("deleted Sucessfully",{ position: "top-center" });
  const notify3 = () => toast("Added Sucessfully",{ position: "top-center" });
  

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("groceryList");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(data));
  }, [data]);

  const Additems = () => {
    if (items === "") {
      notify1(); // Correctly calling notify function
      return;
    }
    notify3();
    
    const list_item = {
      text: items,
      toggle: false
    };
    setData(prevData => [...prevData, list_item]);
    setItems("");
  };

  const deleteData = (id) => {
    const updatedData = data.filter((_, idx) => idx !== id);
    setData(updatedData);
    notify2(); // Show notification after deleting item
  };

  const toggleItem = (id) => {
    const updatedData = data.map((item, idx) => {
      if (idx === id) {
        return { ...item, toggle: !item.toggle };
      }
      return item;
    });
    setData(updatedData);
  };

  return (
    <>
      <div className="shadow-gray-500 shadow-md p-10 w-[60%] m-auto">
        <h2 className="text-lime-300 m-5 text-3xl font-bold">Grocery</h2>
        <input
          type="text"
          placeholder="Add more items ..."
          className="m-2 border border-green-800"
          value={items}
          onChange={(e) => setItems(e.target.value)}
        />
        <button
          className="bg-blue-700 text-white font-mono rounded-lg w-[100px]"
          onClick={Additems}
        >
          Add Items
        </button>

        <div>
          {data.map((item, idx) => (
            <li className="list-none flex justify-evenly text-left m-5" key={idx}>
              <input
                type="checkbox"
                checked={item.toggle}
                onChange={() => toggleItem(idx)}
              />
              <h1 className={item.toggle ? "line-through" : ""}>{item.text}</h1>
              <button
                className="bg-blue-800 text-white items-center rounded-md"
                onClick={() => deleteData(idx)}
              >
                delete
              </button>
            </li>
          ))}
        </div>
      </div>
      <ToastContainer /> {/* ToastContainer component for displaying notifications */}
    </>
  );
};

export default Grocery;
