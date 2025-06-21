import React from "react";
import defaultStyles from "./index.module.scss";
import Container from "@customElements/Container/Container";
import Text from "@customElements/Text/Text";
import Image from "@customElements/Image/Image";

const OurServices5 = React.memo((props) => {
  const { serviceImage, heading, description, features } = props.children;

  return (
    <Container
      id={props.id}
      style={props.style}
      isWrapper
      containsGrid
      className={defaultStyles.servicesWrapper}
      noOfCols={props.noOfCols}
      noOfRows={props.noOfRows}
    >
      {/* — Full‐bleed background image — */}
      <Image
        id={serviceImage.id}
        imgSrc={serviceImage.src}
        style={serviceImage.style}
        alt={serviceImage.alt}
        className={defaultStyles.serviceImage}
        isDraggable
        isResizable
      />

      {/*** Overlay Container for Heading + Description ***/}  
      <Container
        id={`overlay-${props.id}`}
        style={{}}
        className={defaultStyles.overlayContainer}
        isDraggable
        isResizable
      >
        {/* Heading */}
        <Text
          id={heading.id}
          style={heading.style}
          className={defaultStyles.heading}
          isDraggable
          isResizable
        >
          {heading.text}
        </Text>

        {/* Description */}
        <Text
          id={description.id}
          style={description.style}
          className={defaultStyles.description}
          isDraggable
          isResizable
        >
          {description.text}
        </Text>
      

      {/*** Separate Features Container (still on parent grid) ***/}  
      <Container
        id={features.id}
        style={features.style}
        className={defaultStyles.featuresContainer}
        isDraggable
        isResizable
      >
        {features.children.map((feat, idx) => (
          <div key={idx} className={defaultStyles.featureItem}>
            <img
              src={feat.icon}
              alt=""
              className={defaultStyles.featureIcon}
            />
            <Text
              id={`feature-${idx}`}
              className={defaultStyles.featureTitle}
              isDraggable
              isResizable
            >
              {feat.title}
            </Text>
          </div>
        ))}
        </Container>
      </Container>
    </Container>
  );
});

export default OurServices5;
