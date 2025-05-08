import { useCallback, memo } from "react";
import type { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "../../../context/ThemeProvider";

const ParticlesBackgroundComponent = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "repulse",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 120,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: isDarkMode ? "#8284f7" : "#4f46e5",
          },
          links: {
            color: isDarkMode ? "#8284f7" : "#4f46e5",
            distance: 150,
            enable: true,
            opacity: isDarkMode ? 0.4 : 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.6, 
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 900, 
            },
            value: 80, 
          },
          opacity: {
            value: isDarkMode ? 0.4 : 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
};

const ParticlesBackground = memo(ParticlesBackgroundComponent);

export default ParticlesBackground;