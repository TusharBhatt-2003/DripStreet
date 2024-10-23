// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="container mx-auto text-center">
                <div className="flex justify-center mb-4">
                    {/* Social Media Links */}
                    <a href="https://github.com/yourusername" className="mx-3" target="_blank" rel="noopener noreferrer">
                        <img src="/path-to-your-icons/github.svg" alt="GitHub" className="w-6 h-6 inline" />
                    </a>
                    <a href="https://twitter.com/yourusername" className="mx-3" target="_blank" rel="noopener noreferrer">
                        <img src="/path-to-your-icons/twitter.svg" alt="Twitter" className="w-6 h-6 inline" />
                    </a>
                    <a href="https://linkedin.com/in/yourusername" className="mx-3" target="_blank" rel="noopener noreferrer">
                        <img src="/path-to-your-icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6 inline" />
                    </a>
                    <a href="https://instagram.com/yourusername" className="mx-3" target="_blank" rel="noopener noreferrer">
                        <img src="/path-to-your-icons/instagram.svg" alt="Instagram" className="w-6 h-6 inline" />
                    </a>
                </div>
                <p className="mb-2">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
                <p>
                    <a href="https://github.com/yourusername/your-repo" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        View Repository
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
