import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Folders from './Components/Folders';
import EditGroup from './Components/editGroup';
import { initData } from './data/data';
import './App.css';
import { Component } from 'react';
import { getData } from "./data/data.service"

function App() {

  // Change the name of in the storage to be in the env file or something...
  // // @ts-ignore
  // chrome.storage.sync.get([CHROME_STORAGE_LOCATION], function(items){
  //   if(items[CHROME_STORAGE_LOCATION]){
  //     initData(items[CHROME_STORAGE_LOCATION]);
  //   }
  // });

  useEffect(() => {
    getData().then(items => {
      console.log(items);
        if(!!items){
          initData(items);
        }
    })
  }, []);

  return (
    <BrowserRouter >
      <Routes >
        <Route path="/folders" element={<Folders />}>
        </Route>
        <Route path="/editgroup/:id" element={<EditGroup />}>
        </Route>
        <Route path="/index.html" element={<Folders />}>
          {/* <Navigate replace to="/" /> */}
        </Route>
      </Routes >
    </BrowserRouter>
  );
}

export default App;
