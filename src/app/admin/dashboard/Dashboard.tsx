import { useState, useEffect } from 'react';
import { fetchDashboardData } from './mockData';
import { 
  ChevronDown, 
  ChevronUp, 
  Bell, 
  RefreshCw, 
  Check, 
  X, 
  Edit2,
  Save,
  Calendar,
  Clock,
  User,
  FileText,
  Activity
} from 'lucide-react';
import { 
  DashboardData,
  KYCQueueItem,
  SubscriptionItem,
  LeaderboardItem,
  ActivityLogItem
} from './mockData';

// Metric Card Props
interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

// Card Component Props
interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
        
        // Initialize notes from data
        const initialNotes: Record<string, string> = {};
        data.kycQueue.forEach(item => {
          initialNotes[item.id] = item.notes;
        });
        setNotes(initialNotes);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleNoteChange = (id: string, value: string): void => {
    setNotes({ ...notes, [id]: value });
  };

  const handleSaveNote = (id: string): void => {
    // In a real app, this would save to the backend
    console.log(`Saving note for ${id}: ${notes[id]}`);
    setEditingNoteId(null);
  };

  const handleApproveKYC = (id: string): void => {
    // In a real app, this would call an API
    console.log(`Approving KYC for ${id}`);
    // Update local state to reflect the change
    if (dashboardData) {
      const updatedQueue = dashboardData.kycQueue.filter(item => item.id !== id);
      const updatedMetrics = {
        ...dashboardData.metrics,
        pendingKYCs: dashboardData.metrics.pendingKYCs - 1,
        approvedSMEs: dashboardData.metrics.approvedSMEs + 1
      };
      
      // Add to activity log
      const approvedItem = dashboardData.kycQueue.find(item => item.id === id);
      if (approvedItem) {
        const newActivity: ActivityLogItem = {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: `${approvedItem.smeName} approved`,
          actor: "Admin"
        };
        
        setDashboardData({
          ...dashboardData,
          kycQueue: updatedQueue,
          metrics: updatedMetrics,
          activityLog: [newActivity, ...dashboardData.activityLog]
        });
      }
    }
  };

  const handleRejectKYC = (id: string): void => {
    // In a real app, this would call an API
    console.log(`Rejecting KYC for ${id}`);
    // Update local state to reflect the change
    if (dashboardData) {
      const updatedQueue = dashboardData.kycQueue.filter(item => item.id !== id);
      const updatedMetrics = {
        ...dashboardData.metrics,
        pendingKYCs: dashboardData.metrics.pendingKYCs - 1,
        rejectedKYCs: dashboardData.metrics.rejectedKYCs + 1
      };
      
      // Add to activity log
      const rejectedItem = dashboardData.kycQueue.find(item => item.id === id);
      if (rejectedItem) {
        const newActivity: ActivityLogItem = {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: `${rejectedItem.smeName} rejected`,
          actor: "Admin"
        };
        
        setDashboardData({
          ...dashboardData,
          kycQueue: updatedQueue,
          metrics: updatedMetrics,
          activityLog: [newActivity, ...dashboardData.activityLog]
        });
      }
    }
  };

  const handleRenewSubscription = (id: string): void => {
    // In a real app, this would call an API
    console.log(`Renewing subscription for ${id}`);
    
    // Update local state
    if (dashboardData) {
      const updatedSubscriptions = dashboardData.subscriptions.map(sub => {
        if (sub.id === id) {
          // Extend expiry by 30 days
          const currentExpiry = new Date(sub.expiryDate);
          const newExpiry = new Date(currentExpiry);
          newExpiry.setDate(newExpiry.getDate() + 30);
          
          return {
            ...sub,
            expiryDate: newExpiry.toISOString(),
            status: 'active'
          };
        }
        return sub;
      });
      
      // Add to activity log
      const renewedSub = dashboardData.subscriptions.find(sub => sub.id === id);
      if (renewedSub) {
        const newActivity: ActivityLogItem = {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: `${renewedSub.smeName} subscription renewed`,
          actor: "Admin"
        };
        
        setDashboardData({
          ...dashboardData,
          subscriptions: updatedSubscriptions,
          activityLog: [newActivity, ...dashboardData.activityLog]
        });
      }
    }
  };

  const handleNotifySubscription = (id: string): void => {
    // In a real app, this would send a notification
    console.log(`Notifying SME for subscription ${id}`);
    
    // Add to activity log
    if (dashboardData) {
      const notifiedSub = dashboardData.subscriptions.find(sub => sub.id === id);
      if (notifiedSub) {
        const newActivity: ActivityLogItem = {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: `${notifiedSub.smeName} notified about subscription`,
          actor: "Admin"
        };
        
        setDashboardData({
          ...dashboardData,
          activityLog: [newActivity, ...dashboardData.activityLog]
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Error loading dashboard data. Please try again later.
      </div>
    );
  }

  const { metrics, kycQueue, subscriptions, leaderboard, activityLog } = dashboardData;

  return (
    <div className="container mx-auto p-4">
      {/* Top Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Pending KYCs"
          value={metrics.pendingKYCs}
          icon={<FileText size={24} />}
          color="blue"
        />
        <MetricCard
          title="Approved SMEs"
          value={metrics.approvedSMEs}
          icon={<Check size={24} />}
          color="green"
        />
        <MetricCard
          title="Rejected KYCs"
          value={metrics.rejectedKYCs}
          icon={<X size={24} />}
          color="red"
        />
        <MetricCard
          title="Active Subscriptions"
          value={metrics.activeSubscriptions}
          icon={<Activity size={24} />}
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KYC Queue - Takes 2/3 of the space on large screens */}
        <div className="lg:col-span-2">
          <Card title="Manual KYC Queue" icon={<User size={18} />}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SME Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {kycQueue.length > 0 ? (
                    kycQueue.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.smeName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.dateSubmitted).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a href={item.documentUrl} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                            View Document
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {editingNoteId === item.id ? (
                            <div className="flex">
                              <input
                                type="text"
                                value={notes[item.id] || ''}
                                onChange={(e) => handleNoteChange(item.id, e.target.value)}
                                className="border-gray-300 rounded px-2 py-1 w-full"
                              />
                              <button 
                                onClick={() => handleSaveNote(item.id)}
                                className="ml-2 text-green-600 hover:text-green-800"
                              >
                                <Save size={16} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <span className="mr-2 truncate max-w-xs">{notes[item.id] || 'No notes'}</span>
                              <button 
                                onClick={() => setEditingNoteId(item.id)}
                                className="text-gray-600 hover:text-gray-800"
                              >
                                <Edit2 size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApproveKYC(item.id)}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectKYC(item.id)}
                              className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                        No pending KYC requests
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Leaderboard - Takes 1/3 of the space */}
        <div>
          <Card title="FinTrack Leaderboard" icon={<Activity size={18} />}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SME Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboard.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.smeName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className={`font-semibold ${item.score >= 80 ? 'text-green-600' : item.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {item.score}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.lastUpdated).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Subscription Status Table - Spans 2/3 */}
        <div className="lg:col-span-2">
          <Card title="Subscription Status" icon={<Calendar size={18} />}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SME Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscriptions.map((item) => {
                    // Calculate days until expiry
                    const today = new Date();
                    const expiryDate = new Date(item.expiryDate);
                    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    const isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry > 0;
                    const isExpired = daysUntilExpiry <= 0;
                    
                    let statusClass = 'bg-green-100 text-green-800';
                    if (isExpiringSoon) statusClass = 'bg-yellow-100 text-yellow-800';
                    if (isExpired) statusClass = 'bg-red-100 text-red-800';
                    
                    return (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.smeName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {item.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.expiryDate).toLocaleDateString()}
                          {isExpiringSoon && (
                            <span className="ml-2 text-xs text-yellow-600">
                              ({daysUntilExpiry} days)
                            </span>
                          )}
                          {isExpired && (
                            <span className="ml-2 text-xs text-red-600">
                              (Expired)
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleRenewSubscription(item.id)}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                            >
                              Renew
                            </button>
                            <button
                              onClick={() => handleNotifySubscription(item.id)}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
                            >
                              Notify
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Activity Log - Takes 1/3 of the space */}
        <div>
          <Card title="Activity Log" icon={<Clock size={18} />}>
            <div className="overflow-y-auto max-h-80">
              <ul className="divide-y divide-gray-200">
                {activityLog.map((activity) => (
                  <li key={activity.id} className="py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 rounded-full p-1">
                        <Activity size={16} className="text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()} by {activity.actor}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
const Card: React.FC<CardProps> = ({ title, children, icon }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          {icon && <span className="mr-2 text-gray-600">{icon}</span>}
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
        >
          {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>
      <div className={`transition-all duration-200 ${isCollapsed ? 'max-h-0 overflow-hidden' : 'max-h-screen'}`}>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <div className={`p-2 rounded-full ${colorClasses[color] || colorClasses.blue}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;