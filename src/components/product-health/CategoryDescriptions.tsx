import React from 'react';

export const CategoryDescriptions = () => {
  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-xl p-6 transition-all duration-300 hover:bg-opacity-10">
        <h3 className="text-2xl font-semibold mb-2 text-emerald-400">
          Healthy Products
        </h3>
        <p className="text-gray-300">
          Products that are safe and beneficial for daily consumption, with high nutritional value.
        </p>
      </div>

      <div className="glass-effect rounded-xl p-6 transition-all duration-300 hover:bg-opacity-10">
        <h3 className="text-2xl font-semibold mb-2 text-amber-400">
          Restricted Use
        </h3>
        <p className="text-gray-300">
          Products that should be consumed in moderation or with certain precautions.
        </p>
      </div>

      <div className="glass-effect rounded-xl p-6 transition-all duration-300 hover:bg-opacity-10">
        <h3 className="text-2xl font-semibold mb-2 text-red-400">
          Harmful Products
        </h3>
        <p className="text-gray-300">
          Products that may pose health risks and should be avoided or used with extreme caution.
        </p>
      </div>
    </div>
  );
};