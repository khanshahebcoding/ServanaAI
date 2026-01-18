'use client';
import { motion } from 'framer-motion';

const statuses = [
  { id: 1, label: 'Created' },
  { id: 2, label: 'Acknowledged' },
  { id: 3, label: 'Assigned' },
  { id: 4, label: 'In Progress' },
  { id: 5, label: 'Resolved' },
  { id: 6, label: 'Pending Closure' },
  { id: 7, label: 'Closed' }
];

interface LifecycleRibbonProps {
  currentStatusId?: number;
}

const LifecycleRibbon = ({ currentStatusId = 2 }: LifecycleRibbonProps) => {
  return (
    <div className="w-full py-12 px-6 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="relative flex justify-between items-center max-w-5xl mx-auto">
        {/* Background Track */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2" />

        {/* Animated Progress Track */}
        <motion.div
           className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStatusId - 1) / (statuses.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Status Nodes */}
        {statuses.map((status) => {
          const isActive = status.id <= currentStatusId;
          const isCurrent = status.id === currentStatusId;

          return (
            <div key={status.id} className="relative z-10 flex flex-col items-center">
              {/* Node Circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                   scale: isCurrent ? 1.2 : 1,
                   opacity: 1,
                  backgroundColor: isActive ? '#4F46E5' : '#F1F5F9'
                }}
                whileHover={{ scale: 1.3 }}
                className={`w-4 h-4 rounded-full border-4 ${
                  isActive ? 'border-white ring-2 ring-primary' : 'border-white'
                }`}
              />

              {/* Status Label */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{
                   opacity: 1,
                   y: 0,
                  color: isActive ? '#1E293B' : '#94A3B8',
                  fontWeight: isCurrent ? 600 : 400
                }}
                className="absolute top-8 whitespace-nowrap text-xs font-medium uppercase tracking-wider"
              >
                {status.label}
              </motion.span>

              {/* Pulsing Effect for Current Status */}
              {isCurrent && (
                <motion.div
                  className="absolute w-4 h-4 bg-primary rounded-full"
                  animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LifecycleRibbon;
