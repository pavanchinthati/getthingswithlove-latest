import React, { useState, useMemo, useCallback, useEffect } from 'react';
import defaultStyles from "./index.module.scss";
import Container from '@customElements/Container/Container';
import Text from '@customElements/Text/Text';

const Layout5 = React.memo((props) => {
  const { heading, description, showcaseItems } = props?.children;
  const [currentSlide, setCurrentSlide] = useState(0);

  const cards = showcaseItems.children;
  const cardsPerSlide = 1;

  const totalSlides = useMemo(
    () => Math.ceil(cards.length / cardsPerSlide),
    [cards.length, cardsPerSlide]
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Slide offset in percent of container width
  const trackStyle = {
    transform: `translateX(-${currentSlide * 100}%)`,
    width: `${100}%`,
  };

  return (
    <Container
      id={props?.id}
      style={props?.style}
      className={defaultStyles.showCaseWrapper}
      noOfCols={props?.noOfCols}
      noOfRows={props?.noOfRows}
      containsGrid={true}
      isWrapper={true}
    >
      <Text
        id={heading?.id}
        style={heading?.style}
        className={defaultStyles.showCaseHeading}
        isDraggable
        isResizable
      >
        {heading?.text}
      </Text>
      <Text
        id={description?.id}
        style={description?.style}
        className={defaultStyles.showCaseDescription}
        isDraggable
        isResizable
      >
        {description?.text}
      </Text>

      <Container
        id={showcaseItems?.id}
        style={showcaseItems?.style}
        className={defaultStyles.showCaseContainer}
        isDraggable
        isResizable
      >
        <div className={defaultStyles.carouselTrack} style={trackStyle}>
          {showcaseItems?.children?.map((item, idx) => (
            <div key={idx} className={defaultStyles.showCaseItem}>
              <img src={item?.image} alt="showcase-img" />
              <div className={defaultStyles.content}>
                <h3>{item?.title}</h3>
                <span>{item?.description}</span>
                <div className={defaultStyles.tags}>
                  {item?.tags?.map((tag, indx) => (
                    <div key={indx} className={defaultStyles.tag}>
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={defaultStyles.slider}>
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <div
              key={idx}
              className={
                idx === currentSlide
                  ? `${defaultStyles.dot} ${defaultStyles.activeDot}`
                  : `${defaultStyles.dot} ${defaultStyles.inactiveDot}`
              }
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </Container>
    </Container>
  )
})

export default Layout5;