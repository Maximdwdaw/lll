import React, { useState } from "react";

export function Post({ nick,colort, text, data, fulltext, img }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  function opend() {
    localStorage.data = JSON.stringify({
      text: text,
      data: data,
      fulltext: fulltext,
      img: img,
      color: colort,
      nick:nick,
    });
    window.location.href = "/full";
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  let startX;

  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX < 200) {
      // React to a swipe gesture here
      console.log("Swiped from right to left");
    }

    startX = null;
  }

  return (
    <div
      onClick={opend}
      onTouchStart={(event) => handleTouchStart(event)}
      onTouchEnd={(event) => handleTouchEnd(event)}
      className="Post"
    >
      <img
        onLoad={handleImageLoad} // Add onLoad event here
        className="Post-img"
        src={img}
        alt="Post"
        fetchpriorety="high"
      />
      <p style={{ color: colort }} className="Post-text">
        {text}
      </p>
      <p className="Post-data">{data}</p>
      <p className="Post-nick">{nick}</p>
    </div>
  );
}
