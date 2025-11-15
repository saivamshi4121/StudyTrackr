import { useEffect } from "react";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="w-full h-screen relative animate-fade"
      style={{
        backgroundImage: "url('/welcome-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Text */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          <Typewriter
            options={{
              strings: ["Welcome to StudyTrackr"],
              autoStart: true,
              loop: false,
              delay: 60,
              deleteSpeed: 40,
            }}
          />
        </h1>
      </div>
    </div>
  );
}

