import React from 'react';
import Page from './Page';

interface ResumeLayoutProps {
  children: React.ReactNode;
}

export default function ResumeLayout({ children }: ResumeLayoutProps) {
  return (
    <div className="resume-container">
      <Page id="resume-content">
        {children}
      </Page>
    </div>
  );
}
