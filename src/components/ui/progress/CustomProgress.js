// components/ui/progress/CustomProgress.js
import React from "react";
import PropTypes from "prop-types";

const CustomProgress = ({ value, max = 100, className }) => {
  // Calculate the percentage based on value and max, capped at 100%
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      {/* Main container for the progress bar */}
      <div className="relative h-3 w-full rounded-full bg-gray-200 overflow-hidden">
        {/* Progress bar with a gradient and smooth transition */}
        <div
          className="absolute h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        >
          {/* Subtle shine effect on the progress bar */}
          <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
        </div>
      </div>
      {/* Percentage text displayed below the bar */}
      <div className="mt-1 text-sm font-medium text-gray-600 text-right">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

// Define propTypes for type checking
CustomProgress.propTypes = {
  value: PropTypes.number.isRequired, // Current value of the progress (required)
  max: PropTypes.number, // Maximum value, defaults to 100
  className: PropTypes.string, // Custom class for additional styling
};

export default CustomProgress;