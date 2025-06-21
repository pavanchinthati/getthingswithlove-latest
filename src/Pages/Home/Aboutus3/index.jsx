import React, { useEffect, useMemo, useState } from "react";
import defaultStyles from "./index.module.scss";
import Container from "@customElements/Container/Container";
import Text from "@customElements/Text/Text";

function AchieveCard({ number: target, title, description,suffix }) {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      let start = null;
      const duration = 2500;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }, [target]);
  
    return (
      <div className={defaultStyles.achieveCard}>
        <h4>{count}{suffix}</h4>
        <div className={defaultStyles.content}>
          <span className={defaultStyles.title}>{title}</span>
          <span className={defaultStyles.description}>{description}</span>
        </div>
      </div>
    );
  }
  

const Layout3 = React.memo((props) => {
  const { heading, description, carouselImages, achievments } = props.children;
  const images = carouselImages.children || [];
  const looped = useMemo(() => [...images, ...images], [images]);

  return (
    <Container
      id={props.id}
      style={props.style}
      className={defaultStyles.aboutUsWrapper}
      isWrapper
      containsGrid
      noOfCols={props.noOfCols}
      noOfRows={props.noOfRows}
    >
      <Text
        id={heading.id}
        style={heading.style}
        className={defaultStyles.aboutUsHeading}
        isDraggable
        isResizable
      >
        {heading.text}
      </Text>
      <Text
        id={description.id}
        style={description.style}
        className={defaultStyles.aboutUsDesc}
        isDraggable
        isResizable
      >
        {description.text}
      </Text>

      <Container
        id={carouselImages?.id}
        style={carouselImages?.style}
        className={defaultStyles.imgCarousel}
        isDraggable
        isResizable
      >
        <div className={defaultStyles.track}>
          {looped.map((img, i) => (
            <img key={i} src={img.image} className={defaultStyles.carouselImg} />
          ))}
        </div>
      </Container>

      <Container
        id={achievments?.id}
        style={achievments?.style}
        className={defaultStyles.acheivements}
        isDraggable
        isResizable
      >
        {achievments?.children?.map((achive, idx) => (
          <AchieveCard
            key={idx}
            number={parseInt(achive.number)}
            suffix = {achive?.suffix}
            title={achive.title}
            description={achive.description}
          />
        ))}
      </Container>
    </Container>
  );
});

export default Layout3;
