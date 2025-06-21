import React from 'react'
import { FaEnvelope, FaFacebookSquare, FaInstagram, FaPhone, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaLinkedin, FaMessage } from 'react-icons/fa6';

const socialToIconMap = new Map([
    ['email', <FaEnvelope />],
    ['phone', <FaPhone />],
    ['sms', <FaMessage />],
    ['whatsapp', <FaWhatsapp />],
    ['facebook', <FaFacebookSquare />],
    ['instagram', <FaInstagram />],
    ['twitter', <FaTwitter />],
    ['linkedin', <FaLinkedin />],
    ['youtube', <FaYoutube />]
]);

const linkGenerators = {
    email: address => `mailto:${address}`,
    phone: number => `tel:${number}`,
    sms: number => `sms:${number}`,
    whatsapp: number => `https://wa.me/${number}`,
    facebook: handle => `https://facebook.com/${handle}`,
    instagram: handle => `https://instagram.com/${handle}`,
    twitter: handle => `https://twitter.com/${handle}`,
    linkedin: company => `https://linkedin.com/company/${company}`,
    youtube: channel => `https://youtube.com/c/${channel}`,
};

function makeSocialLink(type, value, params = {}) {
    const generator = linkGenerators[type];
    if (!generator) {
        console.warn(`No link generator for type "${type}"`);
        return '#';
    }

    let url = generator(value);

    if (type === 'email' && params.subject) {
        const qs = new URLSearchParams({
            subject: params.subject,
            body: params.body
        }).toString();
        url += `?${qs}`;
    }

    return url;
}

const SocialLink = ({ type, value, params, children }) => {
    const href = makeSocialLink(type, value, params);
    return (
        <a href={href} target="_blank" rel="noopener">
            {children || socialToIconMap.get(type) || <span>{value}</span>}
        </a>
    );
}

export default SocialLink;