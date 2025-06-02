import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ROICalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<number>(1000);
  const [currentROI, setCurrentROI] = useState<number>(150);
  
  const calculateProjectedROI = () => {
    const sustainableMultiplier = 1.8; // 80% increase in ROI with sustainable practices
    const projectedROI = currentROI * sustainableMultiplier;
    return projectedROI.toFixed(2);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-emerald-400 mb-4">ROI Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Monthly Marketing Budget ($)
          </label>
          <input
            type="number"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Current ROI (%)
          </label>
          <input
            type="number"
            value={currentROI}
            onChange={(e) => setCurrentROI(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
          />
        </div>
        <div className="pt-4 border-t border-white/10">
          <div className="text-sm text-slate-300">Projected Sustainable ROI</div>
          <div className="text-2xl font-bold text-emerald-400">
            {calculateProjectedROI()}%
          </div>
          <div className="text-sm text-slate-400 mt-1">
            Estimated increase based on sustainable marketing practices
          </div>
        </div>
      </div>
    </motion.div>
  );
}