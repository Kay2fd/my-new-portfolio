import Hero from '../../components/sections/Hero/Hero';
import QuickIntro from '../../components/sections/QuickIntro/QuickIntro';
import TechStack from '../../components/sections/TechStack/TechStack';

const Home = () => {
  return (
    <div>
      <Hero />
      <TechStack />
      <QuickIntro />
    </div>
  );
};

export default Home;