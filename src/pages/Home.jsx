import { useEffect, useState } from 'react';
import FeaturedItems from '../components/FeaturedItems';
import './css/home.css';
import { NavLink } from 'react-router-dom';
const Home = () => {
    const images = [
        'https://images.beta.cosmos.so/49a9f84c-ab25-4f46-a5e0-b9904c70f048?format=jpeg',
        'https://i.pinimg.com/originals/2e/db/a4/2edba48745736beae36a6b90a77df47e.gif',
        'https://i.pinimg.com/originals/41/ed/16/41ed16d549afcf174df699fd427f2cb4.gif',
        'https://i.pinimg.com/originals/b8/bd/41/b8bd411d00b62d004cc5dd4e72e9c1db.gif',
        // Add more images as needed
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [images.length]);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-10">
            <h1 className="text-4xl font-extrabold mx-2 text-center  mb-4">Welcome to <br /> <span className='silkscreen-regular text-[#F24405]'> DripStreet</span></h1>
           
            <div className='h-fit w-[85vw] rounded flex justify-center items-center'>
                {/* Only show the slideshow on large screens */}
                <div className="flex flex-col justify-center items-center relative w-[85vw] h-64 overflow-hidden rounded">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Slideshow ${index}`}
                            className={`absolute self-center transition-opacity duration-1000 ease-in-out rounded ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}
                </div>
            </div>
            <p className="text-xl md:text-3xl font-light mt-0 md:mt-5  text-zinc-900 mx-5 text-center mb-6">Your one-stop shop for the latest fashion trends.</p>
            <div className='flex justify-cente  items-center w-full border-y-2 border-black md:hidden teko'>
               <NavLink to="/men" className='border-r pt-1 text-3xl w-1/2 h-full text-center border-black'>
                Men
               </NavLink>   
               <NavLink to="/women" className='border-l pt-1 text-3xl w-1/2 h-full text-center border-black'>
                Women
               </NavLink>          
            </div>
            <FeaturedItems />
        </div>
    );
};

export default Home;
