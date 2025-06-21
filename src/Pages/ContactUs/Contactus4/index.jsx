import React,{useState} from 'react';
import defaultStyles from "./index.module.scss";
import Text from '@customElements/Text/Text';
import Image from '@customElements/Image/Image';
import Container from '@customElements/Container/Container';
import { useStore } from 'react-redux';
import {tenantAppAPI} from '@api';

const Layout4 = React.memo((props) => {
    const { primaryText, secondaryText, image, contactForm } = props?.children;

    const store = useStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const initialFormData = contactForm.fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {});
    const [formData, setFormData] = useState(initialFormData);


    const handleSubmitForm = async (e) => {
            e.preventDefault();
            try {
                setIsSubmitting(true);
                const state = store.getState();
                const workflowConfigId = state.tenantDetails?.workflowConfigId;
                const tenantId = state.tenantDetails?.tenantId;
                const payload = {
                    "customer_name": formData?.name,
                    "description": formData?.message,
                    "workflow_Config": workflowConfigId,
                    "tenant": tenantId,
                    "channel": "WEBSITE",
                    "attributes": { ...formData }
                }
                const res = await tenantAppAPI.createTicket(payload, workflowConfigId);
                setIsFormSubmitted(true);
                setFormData(initialFormData);
                
    
            } catch (err) {
                console.error(err);
            } finally {
                setIsSubmitting(false);
            }
        }
    
        const handleOnChange = (name, value) => {
            // console.log(name,value)
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };
    return (
        <Container
            id={props?.id}
            style={props?.style}
            className={defaultStyles.contactUsWrapper}
            isWrapper={true}
            containsGrid={true}
            noOfCols={props?.noOfCols}
            noOfRows={props?.noOfRows}
        >
            <Image
                imgSrc={image?.src}
                id={image?.id}
                style={image?.style}
                className={defaultStyles.contactUsImage}
                isDraggable={true}
                isResizable={true}
            />

            <Text
                id={primaryText?.id}
                style={primaryText?.style}
                className={defaultStyles.primaryText}
                isDraggable={true}
                isResizable={true}
            >
                {primaryText?.text}
            </Text>
            <Text
                id={secondaryText?.id}
                style={secondaryText?.style}
                className={defaultStyles.secondaryText}
                isDraggable={true}
                isResizable={true}
            >
                {secondaryText?.text}
            </Text>

            <Container
                id={contactForm?.id}
                style={contactForm?.style}
                className={defaultStyles.contactForm}
                sectionIdx={props?.index}
                isDraggable={true}
                isResizable={true}
                elementType={"Form"}
            >
                <form onSubmit={handleSubmitForm}>
                    {contactForm?.fields?.map((field, idx) => (
                        <div key={idx} className={defaultStyles?.field}>
                            <label>
                                <span>{field?.label}</span>
                                <span className={defaultStyles.isRequiredText}>{field?.validation?.required ? "*" : ""}</span>
                            </label>
                            {field?.type === "textarea" ?
                                <textarea
                                    name={field?.name}
                                    placeholder={field?.placeholder}
                                    required={field?.validation?.required || false}
                                    minLength={field?.minLength || 0}
                                    maxLength={field?.maxLength || 1000}
                                    rows={5}
                                    onChange={(e) => handleOnChange(field?.name, e.target.value)}
                                    value={formData[field.name]}

                                /> :
                                <input
                                    type={field?.type}
                                    name={field?.name}
                                    placeholder={field?.placeholder}
                                    required={field?.validation?.required || false}
                                    minLength={field?.minLength || 0}
                                    maxLength={field?.maxLength || 1000}
                                    onChange={(e) => handleOnChange(field?.name, e.target.value)}
                                    value={formData[field.name]}

                                />

                            }
                        </div>
                    ))}
                    <button
                        type="submit"
                        className={`${defaultStyles?.submitBtn} ${isFormSubmitted?.disabledEffect}`}
                        disabled={isFormSubmitted && true}
                    >
                        {isSubmitting &&
                            <div className={defaultStyles.loader}></div>
                        }
                        {contactForm?.submitText}
                    </button>
                    {isFormSubmitted &&
                        <p className={defaultStyles.successMessage}>{contactForm?.successMessage}</p>
                    }
                </form>

            </Container>
        </Container>
    )
})

export default Layout4;