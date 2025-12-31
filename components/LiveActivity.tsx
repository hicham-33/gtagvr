import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActivityItem } from '../types';

const RECENT_USERS = [
  "MonkeyKing99", "GorillaTagPro", "LavaMonkey22", "JukesMaster", 
  "BranchRunner", "ShinyHunter", "VR_Gamer_X", "QuestUser2026",
  "NoobSlayer", "BananaLover", "WallRunner"
];

const PLATFORMS = ["Meta Quest", "SteamVR"];
const AMOUNTS = [1000, 2500, 5000, 10000];

const LiveActivity: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    { username: "SpeedyMonke", amount: 5000, timeAgo: "now", platform: "Meta Quest" },
    { username: "QuestGod", amount: 2500, timeAgo: "2s ago", platform: "Meta Quest" },
    { username: "SteamPlayer1", amount: 10000, timeAgo: "5s ago", platform: "SteamVR" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newUser = RECENT_USERS[Math.floor(Math.random() * RECENT_USERS.length)];
      const newAmount = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)];
      const newPlatform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
      
      const newActivity: ActivityItem = {
        username: newUser,
        amount: newAmount,
        timeAgo: "now",
        platform: newPlatform
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 3)]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-12 mb-8">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Live Activity
        </h3>
        <span className="text-xs text-gray-600">Updated Real-time</span>
      </div>
      
      <div className="space-y-3">
        <AnimatePresence mode='popLayout'>
          {activities.map((activity, index) => (
            <motion.div
              key={`${activity.username}-${index}`}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1e1e1e] border border-gray-800 rounded-xl p-3 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                  {activity.username.substring(0, 1)}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-200">{activity.username}</div>
                  <div className="text-[10px] text-gray-500">{activity.platform}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-blue-400">+{activity.amount.toLocaleString()}</div>
                <div className="text-[10px] text-gray-600">Generated</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveActivity;