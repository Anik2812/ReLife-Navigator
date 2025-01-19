const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('../models/Question');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const addQuestions = async () => {
  await connectDB();

  const questions = [
    {
      category: 'Disaster Preparedness',
      question: 'What is the safest action to take during an earthquake if you are indoors?',
      options: ['Run outside immediately', 'Take cover under a sturdy piece of furniture', 'Stand near a window', 'Use the elevator to evacuate'],
      correctAnswer: 'Take cover under a sturdy piece of furniture',
    },
    {
      category: 'Disaster Preparedness',
      question: 'Which items are crucial to include in an emergency survival kit?',
      options: ['Non-perishable food, water, flashlight, and first aid kit', 'Laptop, snacks, and phone charger', 'Clothes, cash, and passport', 'Books and board games'],
      correctAnswer: 'Non-perishable food, water, flashlight, and first aid kit',
    },
    {
      category: 'Disaster Preparedness',
      question: 'For how many days should your emergency water supply be sufficient?',
      options: ['1 day', '3 days', '7 days', '14 days'],
      correctAnswer: '3 days',
    },
    {
      category: 'Relief Resource Awareness',
      question: 'What is the primary function of a disaster relief shelter?',
      options: ['Provide entertainment', 'Offer temporary housing, food, and safety', 'Host community events', 'Serve as a government office'],
      correctAnswer: 'Offer temporary housing, food, and safety',
    },
    {
      category: 'Relief Resource Awareness',
      question: 'Who should you contact to report the need for disaster relief resources in your area?',
      options: ['Social media influencers', 'Local disaster management authorities', 'Your friends and family', 'News channels'],
      correctAnswer: 'Local disaster management authorities',
    },
    {
      category: 'Disaster Management & Recovery',
      question: 'What is the first step in assisting an injured person during a disaster?',
      options: ['Move them immediately to a hospital', 'Call emergency services and provide basic first aid', 'Leave them and evacuate yourself', 'Take photos for documentation'],
      correctAnswer: 'Call emergency services and provide basic first aid',
    },
    {
      category: 'Disaster Management & Recovery',
      question: 'What does the term "evacuation zone" refer to?',
      options: ['An area designated for people to leave due to a disaster risk', 'A place where people are required to gather for a festival', 'A zone where no one is allowed to enter for any reason', 'A tourist attraction during disasters'],
      correctAnswer: 'An area designated for people to leave due to a disaster risk',
    },
    {
      category: 'General Awareness',
      question: 'Which of the following natural disasters can be predicted with the highest accuracy?',
      options: ['Earthquakes', 'Hurricanes', 'Tsunamis', 'Volcanic eruptions'],
      correctAnswer: 'Hurricanes',
    },
    {
      category: 'General Awareness',
      question: 'What is the most common cause of wildfires?',
      options: ['Lightning strikes', 'Careless human activities', 'Volcanic eruptions', 'Spontaneous combustion'],
      correctAnswer: 'Careless human activities',
    },
    {
      category: 'General Awareness',
      question: 'What is the primary purpose of disaster management training?',
      options: ['To entertain people during disasters', 'To prepare individuals and communities to respond effectively to emergencies', 'To create employment opportunities', 'To teach people how to rebuild homes'],
      correctAnswer: 'To prepare individuals and communities to respond effectively to emergencies',
    },
  ];

  try {
    await Question.insertMany(questions);
    console.log('Questions added successfully');
    process.exit();
  } catch (error) {
    console.error('Error adding questions:', error.message);
    process.exit(1);
  }
};

addQuestions();