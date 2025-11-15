import { useState } from 'react';
import ProgressDropdown from './ProgressDropdown';

const TaskForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    dueDate: initialData?.dueDate
      ? new Date(initialData.dueDate).toISOString().split('T')[0]
      : '',
    progress: initialData?.progress || 'not-started',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
    const submitData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
    };
    onSubmit(submitData);
    if (!initialData) {
      // Reset form only for new tasks
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        progress: 'not-started',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
      <h3>{initialData ? 'Edit Task' : 'Create New Task'}</h3>
      <div>
        <label htmlFor="title">Title: *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="progress">Progress:</label>
        <ProgressDropdown
          value={formData.progress}
          onChange={handleProgressChange}
        />
      </div>
      <button type="submit">{initialData ? 'Update Task' : 'Create Task'}</button>
      {onCancel && (
        <button type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;

