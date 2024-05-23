import React from 'react';
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import UserManagement from '../components/users/UserManagement';
import ProductManagement from '../components/products/ProductManagement';


const AdminDashboard = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header className="header"/>
        <div className="main-content">
          <div className="management-section">
            <h2>User Management</h2>
            <UserManagement />
          </div>
          <div className="management-section">
            <h2>Product Management</h2>
            <ProductManagement />
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
