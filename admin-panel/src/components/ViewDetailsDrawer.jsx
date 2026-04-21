import React from 'react';
import { X, User, BookOpen, Layers, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ViewDetailsDrawer = ({ registration, isOpen, onClose }) => {
  if (!registration) return null;

  const sections = [
    {
      title: 'Personal Info',
      icon: <User size={18} />,
      items: [
        { label: 'HOH-ID', value: registration.registrationId },
        { label: 'Full Name', value: `${registration.firstName} ${registration.lastName}` },
        { label: 'Email', value: registration.email },
        { label: 'Phone', value: registration.phone },
        { label: 'Program Type', value: registration.registrationType || 'UG' },
        { label: 'College', value: registration.college },
        { label: 'Roll Number', value: registration.rollNumber },
        { label: 'Year/Semester', value: registration.year },
        { label: 'Registered On', value: new Date(registration.createdAt).toLocaleString() },
      ]
    },
    {
      title: 'Add-ons Selected',
      icon: <BookOpen size={18} />,
      items: [
        { label: 'Clinical Workshops', value: registration.clinicalWorkshops?.join(', ') || 'None' },
        { label: 'Inter-College Contests', value: registration.contests?.join(', ') || 'None' },
      ]
    },
    {
      title: 'Interests',
      icon: <Heart size={18} />,
      items: [
        { label: 'Networking Interests', value: registration.networking?.join(', ') || 'None' },
        { label: 'Future Interests', value: registration.future?.join(', ') || 'None' },
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 100,
              backdropFilter: 'blur(4px)'
            }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '500px',
              backgroundColor: 'var(--card-bg)',
              zIndex: 101,
              boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto'
            }}
          >
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              backgroundColor: 'var(--card-bg)',
              zIndex: 1
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Registration Details</h2>
              <button onClick={onClose} style={{ color: 'var(--text-secondary)' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {sections.map((section, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', color: 'var(--accent-color)' }}>
                    {section.icon}
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{section.title}</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {section.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{item.label}</span>
                        <span style={{ fontSize: '0.925rem', color: 'white' }}>{item.value || 'N/A'}</span>
                      </div>
                    ))}
                    {section.title === 'Personal Info' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '500' }}>ID Card / College ID</span>
                        {registration.idCardImage ? (
                          <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                            <img src={registration.idCardImage} alt="ID Card" style={{ width: '100%', height: 'auto', display: 'block' }} />
                          </div>
                        ) : (
                          <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px border-dashed var(--border-color)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            No ID card uploaded
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ViewDetailsDrawer;
