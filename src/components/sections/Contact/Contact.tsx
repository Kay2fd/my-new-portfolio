import React, { useState, useRef } from 'react';
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaClock, FaSpinner } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeProvider";
import { Button, Card, PageHeader } from "../../common";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formStatus, setFormStatus] = useState<{
    isSubmitting: boolean;
    isSuccess: boolean | null;
    message: string;
  }>({
    isSubmitting: false,
    isSuccess: null,
    message: '',
  });
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    email?: string;
    message?: string;
  }>({});

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaValue(token);
  };

  const validateForm = () => {
    const newErrors: { email?: string; message?: string } = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formRef.current?.email.value)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (formRef.current?.message.value.length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const verifyRecaptcha = async (_token: string) => {
    try {
      return true;
    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    if (!validateForm()) {
      return;
    }

    if (!recaptchaValue) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        message: 'Please complete the reCAPTCHA verification.'
      });
      return;
    }

    setFormStatus({
      isSubmitting: true,
      isSuccess: null,
      message: 'Sending your message...'
    });

    const isRecaptchaValid = await verifyRecaptcha(recaptchaValue);

    if (!isRecaptchaValid) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        message: 'reCAPTCHA verification failed. Please try again.'
      });
      return;
    }

    const serviceId = 'service_xwnqhb8';
    const templateId = 'template_aon9mi6';
    const publicKey = 'hvocQ7BX4zrswN2UZ';

    const templateParams = {
      first_name: formRef.current.first_name.value,
      last_name: formRef.current.last_name.value,
      email: formRef.current.email.value,
      message: formRef.current.message.value,
      to_email: 'dikaphangestu@gmail.com',
      'g-recaptcha-response': recaptchaValue
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setFormStatus({
        isSubmitting: false,
        isSuccess: true,
        message: 'Your message has been sent successfully!'
      });

      formRef.current?.reset();
      recaptchaRef.current?.reset();
      setRecaptchaValue(null);
      setErrors({});
    } catch (error) {
      console.error('Email sending error:', error);
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        message: 'Failed to send message. Please try again later.'
      });
    }
  };

  return (
    <div id="contact" className="min-h-screen flex flex-col items-center justify-center py-16 px-4">
      <PageHeader
        title="Contact Me"
        subtitle="Feel free to reach out! Whether you have a question, feedback, or a collaboration proposal, I'd love to hear from you."
      />

      <Card
        variant="glass"
        className="w-full max-w-screen-lg mx-auto mt-8"
        motionProps={{
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1 }
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          <div className={`md:col-span-4 p-10 ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100/50'} rounded-l-xl`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className={`mt-4 text-sm leading-7 font-medium uppercase ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                Contact
              </p>
              <h3 className={`text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                Get In <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Touch</span>
              </h3>
              <p className={`mt-4 leading-7 ${isDarkMode ? 'text-gray-300' : 'text-blue-800'}`}>
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
              </p>

              <div className="flex items-center mt-8">
                <FaMapMarkerAlt className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-800'}`}>Malang, Indonesia</span>
              </div>

              <div className="flex items-center mt-5">
                <FaEnvelope className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-800'}`}>dikaphangestu@gmail.com</span>
              </div>

              <div className="flex items-center mt-5">
                <FaClock className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-800'}`}>Available 9am - 5pm</span>
              </div>
            </motion.div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`md:col-span-8 p-10 ${isDarkMode ? 'bg-blue-950/20' : 'bg-white/50'} rounded-r-xl`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className={`block uppercase tracking-wide text-xs font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-blue-800'
                      }`}
                    htmlFor="first_name"
                  >
                    First Name
                  </label>
                  <input
                    className={`appearance-none block w-full ${isDarkMode ? 'bg-blue-900/20 text-white' : 'bg-blue-50/70 text-blue-900'
                      } border ${isDarkMode ? 'border-blue-800/40' : 'border-blue-200'} rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none ${isDarkMode ? 'focus:bg-blue-900/40 focus:border-blue-600' : 'focus:bg-white focus:border-blue-500'
                      }`}
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="Jane"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className={`block uppercase tracking-wide text-xs font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-blue-800'
                      }`}
                    htmlFor="last_name"
                  >
                    Last Name
                  </label>
                  <input
                    className={`appearance-none block w-full ${isDarkMode ? 'bg-blue-900/20 text-white' : 'bg-blue-50/70 text-blue-900'
                      } border ${isDarkMode ? 'border-blue-800/40' : 'border-blue-200'} rounded-lg py-3 px-4 leading-tight focus:outline-none ${isDarkMode ? 'focus:bg-blue-900/40 focus:border-blue-600' : 'focus:bg-white focus:border-blue-500'
                      }`}
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className={`block uppercase tracking-wide text-xs font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-blue-800'
                      }`}
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className={`appearance-none block w-full ${isDarkMode ? 'bg-blue-900/20 text-white' : 'bg-blue-50/70 text-blue-900'
                      } border ${isDarkMode ? 'border-blue-800/40' : 'border-blue-200'} rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none ${isDarkMode ? 'focus:bg-blue-900/40 focus:border-blue-600' : 'focus:bg-white focus:border-blue-500'
                      } ${errors.email ? 'border-red-500' : ''}`}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className={`block uppercase tracking-wide text-xs font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-blue-800'
                      }`}
                    htmlFor="message"
                  >
                    Your Message
                  </label>
                  <textarea
                    rows={8}
                    id="message"
                    name="message"
                    className={`appearance-none block w-full ${isDarkMode ? 'bg-blue-900/20 text-white' : 'bg-blue-50/70 text-blue-900'
                      } border ${isDarkMode ? 'border-blue-800/40' : 'border-blue-200'} rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none ${isDarkMode ? 'focus:bg-blue-900/40 focus:border-blue-600' : 'focus:bg-white focus:border-blue-500'
                      } ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Write your message here..."
                    required
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs italic mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="w-full px-3 mb-6">
                  <div className={`${isDarkMode ? 'recaptcha-dark' : 'recaptcha-light'}`}>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6Ld3jTUrAAAAAI5YXqkIUj3FlDlTsxep2kzWzWBK" 
                      onChange={handleRecaptchaChange}
                      theme={isDarkMode ? "dark" : "light"}
                    />
                  </div>
                </div>

                {formStatus.message && (
                  <div className="w-full px-3 mb-4">
                    <p className={`text-sm ${formStatus.isSuccess === true
                      ? 'text-green-500'
                      : formStatus.isSuccess === false
                        ? 'text-red-500'
                        : isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                      {formStatus.message}
                    </p>
                  </div>
                )}

                <div className="flex justify-between w-full px-3">
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    className="mt-4 md:mt-0"
                    disabled={formStatus.isSubmitting || !recaptchaValue}
                  >
                    {formStatus.isSubmitting ? (
                      <span className="flex items-center">
                        <FaSpinner className="animate-spin mr-2" /> Sending...
                      </span>
                    ) : 'Send Message'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Contact;
