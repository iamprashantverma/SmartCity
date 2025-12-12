import { useTheme } from '../../context/useTheme';
import { FaCity, FaUsers, FaLightbulb, FaShieldAlt, FaChartLine, FaHandshake } from 'react-icons/fa';

const AboutUs = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: FaCity,
      title: 'Smart City Vision',
      description: 'Transforming urban living through innovative technology and citizen-centric services.',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: FaUsers,
      title: 'Citizen First',
      description: 'Empowering citizens with easy access to government services and transparent communication.',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to improve city management and service delivery.',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: FaShieldAlt,
      title: 'Security & Privacy',
      description: 'Your data is protected with industry-standard security measures and privacy protocols.',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: FaChartLine,
      title: 'Transparency',
      description: 'Real-time tracking and updates on your complaints, bills, and service requests.',
      color: 'text-indigo-600 bg-indigo-100'
    },
    {
      icon: FaHandshake,
      title: 'Partnership',
      description: 'Building stronger communities through collaboration between citizens and administration.',
      color: 'text-red-600 bg-red-100'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Citizens' },
    { number: '10K+', label: 'Resolved Complaints' },
    { number: '24/7', label: 'Support Available' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className={`rounded-2xl shadow-xl p-8 mb-8 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-blue-900/30' : 'bg-gradient-to-r from-blue-600 to-green-600'
            }`}>
              <FaCity className={`text-4xl ${theme === 'dark' ? 'text-blue-400' : 'text-white'}`} />
            </div>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            About Smart City Platform
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Your digital gateway to seamless city services. We're committed to making urban living 
            smarter, more efficient, and more connected.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 text-center shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className={`text-3xl md:text-4xl font-bold mb-2 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {stat.number}
            </div>
            <div className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div className={`rounded-2xl shadow-xl p-8 mb-8 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <h2 className={`text-3xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Our Mission
        </h2>
        <div className="space-y-4">
          <p className={`text-lg leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            The Smart City Platform is designed to bridge the gap between citizens and city administration, 
            providing a seamless, transparent, and efficient way to access municipal services. Our mission 
            is to create a digital ecosystem that empowers citizens while enabling administrators to serve 
            the community more effectively.
          </p>
          <p className={`text-lg leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            We believe in leveraging technology to solve real-world problems, making city services 
            accessible 24/7, and fostering a culture of transparency and accountability in public service.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className={`rounded-2xl shadow-xl p-8 mb-8 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <h2 className={`text-3xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-xl border ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                } transition-all hover:shadow-lg`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  theme === 'dark' 
                    ? feature.color.replace('bg-', 'bg-').replace('-100', '-900/30')
                    : feature.color
                }`}>
                  <Icon className={`text-2xl ${
                    theme === 'dark' 
                      ? feature.color.replace('text-', 'text-').replace('-600', '-400')
                      : feature.color.split(' ')[0]
                  }`} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Services Section */}
      <div className={`rounded-2xl shadow-xl p-8 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <h2 className={`text-3xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              For Citizens
            </h3>
            <ul className={`space-y-2 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>• File and track complaints</li>
              <li>• Pay utility bills online</li>
              <li>• View complaint status</li>
              <li>• Contact city administration</li>
              <li>• Access your profile and history</li>
            </ul>
          </div>
          <div className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              For Administrators
            </h3>
            <ul className={`space-y-2 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>• Manage citizen complaints</li>
              <li>• Create and manage utility bills</li>
              <li>• View contact submissions</li>
              <li>• Monitor system statistics</li>
              <li>• Efficient service management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
