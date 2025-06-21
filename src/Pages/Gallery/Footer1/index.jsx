import React from "react";
import defaultstyle from './Footer.module.scss'
import Container from "@customElements/Container/Container";
import Text from "@customElements/Text/Text";
import { MdCopyright } from "react-icons/md";
import { Link } from "react-router-dom";
import SocialLink from "@components/SocialLinks";

export default function Layout1(props) {
    const { firstColumn, secondColumn, thirdColumn, company } = props?.children || {};
    return (
        <Container
            id={props?.id}
            style={props?.style}
            className={defaultstyle.footerWrapper}
            isWrapper={true}
        >
            <div className={defaultstyle.columnsContainer}>
                <div
                    className={`${defaultstyle.firstColumn}`}

                >
                    <Text
                        id={firstColumn?.children?.heading?.id}
                        style={firstColumn?.children?.heading?.style}
                        sectionIdx={props?.index}
                        className={defaultstyle.columnHeading}
                    >
                        {firstColumn?.children?.heading?.text}
                    </Text>
                    <Text
                        id={firstColumn?.children?.description?.id}
                        style={firstColumn?.children?.description?.style}
                        sectionIdx={props?.index}
                        className={defaultstyle.columnDescription}
                    >
                        {firstColumn?.children?.description?.text}
                    </Text>
                </div>
                <div
                    className={defaultstyle.secondColumn}
                    id={secondColumn?.id}
                >
                    <Text
                        id={secondColumn?.children?.heading?.id}
                        style={secondColumn?.children?.heading?.style}
                        className={defaultstyle.columnHeading}
                    >
                        {secondColumn?.children?.heading?.text}
                    </Text>
                    <Container
                        id={secondColumn?.children?.links?.id}
                        className={defaultstyle.linksContainer}
                        style={secondColumn?.children?.links?.style}
                        elementType={"Useful Links"}
                    >
                        {secondColumn?.children?.links?.children?.map((link, idx) => {
                            let formattedLinks = `${link?.href}`;
                            return (
                                <Link to={formattedLinks} key={idx}>{link?.text}</Link>
                            )
                        })}
                    </Container>
                </div>
                <div
                    className={defaultstyle.thirdColumn}
                >
                    <Text
                        id={thirdColumn?.children?.heading?.id}
                        style={thirdColumn?.children?.heading?.style}
                        sectionIdx={props?.index}
                        className={defaultstyle.columnHeading}
                    >
                        {thirdColumn?.children?.heading?.text}
                    </Text>
                    <Container
                        id={thirdColumn?.children?.links?.id}
                        className={defaultstyle.linksContainer}
                        style={thirdColumn?.children?.links?.style}
                        elementType={"Social Links"}
                    >
                        {thirdColumn?.children?.links?.children?.map((link, idx) => (
                            <React.Fragment key={idx}>
                                <SocialLink
                                    type={link?.type}
                                    value={link?.to}
                                >
                                    <span>{link?.text}
                                    </span>
                                </SocialLink>
                            </React.Fragment>
                        ))}
                    </Container>
                </div>
            </div>
            <div className="flex items-center gap-1px justify-center">
                <MdCopyright size={18} />
                <Text
                    id={company?.id}
                    style={company?.style}
                    className={defaultstyle.companyName}
                >
                    {company?.text}
                </Text>
            </div>

        </Container >
    );
}
