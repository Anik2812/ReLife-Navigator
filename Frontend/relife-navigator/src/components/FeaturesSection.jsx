import React from 'react';
import { FaClipboardList, FaUsers, FaMapMarkedAlt } from 'react-icons/fa';

const features = [
  {
    title: 'Personal Recovery Hub',
    icon: <FaClipboardList size={40} className="text-blue-500" />,
    description: 'Manage your recovery with personalized action plans and resources.'
  },
  {
    title: 'Emotional Support Community',
    icon: <FaUsers size={40} className="text-green-500" />,
    description: 'Connect with others and find emotional support in our community.'
  },
  {
    title: 'Disaster Relief Map',
    icon: <FaMapMarkedAlt size={40} className="text-purple-500" />,
    description: 'Access real-time disaster relief resources and information.'
  }
];

const FeaturesSection = () => {
  return (
    <section className="features py-20 bg-gray-900 text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-center">{feature.title}</h3>
              <p className="text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;