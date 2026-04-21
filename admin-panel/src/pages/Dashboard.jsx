import React, { useState, useEffect } from 'react';
import client from '../api/client';
import StatsBar from '../components/StatsBar';
import RegistrationsTable from '../components/RegistrationsTable';
import ViewDetailsDrawer from '../components/ViewDetailsDrawer';
import EmailComposeModal from '../components/EmailComposeModal';
import { useAuth } from '../hooks/useAuth';
import { LogOut, LayoutDashboard } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [collegeFilter, setCollegeFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [selectedReg, setSelectedReg] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);

  const { logout, user } = useAuth();

  const fetchStats = async () => {
    try {
      const { data } = await client.get('/admin/stats');
      setStats(data);
    } catch (error) {
      console.error('Stats error:', error);
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data } = await client.get('/admin/registrations', {
        params: {
          page,
          search,
          type: typeFilter,
          college: collegeFilter,
          limit: 20
        }
      });
      setRegistrations(data.registrations);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (error) {
      console.error('Registrations error:', error);
      toast.error('Failed to load registrations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRegistrations();
    }, 500);
    return () => clearTimeout(timer);
  }, [page, search, typeFilter, collegeFilter]);

  const handleView = (reg) => {
    setSelectedReg(reg);
    setDrawerOpen(true);
  };

  const handleEmail = (reg) => {
    setSelectedReg(reg);
    setEmailModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <header style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(15,15,15,0.8)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            backgroundColor: 'var(--accent-color)',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            color: 'white'
          }}>
            <LayoutDashboard size={24} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
            FiestaLiva <span style={{ color: 'var(--accent-color)', fontWeight: '400', fontSize: '0.875rem', marginLeft: '0.5rem' }}>Admin</span>
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>{user?.username}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{user?.role}</p>
          </div>
          <button 
            onClick={logout}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              color: 'var(--error)',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <main style={{ padding: '2rem', flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <StatsBar stats={stats} />
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Recent Registrations</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage and view all participants of FiestaLiva 2026</p>
        </div>

        <RegistrationsTable 
          registrations={registrations}
          loading={loading}
          onView={handleView}
          onEmail={handleEmail}
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          collegeFilter={collegeFilter}
          setCollegeFilter={setCollegeFilter}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          total={total}
        />
      </main>

      <ViewDetailsDrawer 
        registration={selectedReg}
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <EmailComposeModal 
        registration={selectedReg}
        isOpen={isEmailModalOpen}
        onClose={() => setEmailModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
