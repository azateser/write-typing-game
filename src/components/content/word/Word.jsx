import React, { useEffect, useState } from "react";
import * as S from "./styles";

const Word = ({
  word,
  words,
  setWords,
  index,
  typingWord,
  setTypingWord,
  matchedWord,
  setMatchedWord,
  health,
  setHealth,
  score,
  setScore,
}) => {
  const [topPosition, setTopPosition] = useState(-Math.random() * 50);
  const [leftPosition, setLeftPosition] = useState(Math.random() * 90);

  useEffect(() => {
    const handleBlankType = (e) => {
      if (typingWord === "" && e.key === "Backspace") {
        setMatchedWord("");
      }
    };

    window.addEventListener("keydown", handleBlankType);


    return () => {
      window.removeEventListener("keydown", handleBlankType);
    };
    
  }, [typingWord]);


  useEffect(() => {

    const interval = setInterval(() => {
      setTopPosition((prevPosition) => prevPosition + 1);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const setColor = (letter, index) => {
    const typedLetter = typingWord[index];

    if (matchedWord === word && typedLetter && typedLetter !== letter) {
      return "rgba(255, 0, 0, 1)";
    } else if (typingWord === word) {
      setWords(words.filter((w) => w !== word));
      setMatchedWord("");
      setTypingWord("");
      setScore(score++);
      return "rgba(0, 255, 0, 1)";
    } else if (matchedWord === word && typingWord[index] === letter) {
      return "rgba(239, 239, 239, 1)";
    } else {
      return "rgba(255, 255, 255, 0.2)";
    }
  };

  useEffect(() => {
    if (topPosition > 92) {
      setWords(words.filter((w) => w !== word));
      setHealth(health--);
    }
  }, [topPosition]);


  return (
    <S.WordBox
      className="word-box"
      key={index}
      style={{
        left: `${leftPosition}%`,
        top: topPosition < 92 ? `${topPosition}%` : "92%",
        scale: matchedWord === word ? "1.3" : "1",
      }}
    >
      {word.split("").map((letter, index) => (
        <div className="letter-box" key={index}>
          <div className="letter" style={{color: setColor(letter, index),}} >
            {letter}
          </div>
        </div>
      ))}
    </S.WordBox>
  );
};

export default Word;
