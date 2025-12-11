import { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import { getMyProfile } from '../../service/api/citizenService';
import { FaUser, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profilePictureUrl: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getMyProfile(user?.id);
      const profileData = response.data.data || {};
      console.log(profileData);
      setProfile(profileData);
      setEditForm({
        name: profileData.name || user?.name || '',
        email: profileData.email || user?.email || '',
        phoneNumber: profileData.phoneNumber || '',
        profilePictureUrl: profileData.profilePictureUrl || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Use user data as fallback
      setProfile({
        name: user?.name || '',
        email: user?.email || '',
        phoneNumber: '',
        profilePictureUrl: ''
      });
      setEditForm({
        name: user?.name || '',
        email: user?.email || '',
        phoneNumber: '',
        profilePictureUrl: ''
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // This would be an API call to update profile
      // For now, we'll update locally
      setProfile(editForm);
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let newValue = value;
    
    // Phone number validation - only digits and + allowed, max 13 chars
    if (name === 'phoneNumber') {
      newValue = value.replace(/[^0-9+]/g, '');
      if (newValue.length > 13) {
        newValue = newValue.slice(0, 13);
      }
    }
    
    // Name validation - max 50 chars
    if (name === 'name' && value.length > 50) {
      newValue = value.slice(0, 50);
    }
    
    // Profile picture URL validation - max 255 chars
    if (name === 'profilePictureUrl' && value.length > 255) {
      newValue = value.slice(0, 255);
    }
    
    setEditForm(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleCancel = () => {
    setEditForm({
      name: profile?.name || '',
      email: profile?.email || '',
      phoneNumber: profile?.phoneNumber || '',
      profilePictureUrl: profile?.profilePictureUrl || ''
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaUser className="text-2xl text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Profile</h2>
        </div>
        
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaEdit />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaSave />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              <FaTimes />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture Section */}
        <div className="lg:col-span-1">
          <div className="text-center">
            {profile?.profilePictureUrl ? (
              <img
                src={profile.profilePictureUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-green-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className={`w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 ${profile?.profilePictureUrl ? 'hidden' : ''}`}>
              <FaUser className="text-4xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{profile?.name || 'User'}</h3>
            <p className="text-gray-600 dark:text-gray-300">{user?.role || 'Citizen'}</p>
            <div className="mt-4 space-y-2">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>Account Status:</strong><br />
                  {profile?.active ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Email Status:</strong><br />
                  {profile?.emailVerified ? 'Verified' : 'Not Verified'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      minLength={2}
                      maxLength={50}
                    />
                  ) : (
                    <p className="text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">{profile?.name || 'Not provided'}</p>
                  )}
                  {editing && (
                    <p className="text-xs text-gray-500 mt-1">{editForm.name.length}/50 characters</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  {editing ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600 bg-gray-50 px-3 py-2 rounded-lg flex-1">{profile?.email || 'Not provided'}</p>
                      {profile?.emailVerified && (
                        <span className="text-green-600 text-sm font-medium">✓ Verified</span>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {editing ? (
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={editForm.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      maxLength={13}
                    />
                  ) : (
                    <p className="text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">{profile?.phoneNumber || 'Not provided'}</p>
                  )}
                  {editing && (
                    <p className="text-xs text-gray-500 mt-1">Maximum 13 characters including country code</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture URL
                  </label>
                  {editing ? (
                    <input
                      type="url"
                      name="profilePictureUrl"
                      value={editForm.profilePictureUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/profile.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      maxLength={255}
                    />
                  ) : (
                    <p className="text-gray-600 bg-gray-50 px-3 py-2 rounded-lg break-all">
                      {profile?.profilePictureUrl || 'Not provided'}
                    </p>
                  )}
                  {editing && (
                    <p className="text-xs text-gray-500 mt-1">{editForm.profilePictureUrl.length}/255 characters</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                  <p className="text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">{user?.id || 'N/A'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <p className="text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">{user?.role || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;