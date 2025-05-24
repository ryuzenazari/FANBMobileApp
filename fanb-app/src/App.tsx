import { useState, useEffect } from 'react'
import PomodoroTimer from './components/focus/PomodoroTimer'
import TaskManager from './components/arrange/TaskManager'
import NotificationCenter from './components/notify/NotificationCenter'
import BalanceTracker from './components/balance/BalanceTracker'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Cek preferensi sistem atau pengaturan user sebelumnya
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark' || (!savedTheme && isDark));
  }, []);

  useEffect(() => {
    // Apply dark mode class to HTML element
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors duration-300">
      <header className="container mx-auto px-4 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FANB
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Focus, Arrange, Notify, Balance
          </p>
        </div>
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>
      </header>

      <main className="container mx-auto px-4">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Focus Section - Larger tile */}
          <div className="lg:col-span-2 md:row-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <span className="inline-block w-3 h-3 bg-primary rounded-full mr-2"></span>
                Focus
              </h2>
            </div>
            <div className="p-4">
              <PomodoroTimer initialMinutes={25} />
            </div>
          </div>

          {/* Arrange Section */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Arrange
              </h2>
            </div>
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-400 italic">
                Fitur manajemen tugas akan segera tersedia.
              </p>
              <TaskManager />
            </div>
          </div>

          {/* Notify Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Notify
              </h2>
            </div>
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-400 italic">
                Fitur notifikasi akan segera tersedia.
              </p>
              <NotificationCenter />
            </div>
          </div>

          {/* Balance Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                Balance
              </h2>
            </div>
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-400 italic">
                Fitur keseimbangan akan segera tersedia.
              </p>
              <BalanceTracker />
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 p-4">
        <p>© 2025 FANB App</p>
        <p className="text-sm">Version 0.1.0</p>
      </footer>
    </div>
  )
}

export default App
