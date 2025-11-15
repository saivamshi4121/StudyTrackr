import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-black text-center">
        Manage Your Learning Easily
      </h1>

      <p className="mt-4 text-gray-600 text-lg text-center max-w-2xl">
        StudyTrackr helps students stay organized and teachers manage tasks effortlessly.
      </p>

      <Link
        to="/register"
        className="mt-8 bg-orange text-white px-8 py-3 rounded-lg text-lg hover:bg-black transition"
      >
        Get Started
      </Link>
    </div>
  );
}

