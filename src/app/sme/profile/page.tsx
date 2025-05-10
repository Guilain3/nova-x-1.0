"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Edit, Save, Lock } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, New York, NY 10001",
    role: "Business Owner",
    company: "Nova X Solutions",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add API call to save data here
  };
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      // Upload to server here
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
            <Image
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : "/images/profilepic.jpg"
              }
              alt="Profile"
              fill
              className="object-cover"
            />

          </div>
          <div className="relative">
            <button
              className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
              onClick={() => document.getElementById("profilePicInput")?.click()}
            >
              <Edit size={16} />
              <span>Change Photo</span>
            </button>
            <input
              type="file"
              id="profilePicInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Save size={16} />
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                <Edit size={16} />
                Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Name Field */}
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <User size={20} />
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border rounded-md"
                />
              ) : (
                <div>
                  <p className="text-gray-500 text-sm">Full Name</p>
                  <p className="font-medium">{userData.name}</p>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email Address</p>
                <p className="font-medium">{userData.email}</p>
              </div>
            </div>

            {/* Phone Field */}
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Phone size={20} />
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border rounded-md"
                />
              ) : (
                <div>
                  <p className="text-gray-500 text-sm">Phone Number</p>
                  <p className="font-medium">{userData.phone}</p>
                </div>
              )}
            </div>

            {/* Address Field */}
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <MapPin size={20} />
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border rounded-md"
                />
              ) : (
                <div>
                  <p className="text-gray-500 text-sm">Business Address</p>
                  <p className="font-medium">{userData.address}</p>
                </div>
              )}
            </div>

            {/* Company & Role (Non-editable) */}
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Lock size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Company & Role</p>
                <p className="font-medium">
                  {userData.role} at {userData.company}
                </p>
              </div>
            </div>
          </div>

          {/* Change Password Button */}
          <div className="mt-8 pt-4 border-t">
            <button
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              onClick={() => setShowPasswordDialog(true)}
            >
              <Lock size={16} />
              <span>Change Password</span>
            </button>

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
          </div>
        </div>
      </div>
    </div>
  );
}
