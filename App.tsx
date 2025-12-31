import React, { useState } from 'react';
import Header from './components/Header';
import GeneratorForm from './components/GeneratorForm';
import ProcessingTerminal from './components/ProcessingTerminal';
import Verification from './components/Verification';
import LiveActivity from './components/LiveActivity';
import { GenerationState, UserData } from './types';

function App() {
  const [step, setStep] = useState<GenerationState>('IDLE');
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleGenerate = (data: UserData) => {
    setUserData(data);
    setStep('PROCESSING');
  };

  const handleProcessingComplete = () => {
    setStep('VERIFICATION');
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center py-6 px-4 font-sans selection:bg-blue-500/30">
      
      <Header />

      <main className="w-full max-w-4xl flex flex-col items-center relative z-20">
        {step === 'IDLE' && (
          <GeneratorForm onGenerate={handleGenerate} />
        )}

        {step === 'PROCESSING' && userData && (
          <ProcessingTerminal userData={userData} onComplete={handleProcessingComplete} />
        )}

        {step === 'VERIFICATION' && userData && (
          <Verification userData={userData} />
        )}

        {/* Trust Badges / Social Proof */}
        {step === 'IDLE' && <LiveActivity />}
        
        {/* Footer info */}
        <div className="mt-12 text-center border-t border-gray-800 pt-8 w-full max-w-2xl">
            <p className="text-gray-600 text-xs mb-4">
                This tool is for educational purposes only. We are not affiliated with Another Axiom or Gorilla Tag.
                <br />
                Shiny Rocks are generated using server-side promo code emulation.
            </p>
            <div className="flex justify-center gap-4 text-xs text-gray-500 font-bold">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span>Contact Us</span>
            </div>
            <p className="text-gray-700 text-[10px] mt-4">
                Copyright © 2026 GTAG Tools. All rights reserved.
            </p>
        </div>
      </main>
      
      {/* Background Particles (Subtle) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-[30%] right-[15%] w-3 h-3 bg-white rounded-full opacity-50"></div>
        <div className="absolute bottom-[20%] left-[10%] w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="absolute top-[60%] right-[5%] w-1 h-1 bg-blue-300 rounded-full"></div>
      </div>
    </div>
  );
}

export default App;