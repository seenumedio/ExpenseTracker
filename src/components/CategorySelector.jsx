import { useState, useEffect } from 'react';

const DEFAULT_CATEGORIES = ['Food', 'Utilities', 'Entertainment', 'Salary', 'Rent'];

const CategorySelector = ({ selected, onChange, required }) => {
  const [customCategory, setCustomCategory] = useState('');
  const [customAdded, setCustomAdded] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    // If selected is not a default category and is non-empty, treat as custom
    if (
      selected &&
      !DEFAULT_CATEGORIES.some(cat => cat.toLowerCase() === selected.toLowerCase())
    ) {
      setCustomAdded(selected);
      setCustomCategory(selected);
      setShowCustomInput(false);
      setEditing(false);
    } else {
      setCustomAdded(null);
      setCustomCategory('');
      setShowCustomInput(false);
      setEditing(false);
    }
  }, [selected]);

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === 'Custom') {
      setShowCustomInput(true);
    } else {
      setCustomAdded(null);
      setShowCustomInput(false);
      onChange(value);
    }
  };

  const handleAddCustom = () => {
    const trimmed = customCategory.trim();

    if (!trimmed) return;

    const isDuplicate =
      DEFAULT_CATEGORIES.some(cat => cat.toLowerCase() === trimmed.toLowerCase()) ||
      (customAdded && customAdded.toLowerCase() === trimmed.toLowerCase());

    if (isDuplicate) {
      alert("This category already exists.");
      return;
    }

    setCustomAdded(trimmed);
    onChange(trimmed);
    setShowCustomInput(false);
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
    setShowCustomInput(true);
    setCustomCategory(customAdded);
  };

  const handleDelete = () => {
    setCustomAdded(null);
    setCustomCategory('');
    onChange('');
    setEditing(false);
    setShowCustomInput(false);
  };

  return (
    <div className="space-y-2">
      {!customAdded && !showCustomInput && (
        <select
          onChange={handleSelect}
          value={
            DEFAULT_CATEGORIES.includes(selected)
              ? selected
              : ''
          }
          className="w-full border p-2 rounded"
          required={required}
        >
          <option value="">-- Choose --</option>
          {DEFAULT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          <option value="Custom">Custom</option>
        </select>
      )}

      {showCustomInput && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="Enter custom category"
            className="border p-2 rounded w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustom();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddCustom}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
          {/* Hidden input to enforce required field if not added yet */}
          {!customAdded && (
            <input
              type="text"
              className="hidden"
              required
              value=""
              onChange={() => { }}
              onInvalid={() => alert("Please click 'Add' after typing your custom category.")}
            />
          )}
        </div>
      )}
      {customAdded && !editing && (
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-purple-300 rounded">{customAdded}</span>
          <button onClick={handleEdit} className="text-sm text-blue-600">Edit</button>
          <button onClick={handleDelete} className="text-sm text-red-600">Delete</button>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
