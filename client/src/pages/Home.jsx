import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section - Left Text, Right Image */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-10 py-12 md:py-20">
          {/* Left: Text Content */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
              Manage Your Learning Easily
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              StudyTrackr helps students stay organized and teachers manage tasks effortlessly. 
              Streamline your educational workflow with our intuitive platform.
            </p>
            <div>
              <Link
                to="/register"
                className="inline-block bg-orange text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-black transition shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
          
          {/* Right: Hero Image */}
          <div className="order-first md:order-last animate-fade-in-right">
            <img
              src="/hero.png"
              alt="StudyTrackr Hero"
              className="w-full rounded-xl shadow-lg image-hover"
            />
          </div>
        </div>
      </section>

      {/* Feature Section 1 - Left Image, Right Text (Alternate Layout) */}
      <section className="w-full bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-10 py-12 md:py-20">
          {/* Left: Feature Image */}
          <div className="animate-fade-in-left">
            <img
              src="/feature1.png"
              alt="Task Management Feature"
              className="w-full rounded-xl shadow-lg image-hover"
            />
          </div>
          
          {/* Right: Text Content */}
          <div className="flex flex-col space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Organize Tasks Effortlessly
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Create, track, and manage your tasks with ease. Students can organize their assignments 
              while teachers monitor progress and provide guidance in real-time.
            </p>
            <div className="flex items-center space-x-2 text-turquoise">
              <span className="text-2xl font-bold">✓</span>
              <span className="font-semibold">Real-time Progress Tracking</span>
            </div>
            <div className="flex items-center space-x-2 text-turquoise">
              <span className="text-2xl font-bold">✓</span>
              <span className="font-semibold">Smart Task Prioritization</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 - Left Text, Right Image (Alternate Layout) */}
      <section className="w-full bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-10 py-12 md:py-20">
          {/* Left: Text Content */}
          <div className="flex flex-col space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Seamless Teacher-Student Collaboration
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Connect with your students and manage their learning journey. Teachers can assign tasks, 
              track completion, and provide feedback all in one place.
            </p>
            <div className="flex items-center space-x-2 text-orange">
              <span className="text-2xl font-bold">✓</span>
              <span className="font-semibold">Direct Communication</span>
            </div>
            <div className="flex items-center space-x-2 text-orange">
              <span className="text-2xl font-bold">✓</span>
              <span className="font-semibold">Progress Analytics</span>
            </div>
          </div>
          
          {/* Right: Feature Image */}
          <div className="animate-fade-in-right">
            <img
              src="/feature2.png"
              alt="Collaboration Feature"
              className="w-full rounded-xl shadow-lg image-hover"
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full bg-turquoise py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of students and teachers who are already using StudyTrackr to stay organized and productive.
          </p>
          <Link
            to="/register"
            className="inline-block bg-orange text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-black transition shadow-lg hover:shadow-xl"
          >
            Start Your Journey Today
          </Link>
        </div>
      </section>
    </div>
  );
}

