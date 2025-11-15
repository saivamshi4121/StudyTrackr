import { useState } from 'react';
import ProgressDropdown from './ProgressDropdown';

const TaskCard = ({ 
  task, 
  onUpdate, 
  onDelete, 
  isEditing, 
  onEdit, 
  onCancelEdit, 
  readOnly = false 
}) => {
  // Don't allow editing in read-only mode
  if (readOnly && isEditing) {
    return null;
  }
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || '',
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    progress: task.progress,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'progress' ? e.target.value : e.target.value,
    });
  };

  const handleProgressChange = (e) => {
    setFormData({
      ...formData,
      progress: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onUpdate) return;
    const updateData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
    };
    onUpdate(task._id, updateData);
  };

  const getProgressBadgeClass = (progress) => {
    switch (progress) {
      case 'not-started':
        return 'progress-badge progress-not-started';
      case 'in-progress':
        return 'progress-badge progress-in-progress';
      case 'completed':
        return 'progress-badge progress-completed';
      default:
        return 'progress-badge progress-not-started';
    }
  };

  if (isEditing) {
    return (
      <div className="card-task">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="input"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              className="input"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="input"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Progress</label>
            <ProgressDropdown
              value={formData.progress}
              onChange={handleProgressChange}
            />
          </div>
          <div className="flex space-x-3">
            <button type="submit" className="btn-secondary">Save</button>
            <button type="button" onClick={onCancelEdit} className="btn-danger">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="card-task">
      <h3 className="text-xl font-semibold text-black mb-2">{task.title}</h3>
      {task.description && <p className="text-gray-600 mb-3">{task.description}</p>}
      {task.dueDate && (
        <p className="text-gray-600 mb-2">
          <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      <span className={getProgressBadgeClass(task.progress)}>
        {task.progress.replace('-', ' ')}
      </span>
      <p className="text-sm text-gray-500 mt-3">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </p>
      {!readOnly && onEdit && onDelete && (
        <div className="mt-4 flex space-x-3">
          <button onClick={() => onEdit(task._id)} className="btn-secondary">
            Edit
          </button>
          <button onClick={() => onDelete(task._id)} className="btn-danger">
            Delete
          </button>
        </div>
      )}
      {readOnly && (
        <p className="mt-3 italic text-gray-500">Read-only (Student task)</p>
      )}
    </div>
  );
};

export default TaskCard;

