import React from 'react';

const testimonials = [
  {
    name: 'Anik',
    feedback: 'ReLife Navigator has been a lifesaver! The personalized action plans and community support have helped me through tough times.',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Parth',
    feedback: 'I love the disaster relief map feature. It provides real-time information and resources that are incredibly helpful.',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Riya',
    feedback: 'The emotional support community is amazing. It’s great to connect with others who understand what I’m going through.',
    image: 'https://via.placeholder.com/150'
  }
];

const TestimonialsSection = () => {
  return (
    <section className="testimonials py-20 bg-gray-900 text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-center">{testimonial.name}</h3>
              <p className="text-center">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;