
import React, { useState } from 'react';
import './styles.css';
import { Card, Typography, CardContent, CardHeader, AppBar, Toolbar, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Confetti from 'react-confetti';

const levels = [
  [
    { value: "DATA SEGMENT", description: "DATA SEGMENT", order: [0,], count: 1 },
    // { value: "NUM1 DB 9H", description: "NUM1 DB 9H", order: [1, 2, 3], count: 1 },
    // { value: "NUM2 DB 7H", description: "NUM2 DB 7H", order: [1, 2, 3], count: 1 },
    // { value: "RESULT DB ?", description: "RESULT DB ?", order: [1, 2, 3], count: 1 },
    // { value: "ENDS", description: "ENDS", order: [4, 15], count: 2 },
    // { value: "CODE SEGMENT", description: "CODE SEGMENT", order: [5,], count: 1 },
    // { value: "ASSUME DS:DATA CS:CODE", description: "ASSUME DS:DATA CS:CODE", order: [6,], count: 1 },
    // { value: "START:", description: "START:", order: [7,], count: 1 },
    // { value: "MOV AX,DATA", description: "MOV AX,DATA", order: [8,], count: 1 },
    // { value: "MOV DS,AX", description: "MOV DS,AX", order: [9,], count: 1 },
    // { value: "MOV AL,NUM1", description: "MOV AL,NUM1", order: [10,], count: 1 },
    // { value: "ADD AL,NUM2", description: "ADD AL,NUM2", order: [11,], count: 1 },
    // { value: "MOV RESULT,AL", description: "MOV RESULT,AL", order: [12,], count: 1 },
    // { value: "MOV AH,4CH", description: "MOV AH,4CH", order: [13,], count: 1 },
    // { value: "INT 21H", description: "INT 21H", order: [14,], count: 1 },
    // { value: "END START", description: "END START", order: [16,], count: 1 },
  ],
  [
    { value: "DATA SEGMENT", description: "DATA SEGMENT", order: [0,], count: 1 },
    // { value: "NUM1 DB 9H", description: "NUM1 DB 9H", order: [1, 2, 3], count: 1 },
    // { value: "NUM2 DB 7H", description: "NUM2 DB 7H", order: [1, 2, 3], count: 1 },
    // { value: "RESULT DB ?", description: "RESULT DB ?", order: [1, 2, 3], count: 1 },
    // { value: "ENDS", description: "ENDS", order: [4,], count: 2 },
    // { value: "CODE SEGMENT", description: "CODE SEGMENT", order: [5,], count: 1 },
    // { value: "ASSUME DS:DATA CS:CODE", description: "ASSUME DS:DATA CS:CODE", order: [6,], count: 1 },
    // { value: "START:", description: "START:", order: [7,], count: 1 },
    // { value: "MOV AX,DATA", description: "MOV AX,DATA", order: [8,], count: 1 },
    // { value: "MOV DS,AX", description: "MOV DS,AX", order: [9,], count: 1 },
    // { value: "MOV AL,NUM1", description: "MOV AL,NUM1", order: [10,], count: 1 },
    // { value: "ADD AL,NUM2", description: "ADD AL,NUM2", order: [11,], count: 1 },
    // { value: "MOV RESULT,AL", description: "MOV RESULT,AL", order: [12,], count: 1 },
    // { value: "MOV AH,4CH", description: "MOV AH,4CH", order: [13,], count: 1 },
    // { value: "INT 21H", description: "INT 21H", order: [14,], count: 1 },
    // { value: "END START", description: "END START", order: [16,], count: 1 },
  ]
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CodeCard({ item, onClick }) {
  return (
    <Card className="code-card" key={item.id} onClick={onClick}>
      <CardHeader
        title={item.value}
      />
      <CardContent>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

function App() {
  const [arr1, setArr1] = useState(generateArray(levels[0]));
  const [arr2, setArr2] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);

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
  const compareArrays = () => {
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
  if (currentLevel === levels.length) {
    return (
      <div className="container">
        <Confetti
          initialVelocityY={{
            min: 20,
            max: 50,
          }}
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
          }}
        >
          <Typography variant="h2" color="success">Congratulations you have learned assembly!</Typography>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="error">
          Incorret! Try again
        </Alert>
      </Snackbar>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => {
            const isValid = compareArrays();
            if (!isValid) {
              setSnackbarOpen(true);
            }
            else {
              setCurrentLevel(currentLevel + 1);
              if (currentLevel + 1 < levels.length) {
                setArr1(generateArray(levels[currentLevel + 1]));
                setArr2([]);
              }
            }
          }}>Submit</Button>
        </Toolbar>
      </AppBar>
      <div style={{ flex: 1, display: 'flex', flexDirection: "row" }}>
        <div className="card1">
          {arr1.map((item, index) => {
            return (
              <CodeCard item={item} onClick={() => AddHandleClick(index)} />
            )
          })}
        </div>
        <div className="card2">
          {arr2.map((item, index) => {
            return (
              <CodeCard item={item} onClick={() => SubHandleClick(index)} />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
