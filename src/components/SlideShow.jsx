import 'swiper/swiper.min.css'; // Updated import for Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.min.css'; // Updated import for Swiper styles

const Slideshow = ({ items }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            spaceBetween={30}
            slidesPerView={3} // Adjust the number of slides shown at a time
            breakpoints={{
                // Responsive breakpoints
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }}
        >
            {items.map(item => (
                <SwiperSlide key={item.id}>
                    <div className="flex flex-col items-center">
                        <img src={item.imageUrl} alt={item.itemName} className="w-full h-auto rounded-lg" />
                        <h3 className="mt-2 font-semibold">{item.itemName}</h3>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slideshow;
