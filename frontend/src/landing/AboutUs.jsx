import React from "react";
import {
  Users,
  Award,
  Clock,
  Globe,
  ChevronRight,
  BookOpen,
  Building,
  Heart,
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 md:py-24 px-6 bg-gray-100 text-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-blue-600">Stockify</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                We're on a mission to democratize investing and make financial
                growth accessible to everyone, regardless of their background or
                experience level.
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center">
                Learn More About Our Team
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://img.freepik.com/free-photo/business-people-standing-row-with-thumbs-up_1262-827.jpg?t=st=1743916366~exp=1743919966~hmac=3d985d90f694744e13ef5385359c723c750bda63c43bbc492b3962f3c5530bf6&w=1380"
                alt="Stockify Team"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Founded in 2023, Stockify began with a simple idea: investing
              shouldn't be complicated or exclusive. Our founders, experienced
              financial professionals, were frustrated by how difficult it was
              for everyday people to build wealth through investing.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              At Stockify, these core principles guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Accessibility
              </h3>
              <p className="text-gray-600">
                We believe financial tools should be accessible to everyone,
                regardless of their background or experience.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from data accuracy
                to user experience design.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                User-Focused
              </h3>
              <p className="text-gray-600">
                Our users come first in every decision we make, from feature
                development to customer support.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Transparency
              </h3>
              <p className="text-gray-600">
                We believe in complete transparency with our users about data,
                pricing, and performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Stockify who make our mission
              possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition">
              <img
                src="https://img.freepik.com/free-photo/portrait-confident-young-businessman-with-his-arms-crossed_23-2148176206.jpg?t=st=1743916845~exp=1743920445~hmac=2030d72cd73bcfff475b7624b0c19d9a2a8bb88dc037f8c3ca77c44c760f685e&w=740"
                alt="Arjun Mehta"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  Arjun Mehta
                </h3>
                <p className="text-blue-600 mb-4">Co-Founder & CEO</p>
                <p className="text-gray-600">
                  Former investment banker with 10+ years experience in
                  financial markets and technology.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition">
              <img
                src="https://img.freepik.com/free-photo/smiley-businesswoman-posing-outdoors-with-arms-crossed-copy-space_23-2148767055.jpg?t=st=1743916801~exp=1743920401~hmac=491544cfe76ddbc1bedcc87b3954e264b7a52ad618909d82b99cdeb6a10cec29&w=1060"
                alt="Neha Sharma"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  Neha Sharma
                </h3>
                <p className="text-blue-600 mb-4">Co-Founder & CTO</p>
                <p className="text-gray-600">
                  Tech innovator with expertise in financial data systems and
                  machine learning.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition">
              <img
                src="https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg?t=st=1743916877~exp=1743920477~hmac=4d3aba03aff40ab766709ef340ba0ba593d69ca6154d5c1c1868cc6068f1ecce&w=1380"
                alt="Vikram Patel"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  Vikram Patel
                </h3>
                <p className="text-blue-600 mb-4">Head of Product</p>
                <p className="text-gray-600">
                  UX specialist focused on creating intuitive financial
                  interfaces for users of all levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Our Mission
          </h2>
          <div className="w-20 h-1 bg-blue-600 mb-6 mx-auto lg:mx-0 rounded"></div>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            We're on a mission to empower individuals to take control of their
            financial futures through accessible, intelligent investing tools.
            We believe that financial literacy and proper investment management
            shouldn't be reserved for the wealthy or financial professionals.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            By 2030, we aim to help one million users build stronger investment
            portfolios and achieve their financial goals, regardless of their
            starting point or background.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Approach
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              How we're revolutionizing investment management for everyday
              investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Education First
              </h3>
              <p className="text-gray-600">
                We believe in empowering our users with knowledge. Our learning
                center breaks down complex financial concepts into
                easy-to-understand guides.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Data-Driven Decisions
              </h3>
              <p className="text-gray-600">
                Our platform leverages cutting-edge analytics to provide
                personalized recommendations based on your unique financial
                situation and goals.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Long-Term Focus
              </h3>
              <p className="text-gray-600">
                We design our tools to promote sustainable, long-term wealth
                building rather than short-term speculation or risky investment
                strategies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
