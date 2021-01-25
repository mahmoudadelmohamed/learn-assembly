
import React, { useState } from 'react';
import './styles.css';

const LEVEL_1 = [
  { "value": "DATA SEGMENT", order: [0,], count: 1 },
  { "value": "NUM1 DB 9H", order: [1, 2, 3], count: 1 },
  { "value": "NUM2 DB 7H", order: [1, 2, 3], count: 1 },
  { "value": "RESULT DB ?", order: [1, 2, 3], count: 1 },
  { "value": "ENDS", order: [4, 15], count: 2 },
  { "value": "CODE SEGMENT", order: [5,], count: 1 },
  { "value": "ASSUME DS:DATA CS:CODE", order: [6,], count: 1 },
  { "value": "START:", order: [7,], count: 1 },
  { "value": "MOV AX,DATA", order: [8,], count: 1 },
  { "value": "MOV DS,AX", order: [9,], count: 1 },
  { "value": "MOV AL,NUM1", order: [10,], count: 1 },
  { "value": "ADD AL,NUM2", order: [11,], count: 1 },
  { "value": "MOV RESULT,AL", order: [12,], count: 1 },
  { "value": "MOV AH,4CH", order: [13,], count: 1 },
  { "value": "INT 21H", order: [14,], count: 1 },
  { "value": "END START", order: [16,], count: 1 },
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

const generateArray = (level) => {
  let out = [];
  level.forEach((val) => {
    out = out.concat(Array(val.count).fill(val))
  });
  return shuffle(out);
}


function App() {
  const [arr1, setArr1] = useState(generateArray(LEVEL_1));
  const [arr2, setArr2] = useState([]);

  const AddHandleClick = (index) => {
    arr2.push(arr1[index]);
    setArr2(arr2.slice(0));
    const newArr1 = arr1.slice(0);
    newArr1.splice(index, 1);
    setArr1(newArr1);
  }
  const SubHandleClick = (index) => {
    arr1.push(arr2[index]);
    setArr1(arr1.slice(0));
    const newArr2 = arr2.slice(0);
    newArr2.splice(index, 1);
    setArr2(newArr2)
  }
  const compairArrays = () => {
    let isValid = true;
    if (arr1.length) {
      isValid = false;
    } else {
      arr2.forEach((val, index) => {
        if (!val.order.includes(index)) {
          isValid = false
        }
      });
    }
    console.log(isValid);
    return isValid;
  }
  return (
    <div className="container">
      <div style={{ flex: 1, display: 'flex', flexDirection: "row" }}>
        <div className="card1">
          {arr1.map((item, index) => {
            return (
              <div key={item.id} onClick={() => AddHandleClick(index)}>
                <h3>{item.value}</h3>
              </div>
            )
          })}
        </div>
        <div className="card2">
          {arr2.map((item, index) => {
            return (
              <div key={item.id} onClick={() => SubHandleClick(index)}>
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
