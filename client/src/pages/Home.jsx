import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black text-center px-4">
        Manage Your Learning Easily
      </h1>
      <p className="text-gray-700 text-center mt-4 text-sm sm:text-base md:text-lg max-w-2xl px-4">
        A simple and secure Student–Teacher Task Manager.
      </p>
      <Link to="/register" className="mt-6 bg-orange text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-black transition text-sm sm:text-base">
        Get Started
      </Link>
    </div>
  );
};

export default Home;

