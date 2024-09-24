import React from 'react';
import Sidebar from '../ui/dashboard/sidebar/sidebar';
import Navbar from '../ui/dashboard/navbar/navbar';
import Footer from '../ui/dashboard/footer/footer';

function Layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <div className="flex-row flex">
        <div className="flex-4 bg-slate-800 p-8">
          <Sidebar />
        </div>
        <div className="flex-1 p-8">
          <Navbar />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
