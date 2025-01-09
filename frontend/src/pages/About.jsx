import React, { useState, useEffect } from 'react';

// Custom SVG Icons
const ChefIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6V13.87Z" />
    <path d="M6 17h12" />
  </svg>
);

const PizzaIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a10 10 0 0 1 10 10" />
    <path d="M2 12h20" />
  </svg>
);

const About = () => {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    const mockChefs = [
      {
        id: 1,
        name: "Isabella Romano",
        image: "https://plus.unsplash.com/premium_photo-1687697861242-03e99059e833?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D",
        experience: "15 years",
        favPizza: "Margherita Classica",
        bio: "Trained in Naples, Isabella brings authentic Italian techniques to every pizza."
      },
      {
        id: 2,
        name: "Marco Rossi",
        image: "https://plus.unsplash.com/premium_photo-1682092228472-0d0b8767c190?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGNoZWZ8ZW58MHx8MHx8fDA%3D",
        experience: "12 years",
        favPizza: "Quattro Formaggi",
        bio: "A cheese expert who perfected his craft in various regions of Italy."
      },
      {
        id: 3,
        name: "Sofia Martinez",
        image: "https://plus.unsplash.com/premium_photo-1661778091956-15dbe6e47442?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D",
        experience: "8 years",
        favPizza: "Prosciutto e Funghi",
        bio: "Known for her innovative combinations of traditional ingredients."
      },
      {
        id: 4,
        name: "Luca Bianchi",
        image: "https://plus.unsplash.com/premium_photo-1661721578455-d13b23ec66c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        experience: "20 years",
        favPizza: "Napoletana",
        bio: "Our head chef who learned the art of pizza-making from his grandfather."
      }
    ];
    setChefs(mockChefs);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative mb-12 bg-gradient-to-r from-red-700 to-red-900 rounded-lg"
              style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundSize: 'cover',
            // backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
  >
        <div className="py-20 px-6 text-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-4"
          
          >Our Story</h1>
          <p className="text-white text-xl opacity-90">Crafting authentic  pizzas since 1985</p>
        </div>
      </div>

      {/* Story Section */}
      <div className="mb-16">
        <p className="text-lg mb-6">
          Founded in 1985 by the Romano family, Forever Pizzaeria began as a small corner shop in downtown with one simple mission: to bring authentic Italian pizza to our community. Our journey started when Grandfather Radhe Romano brought his secret dough recipe from Naples, passed down through generations.
        </p>
        
        <div className="flex gap-8 items-center mb-6">
          <img 
            src="https://images.unsplash.com/photo-1559183533-ee5f4826d3db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHJlc3RhdXJhbnQlMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D" 
            alt="Restaurant History" 
            className="w-1/2 rounded-lg shadow-md"
          />
          <p className="w-1/2 text-lg">
            What began as a modest family operation has grown into a beloved establishment, but our commitment to quality and tradition remains unchanged. Every pizza is still made with the same care and attention that Grandfather Giuseppe insisted upon decades ago.
          </p>
        </div>

        <p className="text-lg">
          Today, we continue to honor our heritage while embracing innovation. Our wood-fired ovens are still burning, our dough is still made fresh daily, and our ingredients are still sourced from the finest local and Italian suppliers.
        </p>
      </div>

      {/* Meet Our Chefs Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Master Pizzaiolos</h2>
        <div className="flex gap-4 space-y-0">
          {chefs.map((chef) => (
            <div 
              key={chef.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 border border-gray-200"
            >
              <div className="flex flex-col gap-2">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-50 h-48 object-cover rounded-lg shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">{chef.name}</h3>
                  <div className="flex flex-col gap-6 mb-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <ChefIcon />
                      <span>{chef.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <PizzaIcon />
                      <span>{chef.favPizza}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{chef.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;