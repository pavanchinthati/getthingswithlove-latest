import React from 'react'
import Container from '@customElements/Container/Container'
import Image from '@customElements/Image/Image'
import Text from '@customElements/Text/Text'
import defaultStyles from './index.module.scss'

const Poster4 = React.memo((props) => {
  const { section1, section2 } = props.children

  return (
    <Container
      id={props.id}
      style={props.style}
      isWrapper
      containsGrid
      className={defaultStyles.posterWrapper}
      noOfCols={props.noOfCols}
      noOfRows={props.noOfRows}
    >
      {/* — SECTION 1 — */}
      <Image
        id={section1.image.id}
        imgSrc={section1.image.src}
        style={section1.image.style}
        className={defaultStyles.section1Image}
        isDraggable
        isResizable
      />

      <Text
        id={section1.title.id}
        style={section1.title.style}
        className={defaultStyles.section1Title}
        isDraggable
        isResizable
      >
        {section1.title.text}
      </Text>

      <Container className={defaultStyles.section1Features} isDraggable isResizable id={section1.features.id} style={section1.features.style} >
        {section1.features.children.map((feat, idx) => (
          <div key={idx} className={defaultStyles.featureItem}>
            <img
              src={feat.icon}
              alt=""
              className={defaultStyles.featureIcon}
            />
            <div className={defaultStyles.featureText}>
              <p className={defaultStyles.featureName} >
                {feat.title}
              </p>
              <p className={defaultStyles.featureDesc}>
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </Container>

      {/* — SECTION 2 — */}
      <Image
        id={section2.image.id}
        imgSrc={section2.image.src}
        style={section2.image.style}
        className={defaultStyles.section2Image}
        isDraggable
        isResizable
      />

      <Text
        id={section2.title.id}
        style={section2.title.style}
        className={defaultStyles.section2Title}
        isDraggable
        isResizable
      >
        {section2.title.text}
      </Text>

      <Container className={defaultStyles.section2Features} isDraggable isResizable id={section2.features.id} style={section2.features.style}>
        {section2.features.children.map((feat, idx) => (
          <div key={idx} className={defaultStyles.featureItem}>
            <img
              src={feat.icon}
              alt=""
              className={defaultStyles.featureIcon}
            />
            <div className={defaultStyles.featureText}>
              <p className={defaultStyles.featureName} >
                {feat.title}
              </p>
              <p className={defaultStyles.featureDesc}>
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </Container>
    </Container>
  )
})

export default Poster4
