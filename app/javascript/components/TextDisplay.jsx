import React, { useState, useEffect } from "react";

export default () => {
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState("");
  const [textList, setTextList] = useState([]);

  useEffect(() => {
    document.addEventListener("click", setClicked);
  }, [setClicked]);

  const handleText = () => {
    if (!text) return;
    if (text.length % 40 === 0) {
      const wordsList = text.split(" ");
      const lastW = wordsList.pop();
      const prevText = wordsList.join(" ");
      setTextList([...textList, prevText]);
      setText(lastW);
    }
  };
  handleText();

  return (
    <div className="container">
      {textList.map((t, i) => (
        <p key={i} className={i % 2 === 0 ? "even" : "odd"}>
          {t}
        </p>
      ))}

      {clicked && (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
    </div>
  );
};
