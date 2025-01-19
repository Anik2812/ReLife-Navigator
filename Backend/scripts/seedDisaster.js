const mongoose = require('mongoose');
const Disaster = require('../models/Disaster'); // Adjust the path if necessary

const disasters = [
  {
    category: 'Earthquake',
    preparation: [
      'Identify safe spots in each room (under sturdy furniture, against inside walls).',
      'Secure heavy furniture and appliances to walls.',
      'Assemble an earthquake emergency kit (water, food, flashlight, batteries, first-aid, whistle, etc.).',
      'Create a family communication and evacuation plan.',
      'Learn how to turn off gas, water, and electricity in your home.',
    ],
    response: [
      'Drop, Cover, and Hold On during the shaking.',
      'Stay indoors until shaking stops; avoid doorways and windows.',
      'If outside, move to an open area away from buildings, trees, and power lines.',
    ],
    recovery: [
      'Check yourself and family members for injuries.',
      'Inspect your home for structural damage and gas leaks before re-entering.',
      'Contact emergency services if utilities are unsafe or need repair.',
    ],
  },
  {
    category: 'Flood',
    preparation: [
      'Know your area\'s flood risks and evacuation routes.',
      'Elevate electrical appliances and furniture if you live in a flood-prone zone.',
      'Keep important documents in waterproof bags or a safe place.',
      'Assemble a flood emergency kit with essentials (medications, dry clothes, waterproof flashlight, etc.).',
      'Buy flood insurance if available in your area.',
    ],
    response: [
      'Evacuate immediately if instructed by authorities.',
      'Avoid walking or driving through floodwaters (as little as 6 inches of water can knock you down).',
      'Disconnect electrical appliances and utilities if safe to do so.',
    ],
    recovery: [
      'Document flood damage with photos and videos for insurance claims.',
      'Clean and disinfect your home to prevent mold growth.',
      'Boil or purify drinking water until authorities confirm safety.',
    ],
  },
  {
    category: 'Wildfire',
    preparation: [
      'Clear dry vegetation and debris within 30 feet of your home.',
      'Create an emergency go-bag with masks, water, goggles, and fire-resistant clothing.',
      'Learn your area’s evacuation routes and practice an evacuation plan.',
      'Keep roofs and gutters clean of flammable debris.',
      'Install fire alarms and a sprinkler system if possible.',
    ],
    response: [
      'Evacuate immediately if wildfires are approaching your area.',
      'Close all windows and doors but leave them unlocked for firefighters\' access.',
      'Wear protective clothing and cover your nose/mouth with a wet cloth or N95 mask.',
    ],
    recovery: [
      'Do not return home until authorities declare the area safe.',
      'Inspect your home for lingering embers or hidden fire risks.',
      'Seek emotional support or counseling if you’re feeling overwhelmed.',
    ],
  },
  {
    category: 'Hurricane',
    preparation: [
      'Monitor weather alerts and warnings regularly.',
      'Reinforce doors, windows, and roofs to withstand strong winds.',
      'Stockpile a hurricane survival kit (water, non-perishable food, radio, first-aid, etc.).',
      'Trim trees near your property to prevent damage from falling branches.',
      'Fill your car\'s gas tank and identify shelters in your area.',
    ],
    response: [
      'Evacuate if instructed by local authorities.',
      'Stay indoors in an interior room, away from windows and doors.',
      'Turn off utilities like electricity and gas if flooding is imminent.',
    ],
    recovery: [
      'Document damages and file insurance claims promptly.',
      'Avoid driving or walking through floodwaters or debris-filled areas.',
      'Use extreme caution when inspecting damaged structures.',
    ],
  },
  {
    category: 'Pandemic',
    preparation: [
      'Maintain a stock of face masks, hand sanitizer, and cleaning supplies.',
      'Prepare a home quarantine kit with medications, a thermometer, and essential supplies.',
      'Set up remote working or learning options in case of lockdown.',
      'Identify vulnerable family members and arrange for their care.',
      'Stay updated on credible health authority guidelines.',
    ],
    response: [
      'Practice social distancing, proper hygiene, and mask-wearing.',
      'Self-isolate if you or a family member show symptoms.',
      'Seek medical care if symptoms worsen, following healthcare advice.',
    ],
    recovery: [
      'Disinfect your home regularly after quarantine or illness.',
      'Monitor your mental health and seek counseling if needed.',
      'Get vaccinated or follow up with booster shots if recommended.',
    ],
  },
];

const seedDisasters = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/relife-navigator', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Disaster.deleteMany({});
    await Disaster.insertMany(disasters);

    console.log('Disaster data seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding disaster data:', error);
    mongoose.connection.close();
  }
};

seedDisasters();