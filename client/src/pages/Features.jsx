import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      
      title: 'Student Task Management',
      description: 'Students can create, update, and track tasks with ease. Organize assignments, set deadlines, and monitor progress all in one place.',
      color: 'turquoise',
    },
    {
      
      title: 'Teacher Task Monitoring',
      description: 'Teachers can view tasks from all assigned students. Monitor progress, provide guidance, and stay connected with your class.',
      color: 'orange',
    },
    {
      
      title: 'Role-Based Access Control',
      description: 'Different dashboards for students, teachers, and principals. Each role has tailored features and appropriate permissions.',
      color: 'turquoise',
    },
    {
     
      title: 'Secure Authentication',
      description: 'JWT-based login with hashed passwords keeps accounts protected. Your data is safe and secure with industry-standard encryption.',
      color: 'orange',
    },
    {
     
      title: 'Principal Management Tools',
      description: 'Principals can create teacher accounts and manage the campus. Oversee the entire educational ecosystem from one dashboard.',
      color: 'turquoise',
    },
    {
      
      title: 'Progress Tracking',
      description: 'Track task progress with clean status indicators. Visual badges show not-started, in-progress, and completed states.',
      color: 'orange',
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            Powerful Features for Modern Learning
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            StudyTrackr gives students, teachers, and principals everything they need to stay organized, 
            track progress, and manage educational workflows efficiently.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="w-full bg-gray-50 px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-turquoise"
                style={{
                  borderLeftColor: feature.color === 'turquoise' ? '#5ce3d4' : '#ff914d',
                }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Feature Section 1 - Left Text, Right Image */}
      <section className="w-full bg-white px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: Text Content */}
            <div className="flex flex-col space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Intuitive Task Dashboard
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our clean, modern dashboard makes task management effortless. Students can create tasks, 
                update progress, and stay organized with an interface designed for productivity. 
                Everything you need is just a click away.
              </p>
              <div className="flex items-center space-x-2 text-turquoise">
                <span className="text-2xl font-bold">✓</span>
                <span className="font-semibold">Real-time progress updates</span>
              </div>
              <div className="flex items-center space-x-2 text-turquoise">
                <span className="text-2xl font-bold">✓</span>
                <span className="font-semibold">Filter and organize with ease</span>
              </div>
              <div className="flex items-center space-x-2 text-turquoise">
                <span className="text-2xl font-bold">✓</span>
                <span className="font-semibold">Mobile-responsive design</span>
              </div>
            </div>

             {/* Right: Illustration */}
             <div className="animate-fade-in-right">
               <img
                 src="/assets/feature_section_1.png"
                 alt="Task Dashboard Preview"
                 className="w-full rounded-xl shadow-lg image-hover"
               />
             </div>
          </div>
        </div>
      </section>

      {/* Split Feature Section 2 - Right Text, Left Image */}
      <section className="w-full bg-gray-50 px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
             {/* Left: Illustration */}
             <div className="order-2 md:order-1 animate-fade-in-left">
               <img
                 src="/assets/featurepage_2.png"
                 alt="Student–Teacher Connection"
                 className="w-full rounded-xl shadow-lg image-hover"
               />
             </div>

            {/* Right: Text Content */}
            <div className="order-1 md:order-2 flex flex-col space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Seamless Student–Teacher Connection
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Teachers can monitor all tasks from their assigned students in real-time. 
                This creates a transparent learning environment where teachers can provide 
                timely feedback and support. Students stay accountable while teachers stay informed.
              </p>
              <div className="flex items-center space-x-2 text-orange">
                <span className="text-2xl font-bold">✓</span>
                <span className="font-semibold">View all student tasks in one place</span>
              </div>
              <div className="flex items-center space-x-2 text-orange">
                <span className="text-2xl font-bold">✓</span>
                <span className="font-semibold">Track progress across your class</span>
              </div>
              <div className="flex items-center space-x-2 text-orange">
                <span className="text-2xl font-bold">✓</span>
                <span className="font-semibold">Provide guidance when needed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Highlight */}
      <section className="w-full bg-white px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
            Everything You Need in One Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Highlight 1 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-bold text-black mb-2">Secure & Private</h3>
              <p className="text-sm text-gray-600">
                Your data is encrypted and protected with industry-standard security measures.
              </p>
            </div>

            {/* Feature Highlight 2 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold text-black mb-2">Fast & Reliable</h3>
              <p className="text-sm text-gray-600">
                Built for performance with instant updates and seamless user experience.
              </p>
            </div>

            {/* Feature Highlight 3 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-lg font-bold text-black mb-2">Mobile Ready</h3>
              <p className="text-sm text-gray-600">
                Access your tasks from any device with our fully responsive design.
              </p>
            </div>

            {/* Feature Highlight 4 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-black mb-2">Easy to Use</h3>
              <p className="text-sm text-gray-600">
                Intuitive interface designed for students, teachers, and administrators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-turquoise py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of students and teachers who are already using StudyTrackr to stay organized and productive.
          </p>
          <Link
            to="/register"
            className="inline-block bg-orange text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-black transition shadow-lg hover:shadow-xl"
          >
            Create an Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;

