import React, { useEffect, useState } from "react";
import { Post } from "../commponet/post";
import PostSkeleton from "../commponet/postskleton"; // Импортируем компонент скелетона

function Home() {
  const [d, setD] = useState([]);
  const [loading, setLoading] = useState(true); // Добавляем состояние для отслеживания загрузки
  const [vis, setvis] = useState(false);
  useEffect(() => {
    
    fetch("https://644ab0e4a8370fb32155be44.mockapi.io/item")
      .then((response) => response.json())
      .then((data) => {
        setD(data);
        setLoading(false); // Устанавливаем загрузку в false после получения данных
        if (data.length === 0 )
         {
          setvis(true)
         }
      });
  }, []);

  let startY;


  function handleTouchStart(event) {
    startY = event.touches[0].clientY;
  }
  
  
  function handleTouchEnd(event) {
    const endY = event.changedTouches[0].clientY;
    const deltaY = endY - startY;
  
if (deltaY < -200) {
  document.getElementById("w1").style.transform = "translate(0%,-100%)"
  document.getElementById("w2").style.transform = "translate(0%,-100%)"
  document.getElementById("version").style.transform = "translate(-50%,-600%)"
}
else {
  document.getElementById("w1").style.transform = "translate(0%,0%)"
  document.getElementById("w2").style.transform = "translate(0%,0%)"
  document.getElementById("version").style.transform = "translate(-50%,0%)"
}
    startY = null;
  }
  
  return (
 
    <div id="body">


      {loading ? (
        // Если загрузка идет, отображаем скелетон
        <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        
        </>
      ) : (
        
   
        // Иначе, отображаем данные
        d.map((data, index) => (
            <Post key={index} colort={data.colortext} img={data.img} fulltext={data.fulltext} text={data.text} data={data.data} />
        ))
        
              )}

    <img id="w1" onTouchStart={(event) => handleTouchStart(event)}  onTouchEnd={(event) => handleTouchEnd(event)} onClick={()=>{window.location.href = 'adm'}} className="addpost" src="../img/add.png"/>
    <img id="w2" onTouchStart={(event) => handleTouchStart(event)} onTouchEnd={(event) => handleTouchEnd(event)} onClick={()=>{window.location.href = 'settings'}} className="settings" src="../img/settings.png"/>
     <p id="version">1.0.2v</p>
     {vis && <>
      <h1 className="plas">Нема постів :(</h1>
        </>}
    </div>
  );
}

export default Home;