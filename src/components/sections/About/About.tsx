const About = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">About Me</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Who I Am
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            A passionate developer with a keen eye for design and user experience.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <div className="text-left">
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  I'm a frontend developer with a passion for creating beautiful, functional, and user-centered digital experiences. With 5 years of experience in the field, I am always looking to learn new technologies and improve my skills.
                </p>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  I believe that design is about solving problems and creating intuitive, enjoyable experiences for users. Whether I'm working on a website, mobile app, or other digital product, I bring my commitment to design excellence and user-centered thinking to every project.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="text-left">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">My Skills</h3>
                <div className="mt-2 space-y-4">
                  {['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Node.js', 'Git'].map((skill) => (
                    <div key={skill} className="flex items-center">
                      <svg className="h-5 w-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;