import React, { useState } from 'react';
import { Book, User, PlusCircle } from 'lucide-react';

interface DashboardProps {
  username: string;
}

const Dashboard: React.FC<DashboardProps> = ({ username }) => {
  const [activeTab, setActiveTab] = useState('books');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Welcome, {username}!</h2>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === 'books' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('books')}
        >
          <Book className="inline mr-2" size={18} /> Books
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('users')}
        >
          <User className="inline mr-2" size={18} /> Users
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'loans' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('loans')}
        >
          <PlusCircle className="inline mr-2" size={18} /> Loans
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        {activeTab === 'books' && <BookManagement />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'loans' && <LoanManagement />}
      </div>
    </div>
  );
};

const BookManagement = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Book Management</h3>
    {/* Add book management functionality here */}
    <p>Here you can add, edit, and delete books.</p>
  </div>
);

const UserManagement = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">User Management</h3>
    {/* Add user management functionality here */}
    <p>Here you can manage library users.</p>
  </div>
);

const LoanManagement = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Loan Management</h3>
    {/* Add loan management functionality here */}
    <p>Here you can manage book loans and returns.</p>
  </div>
);

export default Dashboard;