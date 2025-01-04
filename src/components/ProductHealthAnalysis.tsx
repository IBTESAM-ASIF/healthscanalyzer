import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Dec 24', healthy: 35, restricted: 20, harmful: 15 },
  { date: 'Dec 25', healthy: 35, restricted: 20, harmful: 15 },
  { date: 'Dec 26', healthy: 35, restricted: 20, harmful: 15 },
  { date: 'Dec 27', healthy: 35, restricted: 20, harmful: 15 },
  { date: 'Dec 28', healthy: 35, restricted: 20, harmful: 15 },
  { date: 'Dec 29', healthy: 35, restricted: 20, harmful: 15 },
  { date: 'Dec 30', healthy: 35, restricted: 20, harmful: 15 },
  { date: 'Dec 31', healthy: 35, restricted: 20, harmful: 15 },
  { date: 'Jan 01', healthy: 35, restricted: 20, harmful: 15 },
  { date: 'Jan 02', healthy: 35, restricted: 20, harmful: 15 },
];

const ProductHealthAnalysis = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-cosmic"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
          Product Health Analysis
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart Card */}
          <div className="glass-effect rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">10-Day Product Distribution</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.5)' }}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.5)' }}
                  />
                  <Bar 
                    dataKey="healthy" 
                    stackId="a" 
                    fill="#4ade80" 
                    name="Healthy Products"
                  />
                  <Bar 
                    dataKey="restricted" 
                    stackId="a" 
                    fill="#fbbf24" 
                    name="Restricted Use"
                  />
                  <Bar 
                    dataKey="harmful" 
                    stackId="a" 
                    fill="#f87171" 
                    name="Harmful Products"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Categories Description */}
          <div className="space-y-6">
            {/* Healthy Products */}
            <div className="glass-effect rounded-xl p-6 transition-all duration-300 hover:bg-opacity-10">
              <h3 className="text-2xl font-semibold mb-2 text-emerald-400">
                Healthy Products
              </h3>
              <p className="text-gray-300">
                Products that are safe and beneficial for daily consumption, with high nutritional value.
              </p>
            </div>

            {/* Restricted Use */}
            <div className="glass-effect rounded-xl p-6 transition-all duration-300 hover:bg-opacity-10">
              <h3 className="text-2xl font-semibold mb-2 text-amber-400">
                Restricted Use
              </h3>
              <p className="text-gray-300">
                Products that should be consumed in moderation or with certain precautions.
              </p>
            </div>

            {/* Harmful Products */}
            <div className="glass-effect rounded-xl p-6 transition-all duration-300 hover:bg-opacity-10">
              <h3 className="text-2xl font-semibold mb-2 text-red-400">
                Harmful Products
              </h3>
              <p className="text-gray-300">
                Products that may pose health risks and should be avoided or used with extreme caution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHealthAnalysis;