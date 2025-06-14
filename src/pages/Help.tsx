
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import FAQ from '@/components/FAQ';

const Help = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <BackButton />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Help;
