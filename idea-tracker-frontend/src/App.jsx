import React, { useState, useEffect } from 'react';

import API_BASE from './api';

const App = () => {
  const [ideas, setIdeas] = useState([
    // Mock data for demonstration
    {
      id: 1,
      title: "Mobile App for Local Farmers",
      description: "A platform connecting local farmers directly with consumers, reducing middleman costs and ensuring fresh produce."
    },
    {
      id: 2,
      title: "Smart Home Energy Monitor",
      description: "IoT device that tracks energy consumption and provides recommendations for reducing electricity bills."
    }
  ]);
  const [currentIdea, setCurrentIdea] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch all ideas
  const fetchIdeas = async () => {
    try {
      // const response = await fetch(API_BASE);
      // const data = await response.json();
      // setIdeas(data);
      console.log('Fetching ideas...');
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  // Create or update idea
  const handleSubmit = async () => {
    if (!currentIdea.title.trim()) {
      alert('Title is required');
      return;
    }

    try {
      if (editingId) {
        // Update existing idea
        setIdeas(ideas.map(idea => 
          idea.id === editingId 
            ? { ...idea, title: currentIdea.title, description: currentIdea.description }
            : idea
        ));
        resetForm();
      } else {
        // Create new idea
        const newIdea = {
          id: Date.now(),
          title: currentIdea.title,
          description: currentIdea.description
        };
        setIdeas([...ideas, newIdea]);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving idea:', error);
    }
  };

  // Delete idea
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      try {
        setIdeas(ideas.filter(idea => idea.id !== id));
      } catch (error) {
        console.error('Error deleting idea:', error);
      }
    }
  };

  // Start editing
  const handleEdit = (idea) => {
    setCurrentIdea({ title: idea.title, description: idea.description || '' });
    setEditingId(idea.id);
    setIsFormVisible(true);
  };

  // Reset form
  const resetForm = () => {
    setCurrentIdea({ title: '', description: '' });
    setEditingId(null);
    setIsFormVisible(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-4xl mr-3">💡</span>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Idea Tracker
              </h1>
              <span className="text-4xl ml-3">🚀</span>
            </div>
            <p className="text-gray-600 text-lg">
              Capture, organize, and bring your brilliant ideas to life
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">📝</span>
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">Total Ideas</p>
                <p className="text-2xl font-bold text-gray-800">{ideas.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-2xl">✨</span>
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">This Week</p>
                <p className="text-2xl font-bold text-gray-800">
                  {ideas.filter(idea => new Date(idea.createdAt || Date.now()) > Date.now() - 7*24*60*60*1000).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">Categories</p>
                <p className="text-2xl font-bold text-gray-800">All</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Idea Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium text-lg flex items-center mx-auto"
          >
            <span className="text-xl mr-2">
              {isFormVisible ? '❌' : '➕'}
            </span>
            {isFormVisible ? 'Cancel' : 'Add New Idea'}
          </button>
        </div>

        {/* Form */}
        {isFormVisible && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8 transform transition-all duration-300">
            <div className="flex items-center mb-6">
              <span className="text-2xl mr-3">✏️</span>
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? 'Edit Your Idea' : 'Create New Idea'}
              </h2>
            </div>
            <div>
              <div className="mb-6">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <span className="mr-2">🏷️</span>
                  Title *
                </label>
                <input
                  type="text"
                  value={currentIdea.title}
                  onChange={(e) => setCurrentIdea({ ...currentIdea, title: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                  placeholder="What's your brilliant idea?"
                />
              </div>
              <div className="mb-8">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <span className="mr-2">📄</span>
                  Description
                </label>
                <textarea
                  value={currentIdea.description}
                  onChange={(e) => setCurrentIdea({ ...currentIdea, description: e.target.value })}
                  rows={5}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg resize-none"
                  placeholder="Tell us more about your idea..."
                />
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium flex items-center"
                >
                  <span className="mr-2">💾</span>
                  {editingId ? 'Update Idea' : 'Save Idea'}
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium flex items-center"
                >
                  <span className="mr-2">🚫</span>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ideas List */}
        <div className="space-y-6">
          <div className="flex items-center mb-6">
            <span className="text-2xl mr-3">🗂️</span>
            <h2 className="text-2xl font-bold text-gray-800">Your Ideas</h2>
            <div className="ml-auto bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              {ideas.length} {ideas.length === 1 ? 'Idea' : 'Ideas'}
            </div>
          </div>
          
          {ideas.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-xl text-gray-600 mb-2">No ideas yet!</p>
              <p className="text-gray-500">Add your first brilliant idea above to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ideas.map((idea) => (
                <div key={idea.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden group">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start flex-1">
                        <span className="text-2xl mr-3 mt-1">💡</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                            {idea.title}
                          </h3>
                          {idea.description && (
                            <p className="text-gray-600 leading-relaxed">{idea.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleEdit(idea)}
                        className="flex items-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-sm hover:shadow transform hover:-translate-y-0.5 font-medium"
                      >
                        <span className="mr-2">✏️</span>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(idea.id)}
                        className="flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow transform hover:-translate-y-0.5 font-medium"
                      >
                        <span className="mr-2">🗑️</span>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="text-2xl mr-2">🌟</span>
            <p className="text-gray-600">Keep innovating and turning ideas into reality!</p>
            <span className="text-2xl ml-2">🌟</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;