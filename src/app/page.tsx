'use client';
import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import CardList from './components/CardList';

export default function Page() {
  const [selectedHp, setSelectedHp] = useState<string>('');

  return (
    <main className="container mx-auto px-4">
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold mb-6">Card Browser</h1>
      <div className="max-w-xs mx-auto">
        <Dropdown onSelect={setSelectedHp} />
      </div>
    </div>
        {selectedHp && <CardList hp={selectedHp} />}
      </main>
  );
}
