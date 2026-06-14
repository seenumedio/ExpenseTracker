import { useState, useEffect } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { FaChevronDown, FaChevronUp, FaCalendarAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {setFilters} from '../features/transactions/txSlice'

const Filter = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [recurring, setRecurring] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();

  // Debounce local search state and automatically dispatch it to Redux
  useEffect(()=>{
    // timer to dispatch search after 300ms
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        setFilters({
          search: search
        })
      );
    }, 300);
    // clear prev timer, if user types again before 300ms
    return () => clearTimeout(delayDebounceFn);
  }, [search, dispatch]);

  const applyFilter = (e) => {
    e?.preventDefault();
    dispatch(
      setFilters({
        type,
        recurring,
        startDate: fromDate,
        endDate: toDate
      })
    )
  }
  const resetFilters = () => {
    setSearch('');
    setType('');
    setRecurring('');
    setFromDate('');
    setToDate('');
    
    dispatch(
      setFilters({
        search: '',
        type: 'all',
        recurring: 'all',
        startDate: '',
        endDate: '',
      })
    )
  }

  return (

    <div className="sticky top-20 z-40 w-full px-4 py-3 bg-white dark:bg-gray-900 shadow-md rounded-md mb-6">

      {/* Desktop Layout */}
      <form onSubmit={applyFilter}>
      <div className="hidden sm:flex items-center gap-4 flex-wrap">

        {/* Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-3 py-2 cursor-pointer"
        >
          <option value="">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        {/* Recurring-type */}
        <select
          value={recurring}
          onChange={(e) => setRecurring(e.target.value)}
          className="border rounded px-3 py-2 cursor-pointer"
        >
          <option value="">All Recurring</option>
          <option value="None">None</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>

        {/* Date */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="px-3 py-2 border rounded bg-gray-100 hover:bg-gray-200"
          >
            <FaCalendarAlt className='inline text-gray-600 mb-1' /> Date {showDateDropdown ? <FaChevronUp className='inline text-sm' /> : <FaChevronDown className='inline text-sm' />}
          </button>

          {showDateDropdown && (
            <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 p-3 rounded shadow-lg space-y-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => (
                  setToDate(e.target.value),
                  setShowDateDropdown(!showDateDropdown)
                )}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          )}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search anything..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded px-3 py-2 cursor-text min-w-[200px]"
          onKeyDown={(e) => {
            if (e.key === 'Enter') applyFilter();
          }}
        />

        {/* Buttons */}
        <button
          onClick={applyFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 border px-3 py-2 rounded bg-gray-100 dark:bg-gray-800"
          >
            <FiFilter />
            Filters
          </button>
          {showMobileFilters && (
            <div className="flex items-center gap-2">
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border rounded px-3 py-2 cursor-text mt-2 w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') applyFilter();
                  }}
                />
              )}

              <FiSearch
                onClick={() => setShowSearch(!showSearch)}
                className="text-xl cursor-pointer"
              />
            </div>
          )}
        </div>

        {showMobileFilters && (
          <div className="mt-4 space-y-3">
            {/* income-type */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded px-3 py-2 cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            {/* recurring-type */}
            <select
              value={recurring}
              onChange={(e) => setRecurring(e.target.value)}
              className="border rounded px-3 py-2 cursor-pointer"
            >
              <option value="">All Recurring</option>
              <option value="None">None</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            {/* date range */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDateDropdown(!showDateDropdown)}
                className="w-full text-left pl-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
              >
                <FaCalendarAlt className='inline text-gray-600 mb-1' /> Date {showDateDropdown ? <FaChevronUp className='inline text-sm float-right mt-1 mr-1' /> : <FaChevronDown className='inline text-sm float-right mt-1 mr-1' />}
              </button>

              {showDateDropdown && (
                <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 p-3 rounded shadow-lg space-y-2">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={applyFilter}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Apply
              </button>
              <button
                onClick={resetFilters}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
      </form>
    </div>
  );
};

export default Filter;