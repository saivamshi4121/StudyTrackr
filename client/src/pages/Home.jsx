import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl md:text-5xl font-bold text-black text-center">
        Manage Your Learning Easily
      </h1>
      <p className="text-gray-700 text-center mt-4">
        A simple and secure Student–Teacher Task Manager.
      </p>
      <Link to="/register" className="mt-6 bg-orange text-white px-8 py-3 rounded-lg hover:bg-black transition">
        Get Started
      </Link>
    </div>
  );
};

export default Home;

