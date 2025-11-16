import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Free Plan',
      description: 'Best for students beginning their journey',
      price: 'Free',
      features: [
        'Create tasks',
        'Track progress',
        'View teacher dashboard',
        'Basic task management',
      ],
      buttonText: 'Get Started',
      buttonLink: '/register',
      highlight: false,
      borderColor: 'border-turquoise',
    },
    {
      name: 'Teacher Plan',
      description: 'Perfect for teachers monitoring student progress',
      price: 'Free',
      features: [
        'See student tasks',
        'Manage own tasks',
        'Monitor class progress',
        'View all assigned students',
        'Track student completion',
      ],
      buttonText: 'Get Started',
      buttonLink: '/register',
      highlight: true,
      borderColor: 'border-orange',
    },
    {
      name: 'Institutional',
      description: 'For schools and departments',
      price: 'Contact Us',
      features: [
        'Create teacher accounts',
        'Monitor entire campus',
        'Manage users',
        'Full administrative access',
        'Priority support',
      ],
      buttonText: 'Contact Us',
      buttonLink: '/contact',
      highlight: false,
      borderColor: 'border-turquoise',
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Choose the plan that fits your learning needs. All plans are currently free to help you get started.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="w-full bg-gray-50 px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-300 border-2 ${
                  plan.borderColor
                } ${plan.highlight ? 'ring-2 ring-orange ring-opacity-50' : ''}`}
              >
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-black">{plan.price}</span>
                    {plan.price !== 'Free' && plan.price !== 'Contact Us' && (
                      <span className="text-gray-600">/month</span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-turquoise text-xl mr-2 font-bold">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  to={plan.buttonLink}
                  className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition ${
                    plan.highlight
                      ? 'bg-orange text-white hover:bg-black'
                      : 'bg-turquoise text-black hover:bg-black hover:text-white'
                  } shadow-md hover:shadow-lg`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (Optional) */}
      <section className="w-full bg-white px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-black mb-2">Is StudyTrackr really free?</h3>
              <p className="text-gray-600">
                Yes! StudyTrackr is currently free for all users. Students, teachers, and principals can all use the platform at no cost.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-black mb-2">How do I get started?</h3>
              <p className="text-gray-600">
                Simply register for an account, select your role (student, teacher, or principal), and you're ready to start managing tasks!
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-black mb-2">Can I switch plans later?</h3>
              <p className="text-gray-600">
                Your account role is set during registration. If you need to change your role, please contact support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-turquoise py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            Ready to join StudyTrackr?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Start managing your learning journey today. It's free and takes less than a minute to get started.
          </p>
          <Link
            to="/register"
            className="inline-block bg-orange text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-black transition shadow-lg hover:shadow-xl"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

