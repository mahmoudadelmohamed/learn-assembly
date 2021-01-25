
import React, { useEffect, useState } from 'react';
import './styles.css';
import { Card, Typography, CardContent, CardHeader, AppBar, Toolbar, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Confetti from 'react-confetti';
import firebase from 'firebase/app';
import 'firebase/database'

const app = firebase.initializeApp(
  {
    apiKey: "AIzaSyDa40FkWIaOuFGfq39nhGo6myhvqzwEnT4",
    authDomain: "learn-assembly.firebaseapp.com",
    databaseURL: "https://learn-assembly-default-rtdb.firebaseio.com",
    projectId: "learn-assembly",
    storageBucket: "learn-assembly.appspot.com",
    messagingSenderId: "900563877724",
    appId: "1:900563877724:web:36c1a600d62b534edd0b99",
    measurementId: "G-NJTTJYV0KG"
  },
);


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
  const [levels, setLevels] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    const a = async () => {
      const snap = await app.database().ref('levels').get();
      const val = snap.val();
      setLevels(val);
      setArr1(generateArray(val[0]))
      console.log(val);
      setLoading(false);
    }
    a();
  }, [])

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
  if (isLoading) {
    return (
      <div className="container">
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2" style={{
            color: 'green'
          }}>Loading...</Typography>
        </div>
      </div>
    );
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
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2" style={{
            color: 'green'
          }}>Congratulations you have learned assembly!</Typography>
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
          <Typography
            variant="h4"
            style={{
              flex: 1
            }}
          >{`Level ${currentLevel + 1}`}</Typography>
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
