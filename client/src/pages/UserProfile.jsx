import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Title from '../components/Title';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const { user, axios } = useAppContext();

    if (!user) {
        return (
            <div className="py-28 text-center text-gray-500">
                Loading user profile...
            </div>
        );
    }

    // --- Action Handlers ---
    const handleChangePassword = async(oldPassword,newPassword) => {
        // TODO: Implement change password modal/logic
        try {
            const {data} = await axios.put('/api/user/change-password', { oldPassword, newPassword });
            if(data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDeleteAccount = () => {
        // This function will be called when the user confirms in the modal
        alert("Comming Soon");

    };

    const handleDeregisterHotel = () => {
        // This function will be called when the user confirms in the modal
        alert("Comming Soon");
    };

    return (
        <>
            <div className="bg-gray-50 min-h-screen py-20 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <Title title="My Profile" />

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-8">
                        {/* Profile Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 font-bold text-2xl">
                                        {user.username.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
                                    <p className="text-sm text-gray-500">
                                        {user.role === 'hotelOwner' ? 'Hotel Owner / User' : 'User'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Account Details */}
                        <div className="p-6 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Account Details</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-center">
                                    <span><strong>Username:</strong> {user.username}</span>
                                </li>
                                <li className="flex items-center">
                                    <span><strong>Email:</strong> {user.email}</span>
                                </li>
                                <li className="flex items-center">
                                    <span><strong>Account Type:</strong> {user.role === 'hotelOwner' ? 'Hotel Owner' : 'Standard User'}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="p-6 bg-gray-50 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Manage Account</h3>
                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                                <button
                                    onClick={() => {
                                                    const oldPassword = prompt("Enter your current password:");
                                                    const newPassword = prompt("Enter your new password:");
                                                    if (oldPassword && newPassword) {
                                                        handleChangePassword(oldPassword, newPassword);
                                                    } else {
                                                        toast.error("Both fields are required.");
                                                    }
                                                }
                                            }
                                    className="flex items-center justify-center w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors"
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>

                        {/* Danger Zone for Destructive Actions */}
                        {user.role === 'hotelOwner' && (
                            <div className="p-6 border-t border-red-200 bg-red-50">
                                <h3 className="text-lg font-semibold text-red-800 mb-2">Danger Zone</h3>
                                <p className="text-sm text-red-600 mb-4">
                                    These actions are permanent and cannot be undone.
                                </p>
                                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                                    <button
                                        onClick={() => handleDeregisterHotel()}
                                        className="flex items-center justify-center w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-md font-medium transition-colors"
                                    >
                                        Deregister Hotel
                                    </button>
                                    <button
                                        onClick={() => handleDeleteAccount()}
                                        className="flex items-center justify-center w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors"
                                    >
                                        Delete My Account
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Danger Zone for regular users */}
                        {user.role !== 'hotelOwner' && (
                            <div className="p-6 border-t border-red-200 bg-red-50">
                                <h3 className="text-lg font-semibold text-red-800 mb-4">Danger Zone</h3>
                                <button
                                    onClick={() => setDeleteModalOpen(true)}
                                    className="flex items-center justify-center w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors"
                                >
                                    Delete My Account
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;