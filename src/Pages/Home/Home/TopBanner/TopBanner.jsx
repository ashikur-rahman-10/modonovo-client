import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1 from "../../../../assets/TopBanner/banner1.jpg";
import banner2 from "../../../../assets/TopBanner/banner2.jpg";
import banner3 from "../../../../assets/TopBanner/banner3.jpg";
import banner4 from "../../../../assets/TopBanner/banner4.jpg";
import banner5 from "../../../../assets/TopBanner/banner5.jpg";
const TopBanner = () => {
    return (
        <div className="w-full h-fit relative">
            <div className="absolute z-10  bg-gradient-to-r from-[#272728bd] to-[#aaadae11] w-full max-w-7xl h-full md:my-1 flex pl-5 md:pl-28 items-center">
                <div>
                    <h1 className="text-2xl md:text-6xl max-w-[250px] md:max-w-xl font-medium text-white">
                        Fashion and Textiles courses at <br /> ModoNovo
                    </h1>
                    <button className="outline bg-info text-white hover:bg-transparent  outline-info hover:text-info mt-10 px-6 py-2 rounded-3xl">
                        Enroll Now
                    </button>
                </div>
            </div>
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                swipeable={true}
                transitionTime={7}
                useKeyboardArrows={true}
            >
                <div>
                    <img src={banner1} />
                </div>
                <div>
                    <img src={banner2} />
                </div>
                <div>
                    <img src={banner3} />
                </div>
                <div>
                    <img src={banner4} />
                </div>
                <div>
                    <img src={banner5} />
                </div>
            </Carousel>
        </div>
    );
};

export default TopBanner;
