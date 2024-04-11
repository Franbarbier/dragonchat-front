import { useEffect, useRef, useState } from 'react';
import styles from './TipsCarrousel.module.css';



const TipsCarrousel: React.FC = ({  }) => {


  const carru = ["Escribiendo <strong>[name]</strong> se va a enviar dinamicamente el nombre del destinatario.", "Puedes agregar alternativas del mensaje que se enviará, se alternaran equitativamente entre todos los destinatarios."]

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = carru.length
  const carouselWrapperRef = useRef<HTMLDivElement>(null);

  let intervalTime = 7000

  useEffect(() => { handleNextClick() }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
    setTimeout(() => {
        handleNextClick()
    }, intervalTime);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);

    setTimeout(() => {
        handleNextClick()
    }, intervalTime);
  };

  useEffect(() => {
    if (carouselWrapperRef.current) {
      const offset = -(currentIndex * carouselWrapperRef.current.offsetWidth);
      carouselWrapperRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, [currentIndex]);



  return (
    <>
    <div className={styles.carousel_container}>
      <div className={styles.carousel} ref={carouselWrapperRef}>
        {carru.map((child, index) => (
            <div className={styles.carousel_item} key={index} dangerouslySetInnerHTML={{ __html: child }}>

          </div>
        ))}
      </div>
      <button className={styles.prev} onClick={handlePrevClick}>
        &lt;
      </button>
      <button className={styles.next} onClick={handleNextClick}>
        &gt;
      </button>
    </div>
    <div className={styles.arrowDialog}></div>
    </>
  );
};

export default TipsCarrousel;