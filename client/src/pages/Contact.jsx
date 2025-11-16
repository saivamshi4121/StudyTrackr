import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Simulate form submission (no backend)
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Iam here to help with anything you need. Reach out to me and I'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Details & Form Section */}
      <section className="w-full bg-gray-50 px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Contact Details */}
            <div className="space-y-6">
              {/* StudyTrackr Support Card */}
              <div className="bg-turquoise/10 border-2 border-turquoise rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-black mb-4">StudyTrackr Support</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📧</span>
                    <div>
                      <p className="font-semibold text-black">Email</p>
                      <a
                        href="mailto:support@studytrackr.com"
                        className="text-gray-700 hover:text-orange transition"
                      >
                        support@studytrackr.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📞</span>
                    <div>
                      <p className="font-semibold text-black">Phone</p>
                      <a
                        href="tel:9490940282"
                        className="text-gray-700 hover:text-orange transition"
                      >
                        9490940282
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📍</span>
                    <div>
                      <p className="font-semibold text-black">Address</p>
                      <p className="text-gray-700">xyz city, abc state 500086</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer Contact Card */}
              <div className="bg-turquoise/10 border-2 border-turquoise rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-black mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">💼</span>
                    <div>
                      <p className="font-semibold text-black">LinkedIn</p>
                      <a
                        href="https://www.linkedin.com/in/saivamshi-webdev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-orange transition"
                      >
                        saivamshi-webdev
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📧</span>
                    <div>
                      <p className="font-semibold text-black">Email</p>
                      <a
                        href="mailto:palamurivamshi2005@gmail.com"
                        className="text-gray-700 hover:text-orange transition"
                      >
                        palamurivamshi2005@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-black mb-6">Send us a Message</h3>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-green-700 font-semibold">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="input"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      className="input"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-3 text-base font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="w-full bg-white px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            I'm Here to Help
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Whether you have questions about features, need technical support, or want to provide feedback, 
            I'd love to hear from you. 
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold text-black mb-2">Quick Response</h3>
              <p className="text-sm text-gray-600">
                The typically respond within 24 hours
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-bold text-black mb-2">Friendly Support</h3>
              <p className="text-sm text-gray-600">
                The team is here to help you succeed
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-lg font-bold text-black mb-2">Technical Help</h3>
              <p className="text-sm text-gray-600">
                Get assistance with any technical issues
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

