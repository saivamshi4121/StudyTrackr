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
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters';
    }

    // Due date validation (if provided)
    if (formData.dueDate) {
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dueDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    // Progress validation
    const validProgress = ['not-started', 'in-progress', 'completed'];
    if (!validProgress.includes(formData.progress)) {
      newErrors.progress = 'Invalid progress value';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
    };
    onSubmit(submitData);
    setErrors({});
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
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h3 className="text-2xl font-bold text-black mb-4">{initialData ? 'Edit Task' : 'Create New Task'}</h3>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title: *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="input"
          value={formData.title}
          onChange={handleChange}
          required
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description: *
        </label>
        <textarea
          id="description"
          name="description"
          className="input"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          required
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          className="input"
          value={formData.dueDate}
          onChange={handleChange}
        />
        {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
      </div>
      <div>
        <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-1">
          Progress
        </label>
        <ProgressDropdown
          value={formData.progress}
          onChange={handleProgressChange}
        />
      </div>
      <div className="flex space-x-3">
        <button type="submit" className="btn-primary">
          {initialData ? 'Update Task' : 'Create Task'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-danger">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;

