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

  let startX;


  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
  }
  
  
  function handleTouchEnd(event) {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;
  
    if (deltaX < -200) { // Если свайп был справа налево
      const element = document.getElementById("g");
      element.style.transform = "translateX(-100%)";
      element.style.transition = "transform 0.3s"; // Добавляем анимацию
      console.log('Сделан жест справа налево');
    }
  
    startX = null;
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
          <div  key={index} onTouchStart={(event) => handleTouchStart(event)} onTouchEnd={(event) => handleTouchEnd(event)}><Post f={index} key={index} img={data.img} fulltext={data.fulltext} text={data.text} data={data.data} /></div>
        ))
        
              )}

    <img onClick={()=>{window.location.href = 'adm'}} className="addpost" src="../img/add.png"/>
    <img onClick={()=>{window.location.href = 'settings'}} className="settings" src="../img/settings.png"/>
     <p style={{"position":"fixed","bottom":"0%","left":"45%","fontSize":"20px"}}>1.0.1v</p>
     {vis && <>
      <h1 className="plas">Нема постів :(</h1>
        </>}
    </div>
  );
}

export default Home;