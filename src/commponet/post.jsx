import React from 'react';


export function Post({ colort ,text, data, fulltext, img }) {


  function opend() {
    localStorage.data = JSON.stringify({text:text,data:data,fulltext:fulltext,img:img,color:colort})
   window.location.href = '/full'
    
  }
let startX;


function handleTouchStart(event) {
  startX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
  const endX = event.changedTouches[0].clientX;
  const deltaX = endX - startX;

  if (deltaX < 200) {
    // Реагируйте на жест справа налево здесь
    console.log('Сделан жест справа налево');
  }

  startX = null;
}

  return (
    <>

      <div onClick={opend}
             onTouchStart={(event) => handleTouchStart(event)}
             onTouchEnd={(event) => handleTouchEnd(event)}
             
             className="Post">
        <img className="Post-img" src={img} alt="Post" />
        <p style={{ color: colort }} className="Post-text">{text}</p>
        <p className="Post-data">{data}</p>
      </div>
      

    </>
  );
}
