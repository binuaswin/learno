import  { useState, useEffect } from 'react';

// Mock function to simulate cloud sync (e.g., could be an API call to a cloud service)
const syncDataToCloud = (data) => {
  // Simulate a call to cloud storage
  console.log('Syncing data to cloud...', data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data synced successfully');
    }, 1000);
  });
};

const syncDataFromCloud = () => {
  // Simulate getting data from the cloud
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        skillCategories: ['Technical', 'Creative', 'Soft Skills'],
        progress: [
          { skill: 'Python', progress: 'Advanced' },
          { skill: 'JavaScript', progress: 'Intermediate' },
        ],
      });
    }, 1000);
  });
};

const SyncAcrossDevices = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [progress, setProgress] = useState([]);
  const [syncStatus, setSyncStatus] = useState('Sync your progress across devices');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // On component mount, fetch data from cloud (simulate sync)
    const fetchData = async () => {
      setLoading(true);
      const cloudData = await syncDataFromCloud();
      setSkillCategories(cloudData.skillCategories);
      setProgress(cloudData.progress);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSync = async () => {
    setLoading(true);
    try {
      const result = await syncDataToCloud({ skillCategories, progress });
      setSyncStatus(result);
    } catch (err) {
      // Use 'err' to log or debug, or remove it if unnecessary
      console.error('Sync failed with error:', err);
      setSyncStatus('Sync failed');
    }
    setLoading(false);
  };
  

  return (
    <div style={{ margin: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f4f4f4' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Sync Across Devices</h2>

      <p style={{ fontSize: '18px', color: '#333' }}>
        {syncStatus}
      </p>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ fontSize: '18px' }}>Syncing...</span>
        </div>
      ) : (
        <>
          <div>
            <h3>Current Skill Categories</h3>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {skillCategories.map((category, index) => (
                <li key={index} style={{ padding: '10px', fontSize: '16px', color: '#555', borderBottom: '1px solid #ddd' }}>
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Skill Progress</h3>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {progress.map((item, index) => (
                <li key={index} style={{ padding: '10px', fontSize: '16px', color: '#555', borderBottom: '1px solid #ddd' }}>
                  {item.skill}: {item.progress}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={handleSync}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Sync to Cloud
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SyncAcrossDevices;
