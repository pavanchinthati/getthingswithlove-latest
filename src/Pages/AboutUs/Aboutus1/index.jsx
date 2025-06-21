import React from "react";
import styles from "./index.module.scss";
import Container from "@customElements/Container/Container";
import Text from "@customElements/Text/Text";

const Layout1 = React.memo((props) => {
    const { heading, description, content, lowerHeading, teamMembers } = props?.children;

    return (
        <Container
            id={props?.id}
            style={props?.style}
            isWrapper={true}
            containsGrid={true}
            noOfCols={props?.noOfCols}
            noOfRows={props?.noOfRows}
            className={styles.aboutUsWrapper}
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

            {/* Content Section - All Cards in One Row */}
            <Container
                id={content?.id}
                style={content?.style}
                isDraggable={true}
                isResizable={true}

                className={styles.contentContainer}
            >
                {content?.children?.map((section, index) => (
                    <div key={index} className={styles.section}>
                        <div className={styles.sectionTitle}>{section?.title}</div>
                        {section?.text && <div className={styles.sectionText}>{section?.text}</div>}
                    </div>
                ))}
            </Container>

            {/* Lower Heading (Meet Our Team) */}
            {lowerHeading && (
                <Text
                    id={lowerHeading?.id}
                    style={lowerHeading?.style}
                    className={styles.teamHeading}
                    isResizable={true}
                    isDraggable={true}
                >
                    {lowerHeading?.text}
                </Text>
            )}

            {/* Team Members Section */}
            {teamMembers && (
                <Container
                    id={teamMembers?.id}
                    style={teamMembers?.style}
                    isDraggable={true}
                    isResizable={true}
                    className={styles.teamContainer}
                >
                    {teamMembers?.children?.map((member, index) => (
                        <div key={index} className={styles.teamMember}>
                            <div className={styles.teamMemberName}>{member?.title}</div>
                            <div className={styles.teamMemberRole}>{member?.text}</div>
                        </div>
                    ))}
                </Container>
            )}
        </Container>
    );
});

export default Layout1;
