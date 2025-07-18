import { Marquee } from "../magicui/marquee";

const logos = [
  "/assets/amazon_logo.png",
  "/assets/google_logo.png",
  "/assets/microsoft_logo.png",
  "/assets/paypal_logo.png",
  "/assets/netflix_logo.png",
  "/assets/chaicode_logo.png",
  "/assets/oracle_logo.png",
  "/assets/nvidia_logo.png",
  "/assets/cisco_logo.png",
  "/assets/spotify_logo.png",
];

const MarqueeComponent = () => {
  return (
    <div className="w-full px-20 md:px-36 relative overflow-hidden ">
      <Marquee repeat={4} className="[--duration:20s]">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            className="h-30 w-auto mx-auto"
            alt="logo"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeComponent;
