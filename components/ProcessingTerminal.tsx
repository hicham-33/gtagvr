import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UserData } from '../types';
import { ShieldCheck, Server, Database, CheckCircle2 } from 'lucide-react';

interface ProcessingTerminalProps {
  userData: UserData;
  onComplete: () => void;
}

const steps = [
  "Connecting to secure server (256-bit encryption)...",
  "Verifying protocol version...",
  "Authorizing connection...",
  "Searching for username...",
  "Username found!",
  "Accessing database...",
  "Injecting packets...",
  "Bypassing integrity check...",
  "Modifying values...",
  "Saving changes...",
  "Finalizing synchronization...",
  "Verification Required for final release..."
];

const ProcessingTerminal: React.FC<ProcessingTerminalProps> = ({ userData, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let delay = 0;
    
    // Initial connection simulation
    const timer = setInterval(() => {
      if (currentStep < steps.length) {
        setLogs(prev => [...prev, steps[currentStep]]);
        setCurrentStep(prev => prev + 1);
        
        // Scroll to bottom
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(timer);
        setTimeout(onComplete, 1500);
      }
    }, 800); // Speed of each step

    return () => clearInterval(timer);
  }, [currentStep, onComplete]);

  // Dynamic customization of logs based on user input
  const getLogText = (text: string) => {
    if (text === "Searching for username...") return `Searching for user '${userData.username}' on ${userData.platform}...`;
    if (text === "Modifying values...") return `Adding ${userData.amount.toLocaleString()} Shiny Rocks to account...`;
    return text;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-black/80 rounded-3xl border border-green-500/30 p-1 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-[#0f0f0f] px-4 py-3 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-gray-500 font-mono">root@gtag-server:~</div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={scrollRef}
          className="h-64 p-4 overflow-y-auto font-mono text-sm space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
          {logs.map((log, index) => {
            const isSuccess = log.includes("Success") || log.includes("found") || log.includes("Complete");
            const isWarning = log.includes("Required") || log.includes("Bypassing");
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-start gap-2 ${
                  isSuccess ? 'text-green-400' : isWarning ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                <span className="opacity-50 text-xs">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                <span>{getLogText(log)}</span>
              </motion.div>
            );
          })}
          
          {currentStep < steps.length && (
            <motion.div 
              animate={{ opacity: [0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-green-500 inline-block align-middle ml-1"
            />
          )}
        </div>

        {/* Progress Bar */}
        <div className="bg-[#0f0f0f] p-4 border-t border-gray-800">
           <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Progress</span>
              <span>{Math.min(Math.round((currentStep / steps.length) * 100), 99)}%</span>
           </div>
           <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-400"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
           </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
         <div className="flex flex-col items-center text-center">
            <div className={`p-3 rounded-full mb-2 ${currentStep > 1 ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-600'}`}>
                <Server size={20} />
            </div>
            <span className="text-xs text-gray-500">Server</span>
         </div>
         <div className="flex flex-col items-center text-center">
            <div className={`p-3 rounded-full mb-2 ${currentStep > 5 ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-600'}`}>
                <Database size={20} />
            </div>
            <span className="text-xs text-gray-500">Database</span>
         </div>
         <div className="flex flex-col items-center text-center">
            <div className={`p-3 rounded-full mb-2 ${currentStep > 10 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-800 text-gray-600'}`}>
                <ShieldCheck size={20} />
            </div>
            <span className="text-xs text-gray-500">Verify</span>
         </div>
      </div>
    </motion.div>
  );
};

export default ProcessingTerminal;