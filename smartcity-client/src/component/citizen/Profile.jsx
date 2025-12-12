import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { useTheme } from '../../context/useTheme';
import { getMyProfile, verifyEmailAddress } from '../../service/api/citizenService';
import { FaEnvelope, FaUser, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getMyProfile(user?.id);
      const profileData = response.data?.data || {};
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // fallback to auth context data
      setProfile({
        name: user?.name || '',
        email: user?.email || '',
        phoneNumber: '',
        profilePictureUrl: '',
        emailVerified: user?.emailVerified || false,
        active: user?.active ?? true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!user?.id) return;
    try {
      setVerifyingEmail(true);
      const response = await verifyEmailAddress(user.id);
      const updatedProfile = response?.data?.data;
      const message =
        response?.data?.message || 'Verification email sent! Please check your inbox.';

      setProfile((prev) => ({
        ...prev,
        ...(updatedProfile || {}),
        emailVerified: updatedProfile?.emailVerified ?? true,
      }));
      setActionMessage(message);
      toast.success(message);
    } catch (error) {
      console.error('Error sending verification email:', error);
      const message =
        error?.response?.data?.error?.message || 'Failed to send verification email';
      setActionMessage(message);
      toast.error(message);
    } finally {
      setVerifyingEmail(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl shadow-lg p-6 space-y-6 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <FaUser className="text-2xl text-green-600" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.role === 'ADMIN' ? 'Admin Profile' : 'Citizen Profile'}
            </p>
            <h2 className="text-2xl font-bold">My Profile</h2>
          </div>
        </div>
        {actionMessage && (
          <span className="text-xs px-3 py-2 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
            {actionMessage}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="text-center p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm">
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
            <div
              className={`w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 ${
                profile?.profilePictureUrl ? 'hidden' : ''
              }`}
            >
              <FaUser className="text-4xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold">{profile?.name || 'User'}</h3>
            <p className="text-gray-500 dark:text-gray-400">{user?.role || 'Citizen'}</p>

            <div className="mt-4 space-y-2">
              <div
                className={`p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-green-900/20 border border-green-800' : 'bg-green-50'
                }`}
              >
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-green-300' : 'text-green-700'
                  }`}
                >
                  <strong>Account Status:</strong> {profile?.active ? 'Active' : 'Inactive'}
                </p>
              </div>

              <div
                className={`p-3 rounded-lg ${
                  profile?.emailVerified
                    ? theme === 'dark'
                      ? 'bg-blue-900/20 border border-blue-800'
                      : 'bg-blue-50'
                    : theme === 'dark'
                      ? 'bg-red-900/20 border border-red-800'
                      : 'bg-red-50'
                }`}
              >
                <p
                  className={`text-sm ${
                    profile?.emailVerified
                      ? theme === 'dark'
                        ? 'text-blue-300'
                        : 'text-blue-700'
                      : theme === 'dark'
                        ? 'text-red-300'
                        : 'text-red-700'
                  }`}
                >
                  <strong>Email Status:</strong>{' '}
                  {profile?.emailVerified ? 'Verified' : 'Not Verified'}
                </p>

                {!profile?.emailVerified && (
                  <div className="mt-3">
                    <button
                      onClick={handleVerifyEmail}
                      disabled={verifyingEmail}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm w-full justify-center"
                    >
                      {verifyingEmail ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaEnvelope />
                          Verify Email
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } shadow-sm`}
            >
              <InfoField label="Full Name" value={profile?.name || 'Not provided'} />
              <InfoField
                label="Email Address"
                value={profile?.email || 'Not provided'}
                extra={
                  profile?.emailVerified ? (
                    <Badge icon={FaCheckCircle} color="text-green-600" text="Verified" />
                  ) : (
                    <Badge icon={FaExclamationTriangle} color="text-red-600" text="Not verified" />
                  )
                }
              />
              <InfoField label="Phone Number" value={profile?.phoneNumber || 'Not provided'} />
              <InfoField
                label="Profile Picture URL"
                value={profile?.profilePictureUrl || 'Not provided'}
                isLong
              />
              <InfoField label="User ID" value={user?.id || 'N/A'} />
              <InfoField label="Role" value={user?.role || 'N/A'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value, extra, isLong = false }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">{label}</label>
    <div className="flex items-start gap-2">
      <p
        className={`px-3 py-2 rounded-lg ${
          isLong ? 'break-all' : ''
        } bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex-1 shadow-inner dark:shadow-none border border-gray-100 dark:border-gray-700`}
      >
        {value}
      </p>
      {extra}
    </div>
  </div>
);

const Badge = ({ icon: Icon, color, text }) => (
  <span className={`inline-flex items-center gap-1 text-xs font-semibold ${color}`}>
    <Icon />
    {text}
  </span>
);

export default Profile;