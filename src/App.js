
import React, { useState } from 'react';
import './styles.css';

const LEVEL_1 = [
  { "id": 0, "value": "DATA SEGMENT" },
  { "id": 1, "value": "NUM1 DB 9H" },
  { "id": 2, "value": "NUM2 DB 7H" },
  { "id": 3, "value": "RESULT DB ?" },
  { "id": 4, "value": "ENDS #DATA SEGMENT" },
  { "id": 5, "value": "CODE SEGMENT" },
  { "id": 6, "value": "ASSUME DS:DATA CS:CODE" },
  { "id": 7, "value": "START:" },
  { "id": 8, "value": "MOV AX,DATA" },
  { "id": 9, "value": "MOV DS,AX" },
  { "id": 10, "value": "MOV AL,NUM1" },
  { "id": 11, "value": "ADD AL,NUM2" },
  { "id": 12, "value": "MOV RESULT,AL" },
  { "id": 13, "value": "MOV AH,4CH" },
  { "id": 14, "value": "INT 21H" },
  { "id": 15, "value": "ENDS" },
  { "id": 16, "value": "END START" }
];

const shuffle = (arr) => {
  arr = arr.slice(0);
  const len = arr.length;
  const out = [];
  for (let i = len; i > 0; i--) {
    const rnd = Math.floor(Math.random() * i);
    out.push(arr[rnd]);
    arr.splice(rnd, 1);
  }
  return out;
}

function App() {
  const [arr1, setArr1] = useState(shuffle(LEVEL_1));
  const [arr2, setArr2] = useState([]);

  const AddHandleClick = (e) => {
    arr2.push(e);
    setArr2(arr2.slice(0));
    const filterArr = arr1.filter(item => item.id !== e.id);
    setArr1(filterArr);
  }
  const SubHandleClick = (e) => {
    arr1.push(e);
    setArr1(arr1.slice(0));
    const filterArr = arr2.filter(item => item.id !== e.id);
    setArr2(filterArr)
  }
  const compairArrays = () => {
    const isValid = JSON.stringify(LEVEL_1) === JSON.stringify(arr2);
    console.log(isValid);
  }
  return (
    <div className="container">
      <div style={{ flex: 1, display: 'flex', flexDirection: "row" }}>
        <div className="card1">
          {arr1.map(item => {
            return (
              <div key={item.id} onClick={() => AddHandleClick(item)}>
                <h3>{item.value}</h3>
              </div>
            )
          })}
        </div>
        <div className="card2">
          {arr2.map(item => {
            return (
              <div key={item.id} onClick={() => SubHandleClick(item)}>
                <h3>{item.value}</h3>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <button onClick={() => compairArrays()}>SUBMIT</button>
      </div>
    </div>
  );
}

export default App;
