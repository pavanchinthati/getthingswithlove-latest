import React from 'react'
import Container from '@customElements/Container/Container';
import styles from "./index.module.scss";
import Text from '@customElements/Text/Text';
import Button from '@customElements/Button/Button';
import { RxArrowTopRight } from "react-icons/rx";


const Layout39 = React.memo((props) => {
    const { primaryText, secondaryText, button, image } = props?.children;
    // console.log("Hero Banner 39 Re renderd");
    
    // console.log(props);
    return (
        <Container
            id={props?.id}
            style={props?.style}
            className={styles.heroBannerWrapper}
            isWrapper={true}
            containsGrid={true}
            noOfCols={props?.noOfCols}
            noOfRows={props?.noOfRows}
            htmlElement = {"section"}
            elementType = {"Hero Banner"}
        >
            {/* <Image
                imgSrc={image?.src}
                id={image?.id}
                style={image?.style}
                className={styles.bannerImage}
                configVersion = {primaryText?.configVersion}
                isDraggable={true}
                isResizable={true}
            /> */}
            <Text
                id={primaryText?.id}
                style={primaryText?.style}
                configVersion = {primaryText?.configVersion}
                className={styles.primaryText}
                isDraggable={true}
                isResizable={true}
            >
                {primaryText?.text} 
            </Text>
            <Text
                id={secondaryText?.id}
                style={secondaryText?.style}
                className={styles.secondaryText}
                configVersion = {primaryText?.configVersion}
                isDraggable={true}
                isResizable={true}
            >
                {secondaryText?.text}
            </Text>
            <Button
                id={button?.id}
                style = {button?.style}
                className = {styles.bannerBtn}
                isDraggable={true}
                isResizable={true}
                href = {button?.href}
            >
                {button?.text}
                <div className={styles.btnArrow}>
                    <RxArrowTopRight />
                </div>
            </Button>

        </Container>
    )
})

export default Layout39;