import React from 'react';
import { Eye, Mail, Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

const MEDICAL_COLLEGES = [
  "AIIMS Telangana",
  "Osmania Medical College",
  "Gandhi Medical College, Secunderabad",
  "Kakatiya Medical College, Warangal",
  "Rajiv Gandhi Institute of Medical Sciences, Adilabad",
  "Govt Medical College, Nizamabad",
  "Govt Medical College, Mahabubnagar",
  "Govt Medical College, Siddipet",
  "Govt Medical College, Nalgonda",
  "Govt Medical College, Suryapet",
  "Govt Medical College, Jangaon",
  "Govt Medical College, Jayashankar Bhupalpally",
  "Govt Medical College, Kamareddy",
  "Govt Medical College, Karimnagar",
  "Govt Medical College, Khammam",
  "Govt Medical College, Kumuram Bheem Asifabad",
  "Govt Medical College, Nirmal",
  "Govt Medical College, Rajanna Sircilla",
  "Govt Medical College, Vikarabad",
  "Govt Medical College, Mancherial",
  "Govt Medical College, Ramagundam",
  "Govt Medical College, Jagtial",
  "Govt Medical College, Mahabubabad",
  "Govt Medical College, Kothagudem",
  "Govt Medical College, Sangareddy",
  "Govt Medical College, Wanaparthy",
  "Govt Medical College, Nagarkurnool",
  "Govt Medical College, Jogulamba Gadwal",
  "Govt Medical College, Mulugu",
  "Govt Medical College, Narayanpet",
  "Govt Medical College, Narsampet",
  "Govt Medical College, Maheshwaram",
  "Govt Medical College, Medak",
  "Govt Medical College, Quthbullapur",
  "Govt Medical College, Yadadri",
  "Govt Medical College, Kodangal",
  "ESIC Medical College, Hyderabad",
  "Nizam Institute of Medical Sciences, Hyderabad",
  "Mamata Medical College, Khammam",
  "SVS Medical College, Mahabubnagar",
  "Kamineni Institute of Medical Sciences, Narketpally",
  "MediCiti Institute of Medical Sciences",
  "Prathima Institute of Medical Sciences, Karimnagar",
  "MNR Medical College, Sangareddy",
  "Chalmeda Anand Rao Institute of Medical Sciences, Karimnagar",
  "Bhaskar Medical College",
  "Apollo Institute of Medical Sciences, Hyderabad",
  "Kamineni Academy of Medical Sciences, Hyderabad",
  "Mahavir Institute of Medical Sciences",
  "RVM Institute of Medical Sciences, Siddipet",
  "Mamata Academy of Medical Sciences, Bachupally",
  "Patnam Mahender Reddy Institute of Medical Sciences",
  "Surabhi Institute of Medical Sciences, Siddipet",
  "Maheshwara Medical College",
  "TRR Institute of Medical Sciences, Sangareddy",
  "Arundathi Institute of Medical Sciences",
  "CMR Institute of Medical Science",
  "Father Colombo Institute of Medical Sciences, Warangal",
  "Neelima Institute of Medical Sciences",
  "Prathima Relief Institute of Medical Sciences",
  "NOVA Institute of Medical Sciences",
  "Deccan College of Medical Sciences, Hyderabad",
  "Shadan Institute of Medical Sciences, Hyderabad",
  "Dr VRK Women's Medical College",
  "Ayaan Institute of Medical Sciences",
  "Malla Reddy Institute of Medical Sciences, Hyderabad",
  "Malla Reddy Medical College for Women, Hyderabad"
].sort();

const RegistrationsTable = ({ 
  registrations, 
  loading, 
  onView, 
  onEmail, 
  search, 
  setSearch, 
  typeFilter, 
  setTypeFilter,
  collegeFilter,
  setCollegeFilter,
  page,
  setPage,
  totalPages,
  total
}) => {
  return (
    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Search registrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 3rem',
              backgroundColor: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              color: 'white',
              outline: 'none'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={18} style={{ color: 'var(--text-secondary)' }} />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                color: 'white',
                outline: 'none',
                minWidth: '120px'
              }}
            >
              <option value="All">All Types</option>
              <option value="UG">UG</option>
              <option value="PG">PG</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <select
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                color: 'white',
                outline: 'none',
                maxWidth: '250px'
              }}
            >
              <option value="All">All Colleges</option>
              {MEDICAL_COLLEGES.map(college => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>HOH-ID</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Name</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>College</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Type</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Date</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td colSpan="6" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</td>
                </tr>
              ))
            ) : registrations.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No registrations found</td>
              </tr>
            ) : (
              registrations.map((reg) => (
                <tr key={reg._id} style={{ 
                  borderBottom: '1px solid var(--border-color)',
                  transition: 'background-color 0.2s'
                }} className="table-row-hover">
                  <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{reg.registrationId}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{`${reg.firstName} ${reg.lastName}`}</td>
                  <td style={{ padding: '1rem 1.5rem', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{reg.college}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: reg.registrationType === 'PG' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                      color: reg.registrationType === 'PG' ? '#3b82f6' : '#10b981'
                    }}>
                      {reg.registrationType || 'UG'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    {new Date(reg.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => onView(reg)}
                        style={{ color: 'var(--accent-color)', padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: 'rgba(233, 30, 140, 0.1)' }}
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => onEmail(reg)}
                        style={{ color: '#10b981', padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                        title="Send Email"
                      >
                        <Mail size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{
        padding: '1.5rem',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} registrations
        </span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            style={{ 
              padding: '0.5rem', 
              borderRadius: '0.5rem', 
              border: '1px solid var(--border-color)',
              opacity: page === 1 ? 0.5 : 1
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            style={{ 
              padding: '0.5rem', 
              borderRadius: '0.5rem', 
              border: '1px solid var(--border-color)',
              opacity: page === totalPages ? 0.5 : 1
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .table-row-hover:hover {
          background-color: rgba(255,255,255,0.03);
        }
      `}</style>
    </div>
  );
};

export default RegistrationsTable;
