import React, { useEffect, useState, useMemo, useCallback } from "react";
import styles from "./index.module.scss";
import Container from "@customElements/Container/Container";
import Text from "@customElements/Text/Text";
import useBuilderDimensions from "@hooks/useBuilderDimensions";


const Layout1 = React.memo((props) => {
  const { primaryText, testimonialCards } = props.children;
  const cards = testimonialCards.children || [];
  const { width } = useBuilderDimensions();
  // console.log(width)
  const cardsPerSlide = width < 650 ? 1 : width < 900 ? 2 : 3;

  // recalc when cards or cardsPerSlide changes
  const totalSlides = useMemo(
    () => Math.ceil(cards.length / cardsPerSlide),
    [cards.length, cardsPerSlide]
  );

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const visibleCards = useMemo(() => {
    const start = currentSlide * cardsPerSlide;
    return cards.slice(start, start + cardsPerSlide);
  }, [cards, currentSlide, cardsPerSlide,width]);

  return (
    <Container
      id={props.id}
      style={props.style}
      isWrapper
      containsGrid
      noOfCols={props.noOfCols}
      noOfRows={props.noOfRows}
      className={styles.layout1Wrapper}
    >
      {/* Heading */}
      <Text
        id={primaryText.id}
        style={primaryText.style}
        className={styles.primaryText}
        isResizable
        isDraggable
      >
        {primaryText.text}
      </Text>

      {/* Carousel */}
      <Container
        id={testimonialCards.id}
        style={testimonialCards.style}
        isResizable
        isDraggable
        className={styles.testimonialsCarousel}
      >
        <div
          className={styles.carouselTrack}
          // style={{
          //   transform: `translateX(-${currentSlide * 100}%)`
          // }}
        >
          {visibleCards.map((card, idx) => (
            <div className={styles.testimonialCard} key={card.id || idx}>
              {/* Removed client image */}
              <p className={styles.quote}>
                "{card.quote.length > 100
                  ? card.quote.slice(0, 100) + "…"
                  : card.quote}"
              </p>
              <p className={styles.name}>{card.name}</p>
              <p className={styles.designation}>{card.designation}</p>
            </div>
          ))}
        </div>

        {/* dots */}
        <div className={styles.slider}>
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <div
              key={idx}
              className={
                idx === currentSlide
                  ? `${styles.dot} ${styles.activeDot}`
                  : `${styles.dot} ${styles.inactiveDot}`
              }
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </Container>
    </Container>
  );
});

export default Layout1;
