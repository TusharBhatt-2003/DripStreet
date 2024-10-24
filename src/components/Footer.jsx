// src/components/Footer.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bottom-0 bg-black text-[#F2F0E4] rounded-t-3xl py-6 mt-10 z-[99]">
            <div className="container mx-auto text-center">
                <div className="flex justify-center mb-4">
                    {/* Social Media Links */}
                    <a href="https://github.com/TusharBhatt-2003" className="mx-3" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/tushar-bhatt-05b8b11a5/" className="mx-3" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                    </a>
                    <a href="https://www.instagram.com/_tush_ar._._/" className="mx-3" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
                    </a>
                </div>
                <p className="mb-2">Designed & Developed By Tushar Bhatt © {new Date().getFullYear()}.</p>
                <p>
                    <a href="https://github.com/TusharBhatt-2003/DripStreet" target="_blank" rel="noopener noreferrer" className="text-[#F25C05] hover:underline">
                        View Repository
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
