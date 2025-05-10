"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/admin/sidebar";
import Topbar from "@/components/layout/admin/topbar";
import { FaLock, FaUserCircle } from "react-icons/fa";

type AdminSettings = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePicture: string | null;
};

const mockAdminSettings: AdminSettings = {
  id: 'inv-12345',
  fullName: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phoneNumber: '+1 (555) 123-4567',
  address: '123 Main St, Springfield, USA',
  profilePicture: null,
};

export default function ProfileSettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const [settings, setSettings] = useState<AdminSettings>(mockAdminSettings);
    const [isEditing, setIsEditing] = useState(false);
    const [tempSettings, setTempSettings] = useState<AdminSettings>({ ...mockAdminSettings });
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTempSettings((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          setTempSettings((prev: any) => ({
            ...prev,
            profilePicture: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSave = () => {
      setSettings(tempSettings);
      setIsEditing(false);
    };
  
    const handleCancel = () => {
      setTempSettings({ ...settings });
      setIsEditing(false);
    };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Page Body */}
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-auto">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
                  <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-blue-800">Account Settings</h1>
                    <p className="text-blue-600 mt-2">Manage your profile</p>
                  </div>
          
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
                    <div className="p-6 border-b border-blue-50 bg-blue-50">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-blue-800">Profile</h2>
                        {!isEditing && (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Edit Profile
                          </button>
                        )}
                      </div>
          
                      <div className="space-y-4">
                        {/* Profile Picture */}
                        <div className="bg-white p-4 rounded-lg flex items-center space-x-4">
                          {settings.profilePicture ? (
                            <img
                              src={settings.profilePicture}
                              alt="Profile"
                              className="w-16 h-16 rounded-full border border-gray-300"
                            />
                          ) : (
                            <FaUserCircle className="w-16 h-16 text-gray-400" />
                          )}
                          {isEditing && (
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                          )}
                        </div>
          
                        {/* Full Name */}
                        <div className="bg-white p-4 rounded-lg">
                          <label className="block text-sm font-medium text-blue-700 mb-1">Full Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="fullName"
                              value={tempSettings.fullName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-900 font-medium">{settings.fullName}</p>
                          )}
                        </div>
          
                        {/* Email */}
                        <div className="bg-white p-4 rounded-lg">
                          <label className="block text-sm font-medium text-blue-700 mb-1">Email</label>
                          <p className="text-gray-900 font-medium">{settings.email}</p>
                          <p className="text-xs text-blue-500 mt-1">Contact support to change your email</p>
                        </div>
          
                        {/* Phone Number */}
                        <div className="bg-white p-4 rounded-lg">
                          <label className="block text-sm font-medium text-blue-700 mb-1">Phone Number</label>
                          {isEditing ? (
                            <input
                              type="tel"
                              name="phoneNumber"
                              value={tempSettings.phoneNumber}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-900 font-medium">{settings.phoneNumber}</p>
                          )}
                        </div>
          
                        {/* Address */}
                        <div className="bg-white p-4 rounded-lg">
                          <label className="block text-sm font-medium text-blue-700 mb-1">Address</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address"
                              value={tempSettings.address}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-900 font-medium">{settings.address}</p>
                          )}
                        </div>
          
                        {/* Change Password */}
                        {isEditing && (
                          <div className="mt-8 pt-4 border-t">
                            <button
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                              onClick={() => setShowPasswordDialog(true)}
                            >
                              <FaLock size={16} />
                              <span>Change Password</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
          
                    {/* Save/Cancel Buttons */}
                    {isEditing && (
                      <div className="bg-blue-50 px-6 py-4 flex justify-end space-x-3 border-t border-blue-100">
                        <button
                          onClick={handleCancel}
                          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                </div>
          
                {/* Password Change Dialog */}
                {showPasswordDialog && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                      <h2 className="text-lg font-bold mb-4">Change Password</h2>
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="mt-6 flex justify-end gap-4">
                        <button
                          className="px-4 py-2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPasswordDialog(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={() => {
                            // Add password change logic here
                            setShowPasswordDialog(false);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
        </main>
      </div>
    </div>
  );
}
