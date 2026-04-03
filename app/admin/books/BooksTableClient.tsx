'use client';

import dynamic from 'next/dynamic';

const BooksTable = dynamic(() => import('./BooksTable'), {
  ssr: false,
  loading: () => <div className="p-8 text-center text-gray-400">Loading books…</div>,
});

export default BooksTable;
