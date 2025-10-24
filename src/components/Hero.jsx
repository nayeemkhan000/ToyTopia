import React, { useEffect, useState } from "react";
import banner1 from "../../public/assets/hero-banner1.png";
import banner2 from "../../public/assets/hero-banner2.png";
import banner3 from "../../public/assets/hero-banner3.png";
import { useNavigate } from "react-router";

const heroBanners = [
  {
    id: 1,
    toyId: 21,
    image: banner1,
    title: "Captain Bubble’s Boat Brigade",
    description:
      "Float, splash and giggle — build tiny boats and sail them on imaginary oceans. Perfect for storytime adventures and puddle races!",
    alt: "colorful toy boat set for imaginative play",
  },
  {
    id: 2,
    toyId: 23,
    image: banner2,
    title: "Mr. Snuggle’s Teddy Pals",
    description:
      "Hug-ready teddy friends who love tea parties, nap-time stories and secret handshakes. Soft, cuddly and always ready for a cuddle!",
    alt: "soft teddy bear toy for cuddles and pretend play",
  },
  {
    id: 3,
    toyId: 22,
    image: banner3,
    title: "Zoom-Zoom Racer Squad",
    description:
      "Vroom into playtime with tiny cars and twisty tracks — build circuits, race siblings, and invent your own finish-line celebrations!",
    alt: "mini racing cars and track set for action-packed play",
  },
];

const Hero = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const navigateToPage = useNavigate();

  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex((previousIndex) => (previousIndex + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(bannerInterval);
  }, []);

  const handleShopNowClick = (toyIdentifier) => {
    navigateToPage(`toys/${toyIdentifier}`);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-primary mt-[-80px] shadow-2xl">
      {heroBanners.map((bannerItem, index) => (
        <div
          key={bannerItem.id}
          className={`flex flex-col lg:flex-row items-center justify-between transition-all duration-1000 ease-in-out transform ${
            index === currentBannerIndex
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 absolute top-0 left-0"
          }`}
        >
          <div className="lg:w-1/2 w-full">
            <img
              src={bannerItem.image}
              alt={bannerItem.alt}
              className="w-full h-auto object-cover rounded-b-2xl"
            />
          </div>

          <div className="flex flex-col gap-6 justify-center items-center text-center lg:w-1/2 px-8 lg:px-16 py-12">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary animate-fadeInUp"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {bannerItem.title}
            </h1>
            <p className="mb-8 text-lg md:text-xl text-secondary leading-relaxed animate-fadeIn">{bannerItem.description}</p>
            <button
              onClick={() => handleShopNowClick(bannerItem.toyId)}
              className="btn-primary px-8 py-4 text-lg font-semibold rounded-full hover-lift animate-slideInRight"
            >
              Grab Yours
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
