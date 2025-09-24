import React from 'react';

interface PageProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Page({ children, className = '', id }: PageProps) {
  return (
    <div 
      id={id}
      className={`resume-page ${className}`}
    >
      {children}
    </div>
  );
}
