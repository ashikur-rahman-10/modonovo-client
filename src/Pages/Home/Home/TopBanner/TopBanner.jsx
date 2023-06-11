import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import banner1 from "../../../../assets/TopBanner/banner1.jpg";
import banner2 from "../../../../assets/TopBanner/banner2.jpg";
import banner3 from "../../../../assets/TopBanner/banner3.jpg";
import banner4 from "../../../../assets/TopBanner/banner4.jpg";
import banner5 from "../../../../assets/TopBanner/banner5.jpg";

const TopBanner = () => {
    const [sliderRef] = useKeenSlider(
        {
            loop: true,
        },
        [
            (slider) => {
                let timeout;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 2000);
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on("dragStarted", clearNextTimeout);
                slider.on("animationEnded", nextTimeout);
                slider.on("updated", nextTimeout);
            },
        ]
    );
    return (
        <div ref={sliderRef} className="keen-slider w-full h-fit relative">
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

            <div className="keen-slider__slide number-slide1">
                <img src={banner1} alt="" />
            </div>
            <div className="keen-slider__slide number-slide2">
                <img src={banner2} alt="" />
            </div>
            <div className="keen-slider__slide number-slide3">
                <img src={banner3} alt="" />
            </div>
            <div className="keen-slider__slide number-slide4">
                <img src={banner4} alt="" />
            </div>
            <div className="keen-slider__slide number-slide5">
                <img src={banner5} alt="" />
            </div>
            <div className="keen-slider__slide number-slide6">
                <img src={banner1} alt="" />
            </div>
        </div>
    );
};

export default TopBanner;
