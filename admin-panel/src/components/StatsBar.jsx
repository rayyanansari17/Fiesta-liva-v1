import React from 'react';
import { Users, IndianRupee, PieChart } from 'lucide-react';

const StatsBar = ({ stats }) => {
  const cards = [
    {
      title: 'Total Registrations',
      value: stats.totalRegistrations || 0,
      icon: <Users size={24} />,
      color: 'var(--accent-color)'
    },
    {
      title: 'Total Amount Collected',
      value: `₹${(stats.totalAmount || 0).toLocaleString('en-IN')}`,
      icon: <IndianRupee size={24} />,
      color: '#10b981'
    },
    {
      title: 'UG vs PG Split',
      value: `${stats.ugCount || 0} / ${stats.pgCount || 0}`,
      icon: <PieChart size={24} />,
      color: '#3b82f6'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    }}>
      {cards.map((card, index) => (
        <div key={index} className="card" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          boxShadow: `0 0 20px var(--accent-glow)`
        }}>
          <div style={{
            backgroundColor: 'rgba(233, 30, 140, 0.1)',
            padding: '1rem',
            borderRadius: '0.75rem',
            color: card.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {card.icon}
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{card.title}</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
