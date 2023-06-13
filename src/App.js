import React, { useEffect, useState } from "react";
import "./App.css";
import Bottom from "./components/bottom/Bottom";
import Header from "./components/header/Header";
import Word from "./components/content/word/Word";

const App = () => {
  const [words, setWords] = useState(["azat", "eser", "zeynep"]);
  const [currentWord, setCurrentWord] = useState("TYPE");
  const [typingWord, setTypingWord] = useState("");
  const [matchedWord, setMatchedWord] = useState("");

  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        setTypingWord((prev) => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        setCurrentWord(typingWord);
        setTypingWord("");
      } else {
        if(!matchedWord) {
          const matchingWords = words.filter((word) => word.startsWith(e.key));
          if (matchingWords.length > 0) {
            setCurrentWord(matchingWords[matchingWords.length - 1]);
          }
          setMatchedWord(matchingWords);
        }

        setTypingWord((prev) => prev + e.key);
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [typingWord]);

  console.log(`typingWord: ${typingWord}`);
  console.log(`currentWord: ${currentWord}`);
  console.log(`matchedWord: ${matchedWord}`);

  return (
    <div className="game">
      <Header />
      <div className="content">
        {words.map((word, index) => (
          <Word 
          key={index} 
          word={word} 
          words={words} 
          setWords={setWords} 
          typingWord={typingWord} 
          setTypingWord={setTypingWord} 
          matchedWord={matchedWord[0]} 
          setMatchedWord={setMatchedWord} 
          health={health}
          setHealth={setHealth}
          score={score}
          setScore={setScore}
          />
        ))}
      </div>
      <Bottom currentWord={currentWord} typingWord={typingWord} setCurrentWord={setCurrentWord} health={health} />
    </div>
  );
};

export default App;
