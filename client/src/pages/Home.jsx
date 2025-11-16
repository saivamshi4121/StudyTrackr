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
              StudyTrackr is the modern learning management platform that helps students stay organized 
              and teachers manage tasks effortlessly. Streamline your educational workflow with our intuitive platform.
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
              src="/assets/hero.png"
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
              src="/assets/feature1.png"
              alt="Task Management Feature"
              className="w-full rounded-xl shadow-lg image-hover"
            />
          </div>
          
          {/* Right: Text Content */}
          <div className="flex flex-col space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Track Tasks Effortlessly
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Create, track, and manage your tasks with ease. Students can organize their assignments 
              while teachers monitor progress and provide guidance in real-time. Stay on top of deadlines 
              and never miss an important task.
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
              Built for Students & Teachers
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Connect with your students and manage their learning journey. Teachers can assign tasks, 
              track completion, and provide feedback all in one place. A platform designed to enhance 
              the educational experience for everyone.
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
              src="/assets/feature2.png"
              alt="Collaboration Feature"
              className="w-full rounded-xl shadow-lg image-hover"
            />
          </div>
        </div>
      </section>

      {/* Benefits Grid Section */}
      <section className="w-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
            Why Choose StudyTrackr?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              
              <h3 className="text-xl font-bold text-black mb-2">Organize Tasks Smoothly</h3>
              <p className="text-gray-600">
                Keep all your assignments and tasks in one organized place with intuitive categorization.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              
              <h3 className="text-xl font-bold text-black mb-2">Monitor Student Progress</h3>
              <p className="text-gray-600">
                Teachers can easily track student progress and provide timely feedback and support.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              
              <h3 className="text-xl font-bold text-black mb-2">Real-time Updates</h3>
              <p className="text-gray-600">
                Get instant notifications and updates on task status, deadlines, and progress changes.
              </p>
            </div>

            {/* Benefit Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
             
              <h3 className="text-xl font-bold text-black mb-2">Secure & Role-based</h3>
              <p className="text-gray-600">
                Advanced security with role-based access control for students, teachers, and principals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Metrics Section */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-turquoise mb-2">300+</div>
              <div className="text-lg text-gray-600 font-semibold">Students</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange mb-2">50+</div>
              <div className="text-lg text-gray-600 font-semibold">Teachers</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-turquoise mb-2">1,200+</div>
              <div className="text-lg text-gray-600 font-semibold">Tasks Managed</div>
            </div>

            {/* Stat 4 */}
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange mb-2">100%</div>
              <div className="text-lg text-gray-600 font-semibold">Secure Platform</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-black">1</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Create an Account</h3>
              <p className="text-gray-600">
                Sign up as a student or teacher. Students can select their assigned teacher during registration.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Assign or Manage Tasks</h3>
              <p className="text-gray-600">
                Teachers create tasks for themselves. Students create and manage their own assignments with progress tracking.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-black">3</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Track Progress</h3>
              <p className="text-gray-600">
                Monitor task completion, view progress analytics, and stay organized with real-time updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
              <div className="text-orange text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic mb-4">
                "StudyTrackr helped me stay organized! I can now manage all my assignments in one place and never miss a deadline."
              </p>
              <div className="font-semibold text-black">- Sarah, Student</div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
              <div className="text-orange text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic mb-4">
                "Teachers love tracking student tasks easily. The platform makes it simple to monitor progress and provide timely feedback."
              </p>
              <div className="font-semibold text-black">- Mr. Johnson, Teacher</div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
              <div className="text-orange text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic mb-4">
                "The role-based system is perfect for our school. Principals can manage teachers while maintaining clear boundaries."
              </p>
              <div className="font-semibold text-black">- Principal Williams</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full bg-turquoise py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            Start Managing Your Learning Today
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of students and teachers who are already using StudyTrackr to stay organized and productive.
          </p>
          <Link
            to="/register"
            className="inline-block bg-orange text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-black transition shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

