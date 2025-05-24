import { useState } from 'react'
import PomodoroTimer from './components/focus/PomodoroTimer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          FANB - Focus, Arrange, Notify, Balance
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
          Aplikasi manajemen diri untuk produktivitas dan keseimbangan hidup
        </p>
      </header>

      <main className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
            Focus
          </h2>
          <PomodoroTimer 
            initialMinutes={25} 
            onComplete={() => console.log("Timer selesai!")} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Arrange</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Fitur manajemen tugas akan segera tersedia.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Notify</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Fitur notifikasi akan segera tersedia.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Balance</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Fitur keseimbangan akan segera tersedia.
            </p>
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
