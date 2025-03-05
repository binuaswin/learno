import { useState } from 'react';
import PropTypes from 'prop-types';

const SyncAcrossDevices = ({
  tasks = [],
  settings = {},
  onSync = () => {},
  initialSyncStatus = 'Synced', // 'Synced', 'Syncing', 'Error'
}) => {
  const [syncStatus, setSyncStatus] = useState(initialSyncStatus);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // Mock sync function (simulates cloud sync)
  const handleSync = () => {
    setSyncStatus('Syncing');
    // Simulate API call with a timeout
    setTimeout(() => {
      const syncData = { tasks, settings, timestamp: new Date().toISOString() };
      try {
        // In a real app, this would be an API call (e.g., to Firebase)
        console.log('Syncing data:', syncData);
        onSync(syncData);
        setSyncStatus('Synced');
        setLastSyncTime(new Date().toLocaleString());
      } catch (error) {
        setSyncStatus('Error');
        console.error('Sync failed:', error);
      }
    }, 2000); // 2-second delay to simulate network
  };

  return (
    <div className="sync-across-devices">
      <h3>Sync Across Devices</h3>
      <div className="sync-content">
        <p>
          Keep your study planner in sync across all your devices (phone, tablet, desktop) with cloud sync.
        </p>
        <button
          className="sync-button"
          onClick={handleSync}
          disabled={syncStatus === 'Syncing'}
        >
          {syncStatus === 'Syncing' ? 'Syncing...' : 'Sync Now'}
        </button>
        <p className={`sync-status ${syncStatus.toLowerCase()}`}>
          Status: {syncStatus}
        </p>
        {lastSyncTime && (
          <p className="last-sync">Last Synced: {lastSyncTime}</p>
        )}
      </div>
    </div>
  );
};

SyncAcrossDevices.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ),
  settings: PropTypes.object,
  onSync: PropTypes.func,
  initialSyncStatus: PropTypes.oneOf(['Synced', 'Syncing', 'Error']),
};

export default SyncAcrossDevices;