import TaskCard from './TaskCard';
import { useState } from 'react';

const TaskList = ({ tasks, onUpdate, onDelete, readOnly = false, title = 'Tasks' }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (taskId) => {
    setEditingId(taskId);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdate = async (taskId, updateData) => {
    await onUpdate(taskId, updateData);
    setEditingId(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500">No tasks found.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-black mb-4">{title} ({tasks.length})</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onUpdate={readOnly ? null : handleUpdate}
          onDelete={readOnly ? null : onDelete}
          isEditing={readOnly ? false : editingId === task._id}
          onEdit={readOnly ? null : handleEdit}
          onCancelEdit={readOnly ? null : handleCancelEdit}
          readOnly={readOnly}
        />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

