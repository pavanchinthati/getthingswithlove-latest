import React from 'react';
import defaultStyles from "./index.module.scss";
import Container from '@customElements/Container/Container';
import Text from '@customElements/Text/Text';

const Layout8 = React.memo((props) => {
    const { heading, imagesGallery } = props?.children;
    return (
        <Container
            id={props?.id}
            style={props?.style}
            isWrapper={true}
            className={defaultStyles.imageGalleryWrapper}
        >
            <Text
                id={heading?.id}
                style={heading?.style}
                className={defaultStyles.imageGalleryHeading}
            >
                {heading?.text}
            </Text>


            <Container
                id={imagesGallery?.id}
                style={imagesGallery?.style}
                className={defaultStyles.imagesGallery}
                elementType={"Gallery"}
            >
                {imagesGallery?.children?.map((img, idx) => (
                    <div className={defaultStyles.imgCard}>
                        <img src={img?.image} alt='image' key={idx}/>
                        <div className={defaultStyles?.imgTitle}>
                            <span>{img?.title}</span>
                        </div>
                    </div>
                ))}

            </Container>
        </Container>
    )
})

export default Layout8;