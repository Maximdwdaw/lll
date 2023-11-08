import React, { useEffect, useState } from "react";
import { Post } from "../commponet/post";
import PostSkeleton from "../commponet/postskleton";

function Home() {
  const [d, setD] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vis, setvis] = useState(false);
  const [imageLoadCount, setImageLoadCount] = useState(0);
  async function get(url) {                                              
    try {                                              
      const response = await fetch(url);                                               
      if (!response.ok) {                                              
      console.log(response.status)       
      throw new Error(response.status)                                       
      }                                              
      const data = await response.json();                                              
      return data;                                               
    } catch (error) {                                              
      console.error(error);                                               
      throw new Error(error);                                               
    }                                              
   } 
  
  useEffect(() => {
    if (!localStorage.nick) {
      window.location.href = "/settings"
    }    




    fetch("https://654a46cae182221f8d52def1.mockapi.io/posts")
      .then((response) => response.json())
      .then((data) => {
        setD(data);
        setLoading(false);
        if (data.length === 0) {
          setvis(true);
        }
      });
  }, []);

  const handleImageLoaded = () => {
    setImageLoadCount((prevCount) => prevCount + 1);
  };

  let startY;

  function handleTouchStart(event) {
    startY = event.touches[0].clientY;
  }

  function handleTouchEnd(event) {
    const endY = event.changedTouches[0].clientY;
    const deltaY = endY - startY;

    if (deltaY < -200) {
      document.getElementById("w1").style.transform = "translate(0%,-100%)";
      document.getElementById("w2").style.transform = "translate(0%,-100%)";
      document.getElementById("version").style.transform = "translate(-50%,-600%)";
    } else {
      document.getElementById("w1").style.transform = "translate(0%,0%)";
      document.getElementById("w2").style.transform = "translate(0%,0%)";
      document.getElementById("version").style.transform = "translate(-50%,0%)";
    }
    startY = null;
  }

  return (
    <div id="body">
      {loading && imageLoadCount === d.length ? (
        // If loading is true, show skeletons
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        // Otherwise, show data
        d.map((data, index) => (
          <Post
            nick={data.nick}
            key={index}
            colort={data.colortext}
            img={data.img}
            fulltext={data.fulltext}
            text={data.text}
            data={data.data}
            onImageLoad={handleImageLoaded} 
          />
        ))
      )}

      <img
        id="w1"
        onTouchStart={(event) => handleTouchStart(event)}
        onTouchEnd={(event) => handleTouchEnd(event)}
        onClick={() => {
          window.location.href = "adm";
        }}
        className="addpost"
        src="../img/add.png"
      />
      <img
        id="w2"
        onTouchStart={(event) => handleTouchStart(event)}
        onTouchEnd={(event) => handleTouchEnd(event)}
        onClick={() => {
          window.location.href = "settings";
        }}
        className="settings"
        src="../img/settings.png"
      />
      <p id="version">1.0.2v</p>
      {vis && <h1 className="plas">Нема постів :(</h1>}

    </div>
  );
}

export default Home;
