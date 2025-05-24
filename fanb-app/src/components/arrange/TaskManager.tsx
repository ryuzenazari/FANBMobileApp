import { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Buat dokumentasi proyek', completed: false, priority: 'high' },
    { id: 2, text: 'UI desain halaman utama', completed: false, priority: 'medium' },
  ]);
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const addTask = () => {
    if (inputText.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false,
        priority: priority,
      };
      setTasks([...tasks, newTask]);
      setInputText('');
      // Tambahkan animasi feedback dengan efek mikro-interaksi
      const taskList = document.getElementById('task-list');
      if (taskList) {
        taskList.classList.add('flash-highlight');
        setTimeout(() => {
          taskList?.classList.remove('flash-highlight');
        }, 300);
      }
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="task-manager">
      <div className="task-input flex space-x-2 mb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Tambahkan tugas baru..."
            className="w-full p-2 pr-10 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <div className="absolute right-2 top-2.5 flex space-x-1">
            <button
              onClick={() => setPriority('low')}
              className={`w-4 h-4 rounded-full ${priority === 'low' ? 'ring-2 ring-green-500' : ''} bg-green-500 hover:opacity-80 transition-opacity`}
              title="Prioritas Rendah"
            />
            <button
              onClick={() => setPriority('medium')}
              className={`w-4 h-4 rounded-full ${priority === 'medium' ? 'ring-2 ring-yellow-500' : ''} bg-yellow-500 hover:opacity-80 transition-opacity`}
              title="Prioritas Sedang"
            />
            <button
              onClick={() => setPriority('high')}
              className={`w-4 h-4 rounded-full ${priority === 'high' ? 'ring-2 ring-red-500' : ''} bg-red-500 hover:opacity-80 transition-opacity`}
              title="Prioritas Tinggi"
            />
          </div>
        </div>
        <button
          onClick={addTask}
          className="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-colors duration-200 flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>

      <div id="task-list" className="space-y-2 transition-all">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">Belum ada tugas. Tambahkan tugas pertamamu!</p>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className={`group flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg ${
                task.completed ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'
              } hover:shadow-md transition-all duration-200`}
            >
              <span
                className={`${getPriorityColor(task.priority)} w-2 h-full rounded-full mr-3 flex-shrink-0`}
              />
              <div className="flex items-center flex-grow">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded-lg focus:ring-primary focus:ring-2 transition-colors cursor-pointer mr-2"
                />
                <span
                  className={`flex-grow ${
                    task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-white'
                  } transition-all duration-200`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => removeTask(task.id)}
                className="text-gray-400 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Delete task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager; 