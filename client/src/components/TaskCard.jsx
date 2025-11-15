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

  if (isEditing) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem 0' }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Progress:</label>
            <ProgressDropdown
              value={formData.progress}
              onChange={handleProgressChange}
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem 0' }}>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      {task.dueDate && (
        <p>
          <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      <p>
        <strong>Progress:</strong> {task.progress}
      </p>
      <p>
        <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
      </p>
      {!readOnly && onEdit && onDelete && (
        <>
          <button onClick={() => onEdit(task._id)}>Edit</button>
          <button onClick={() => onDelete(task._id)} style={{ marginLeft: '0.5rem' }}>
            Delete
          </button>
        </>
      )}
      {readOnly && (
        <p style={{ fontStyle: 'italic', color: '#666' }}>Read-only (Student task)</p>
      )}
    </div>
  );
};

export default TaskCard;

