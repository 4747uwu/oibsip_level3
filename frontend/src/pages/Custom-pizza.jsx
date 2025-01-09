// pages/custom-pizza.js
import CustomPizzaBuilder from '../components/pizza/CustomPizzaBuilder';
import bgImage from '../assets/bg-2.jpg';

export default function CustomPizzaPage() {
  return (
   <div className="relative min-h-screen">
      {/* Background */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center -z-10"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          // opacity: 0.8
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <CustomPizzaBuilder />
      </div>
    </div>
  );
}