import Hero from '../../components/sections/Hero/Hero';
import About from '../../components/sections/About/About';
import Projects from '../../components/sections/Projects/Projects';
import Contact from '../../components/sections/Contact/Contact';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;