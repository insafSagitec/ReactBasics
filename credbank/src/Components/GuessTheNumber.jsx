import React, { useEffect, useState } from "react";

function GuessTheNumber()
{
    const [randomNumber, setRandomNumber] = useState(0);
    const [selectedNumber, setSelectedNumber] = useState(0);
    const [guessCounter, setGuessCounter] = useState(0);
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [gamestartText, setGameStartText] = useState("Start Now")
    const [guessText, setGuessText] = useState("")
    const [priorGuessNumbers, setPriorGuessNumbers] = useState([])

    useEffect(()=>{
        setDisableSubmit(true)
    },[])

    useEffect(function(){
        if(guessCounter > 9)
        {
            setDisableSubmit(true)
            setGameStartText("Play Again")
        }
        else if(guessCounter > 0){
            setGameStartText("Start Now")
            setDisableSubmit(false)
        }
    },[guessCounter])

    useEffect(()=>{console.log(disableSubmit)},[disableSubmit])

    function setMyRandomNumber() {
      const newNumber = Math.floor(Math.random() * 100) + 1;
      setRandomNumber(newNumber);
      setDisableSubmit(false)
      setGuessCounter(0);
      setSelectedNumber(0);
      setGuessText("");
      setPriorGuessNumbers([]);
    }

    const setGuessNumber = (e) => {
    //   console.log(e);
    let selectedNum = 0;
    if(Number(e.target.value) > 100)
    {
        selectedNum = 100
    }
    else{
         selectedNum = Number(e.target.value);
    }   
      setSelectedNumber(selectedNum);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (selectedNumber === randomNumber) {
        setGuessText("Awesome, you guessed it correctly 🎊");
    } else if (selectedNumber < randomNumber) {
        setGuessText("Try a higher number 🔼");
    } else {
        setGuessText("Try a lower number 🔽");
    }

    setPriorGuessNumbers([...priorGuessNumbers, selectedNumber])
      setGuessCounter(prev => prev+1)
      console.log(randomNumber);
    };

    return(
        <>
        <button id="btnStart" onClick={setMyRandomNumber} style={{color:"darkgreen"}}>{gamestartText}</button>
        <h3 style={selectedNumber === randomNumber ? {color:"green"} :{color:"red"}}>{guessText}</h3>
        <label>Numbers : {priorGuessNumbers.join(", ")}</label>
        <form onSubmit={handleSubmit}>
            <label>Please select a number between 1 to 100 : </label> <input type="text" min="1" max="100" disabled={disableSubmit} onChange={setGuessNumber} value={selectedNumber}></input>
            <br />
            <p>Total guess left : {10- guessCounter}</p>
            <br />
            <button type="submit" disabled={disableSubmit} style={disableSubmit?{color:"teal"} : {color:"goldenrod"}}>Check This</button>
            {/* {
                disableSubmit === false ? (<button type="submit">Check this</button>) :
                (<button type="submit" style={{disabled:"disabled"}}>Check this</button>)
            } */}
        </form>
        </>
    );
}

export default GuessTheNumber; 