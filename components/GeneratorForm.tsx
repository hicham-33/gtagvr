import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Platform, Amount, UserData } from '../types';
import { Monitor, Gamepad2, User, ChevronDown } from 'lucide-react';

interface GeneratorFormProps {
  onGenerate: (data: UserData) => void;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate }) => {
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState<Platform>(Platform.MetaQuest);
  const [amount, setAmount] = useState<Amount>(Amount.TwoThousandFiveHundred);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!username.trim()) {
      setError('Please enter your GTAG username');
      return;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    setError('');
    onGenerate({ username, platform, amount });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto bg-[#1e1e1e] border border-gray-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm bg-opacity-90"
    >
      {/* Decorative top sheen */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

      {/* Username Input */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm font-semibold mb-2 ml-1">USERNAME</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#121212] text-white border-2 border-[#333] rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium placeholder-gray-600"
            placeholder="Enter Gorilla Tag Name..."
          />
        </div>
        {error && <p className="text-red-400 text-xs mt-2 ml-1 animate-pulse">{error}</p>}
      </div>

      {/* Platform Selection */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm font-semibold mb-2 ml-1">PLATFORM</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPlatform(Platform.MetaQuest)}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
              platform === Platform.MetaQuest
                ? 'bg-blue-600/20 border-blue-500 text-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                : 'bg-[#121212] border-[#333] text-gray-500 hover:border-gray-600'
            }`}
          >
            <Gamepad2 className="w-6 h-6 mb-1" />
            <span className="text-xs font-bold">Meta Quest</span>
          </button>
          <button
            onClick={() => setPlatform(Platform.SteamVR)}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
              platform === Platform.SteamVR
                ? 'bg-blue-600/20 border-blue-500 text-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                : 'bg-[#121212] border-[#333] text-gray-500 hover:border-gray-600'
            }`}
          >
            <Monitor className="w-6 h-6 mb-1" />
            <span className="text-xs font-bold">SteamVR</span>
          </button>
        </div>
      </div>

      {/* Amount Selection */}
      <div className="mb-8">
        <label className="block text-gray-400 text-sm font-semibold mb-2 ml-1">AMOUNT</label>
        <div className="relative">
          <select
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) as Amount)}
            className="w-full appearance-none bg-[#121212] text-white border-2 border-[#333] rounded-2xl py-3 pl-4 pr-10 focus:outline-none focus:border-blue-500 transition-all font-bold text-lg"
          >
            <option value={1000}>1,000 Shiny Rocks</option>
            <option value={2500}>2,500 Shiny Rocks</option>
            <option value={5000}>5,000 Shiny Rocks</option>
            <option value={10000}>10,000 Shiny Rocks</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg transform transition-all active:scale-95 active:shadow-none relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>
        <span className="text-lg tracking-wider uppercase drop-shadow-md">Generate Shiny Rocks</span>
      </button>

      <div className="text-center mt-4">
        <p className="text-gray-500 text-xs">
          Server load is high. Verification may be required.
        </p>
      </div>
    </motion.div>
  );
};

export default GeneratorForm;