import React from "react";
import styles from "./index.module.scss";
import Container from "@customElements/Container/Container";
import Text from "@customElements/Text/Text";

const Layout1 = React.memo((props) => {
    const { heading, description, content } = props?.children;

    return (
        <Container
            id={props?.id}
            style={props?.style}
            isWrapper={true}
            containsGrid={true}
            noOfCols={props?.noOfCols}
            noOfRows={props?.noOfRows}
            className={styles.privacyPolicyWrapper}
        >
            {/* Heading */}
            <Text
                id={heading?.id}
                style={heading?.style}
                className={styles.heading}
                isResizable={true}
                isDraggable={true}
            >
                {heading?.text}
            </Text>

            {/* Description */}
            <Text
                id={description?.id}
                style={description?.style}
                className={styles.description}
                isResizable={true}
                isDraggable={true}
            >
                {description?.text}
            </Text>

            {/* Content Container */}
            <Container
                id={content?.id}
                style={content?.style}
                isDraggable={true}
                isResizable={true}
                className={styles.contentContainer}
            >
                {content?.children?.map((section, index) => (
                    <div 
                        key={index}
                        id={section?.id} 
                        style={section?.style}
                        className={styles.section}
                    >
                        
                        <div className={styles.sectionTitle}>{section?.title}</div>
                        <div className={styles.sectionText}>{section?.text}</div>
                    </div>
                ))}
            </Container>
        </Container>
    );
});

export default Layout1;
