import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Calendar, MessageCircle } from 'lucide-react';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Empower Your Teaching Journey
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Join our platform to connect with students, manage your schedule, and grow your teaching career.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <Link
            to="/signup"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="mt-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={<BookOpen className="h-6 w-6" />}
            title="Course Management"
            description="Easily manage your courses and teaching materials in one place."
          />
          <Feature
            icon={<Users className="h-6 w-6" />}
            title="Student Tracking"
            description="Keep track of your students' progress and engagement."
          />
          <Feature
            icon={<Calendar className="h-6 w-6" />}
            title="Schedule Management"
            description="Organize your teaching schedule efficiently."
          />
          <Feature
            icon={<MessageCircle className="h-6 w-6" />}
            title="Communication"
            description="Stay connected with your students through our messaging system."
          />
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="pt-6">
      <div className="flow-root bg-white rounded-lg px-6 pb-8">
        <div className="-mt-6">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
            {icon}
          </div>
          <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{title}</h3>
          <p className="mt-5 text-base text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;