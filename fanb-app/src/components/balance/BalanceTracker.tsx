import { useState } from 'react';

interface BalanceData {
  category: string;
  color: string;
  percentage: number;
  minutes: number;
}

const BalanceTracker = () => {
  const [balanceData, setBalanceData] = useState<BalanceData[]>([
    { category: 'Kerja', color: '#4f46e5', percentage: 40, minutes: 320 },
    { category: 'Belajar', color: '#0ea5e9', percentage: 25, minutes: 200 },
    { category: 'Istirahat', color: '#22c55e', percentage: 15, minutes: 120 },
    { category: 'Sosial', color: '#f97316', percentage: 10, minutes: 80 },
    { category: 'Lainnya', color: '#8b5cf6', percentage: 10, minutes: 80 },
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState<'hari' | 'minggu' | 'bulan'>('hari');

  // Perhitungan skor keseimbangan (0-100)
  const calculateBalanceScore = () => {
    // Algoritma sederhana - skor lebih tinggi jika persentase lebih merata
    const idealPercentage = 100 / balanceData.length;
    const deviationSum = balanceData.reduce((sum, item) => {
      return sum + Math.abs(item.percentage - idealPercentage);
    }, 0);
    
    // Konversi deviasi ke skor (100 = sempurna, 0 = tidak seimbang)
    return Math.max(0, 100 - (deviationSum / 2));
  };

  const balanceScore = calculateBalanceScore();
  const scoreColor = balanceScore >= 80 ? 'text-green-500' : balanceScore >= 60 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="balance-tracker">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Keseimbangan</h3>
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          {(['hari', 'minggu', 'bulan'] as const).map((period) => (
            <button
              key={period}
              className={`px-2 py-1 text-xs ${
                selectedPeriod === period 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              } transition-colors`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Skor Keseimbangan */}
      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">Skor Keseimbangan</h4>
          <span className={`text-xl font-bold ${scoreColor}`}>{balanceScore.toFixed(0)}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${
              balanceScore >= 80 ? 'bg-green-500' : balanceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`} 
            style={{ width: `${balanceScore}%` }}
          ></div>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {balanceScore >= 80 
            ? 'Sangat baik! Distribusi waktu kamu seimbang.' 
            : balanceScore >= 60 
            ? 'Cukup baik, namun masih bisa ditingkatkan.' 
            : 'Waktu kamu kurang seimbang, coba diversifikasi aktivitas.'}
        </p>
      </div>

      {/* Chart */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Distribusi Waktu</h4>
        
        {/* Circular Chart */}
        <div className="relative flex items-center justify-center mb-4">
          {/* Center circle with balance score */}
          <div className="absolute w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-inner border border-gray-200 dark:border-gray-700 flex items-center justify-center z-10">
            <div className="text-center">
              <div className={`text-xl font-bold ${scoreColor}`}>{balanceScore.toFixed(0)}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">dari 100</div>
            </div>
          </div>
          
          {/* SVG chart */}
          <svg width="200" height="200" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="10" />
            
            {/* Dynamic segments */}
            {balanceData.map((data, index) => {
              let cumulativePercentage = balanceData
                .slice(0, index)
                .reduce((sum, item) => sum + item.percentage, 0);
              
              const offset = 100 - cumulativePercentage;
              const dash = (data.percentage / 100) * 251.2; // 2*π*40 ≈ 251.2
              
              return (
                <circle 
                  key={index}
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent" 
                  stroke={data.color}
                  strokeWidth="10"
                  strokeDasharray={`${dash} ${251.2 - dash}`}
                  strokeDashoffset={offset * 2.512}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                />
              );
            })}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-2">
          {balanceData.map((data) => (
            <div key={data.category} className="flex items-center text-sm">
              <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: data.color }}></span>
              <span className="text-gray-700 dark:text-gray-300 mr-1">{data.category}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {data.percentage}% ({Math.floor(data.minutes / 60)}j {data.minutes % 60}m)
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="text-sm text-primary hover:text-primary-dark dark:text-primary-light transition-colors">
          Lihat analisis lengkap
        </button>
      </div>
    </div>
  );
};

export default BalanceTracker; 