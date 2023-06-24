import React, { useEffect, useState } from "react";
import "./App.css";
import GameScreen from "./components/game-screen/GameScreen";
import LevelScreen from "./components/level-screen/LevelScreen";
import { easyWords, mediumWords, hardWords, expertWords } from "./config/words";
import GameOver from './components/game-over/GameOver';

const App = () => {
  const [currentState, setCurrentState] = useState("level");

  const [level, setLevel] = useState("");

  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [typingWord, setTypingWord] = useState("");
  const [matchedWord, setMatchedWord] = useState("");


  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);

  useEffect(() => {
    if (level !== "") {
      if(level === "easy") {
        setWords(easyWords)
      } else if(level === "medium") {
        setWords(mediumWords)
      } else if(level === "hard") {
        setWords(hardWords)
      }else if(level === "expert") {
        setWords(expertWords)
      }


      const interval = setInterval(() => {
        setCurrentState("game");
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }
  }, [level]);

  useEffect(() => {
    if (health <= 0) {
      setCurrentState("game-over");
    }
  }, [health]);

  console.log("words", words);
  console.log("currentWord", currentWord);
  console.log("typingWord", typingWord);
  console.log("matchedWord", matchedWord);


  useEffect(() => {
      setCurrentWord("");
      setMatchedWord("");
  }, []);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        if (typingWord === "") {
          setCurrentWord("");
        } else {
          setTypingWord((prev) => prev.slice(0, -1));
        }
      }else {
        if (/^[a-zA-Z]+$/.test(e.key) && !e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
        if (!matchedWord) {
          const matchingWords = words.filter((word) => word.startsWith(e.key));
          if (matchingWords.length > 0) {
            setCurrentWord(matchingWords[0]);
          }
          setCurrentWord(matchingWords[0]);
          setMatchedWord(matchingWords[0]);
        }
  
        setTypingWord((prev) => prev + e.key);
      }
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [words, typingWord, matchedWord]);



  return (
    <>
      {currentState === "level" && health !== 0 ? <LevelScreen level={level} setLevel={setLevel} /> : <></>}
      {currentState === "game" && health !== 0 ? (
        <GameScreen
          words={words}
          setWords={setWords}
          typingWord={typingWord}
          setTypingWord={setTypingWord}
          matchedWord={matchedWord}
          setMatchedWord={setMatchedWord}
          health={health}
          setHealth={setHealth}
          score={score}
          setScore={setScore}
          currentWord={currentWord}
          setCurrentWord={setCurrentWord}
          level={level}
          setCurrentState={setCurrentState}
          setLevel={setLevel}
        />
      ) : (
        <></>
      )}
      {currentState === "gameover" ? <GameOver /> : <></>}
    </>
  );
};

export default App;
