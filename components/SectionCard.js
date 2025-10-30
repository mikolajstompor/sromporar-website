'use client';

import Link from 'next/link';

export default function SectionCard({ section, index }) {
  const delay = (index % 9) * 0.1;

  return (
    <div
      className="art-card p-6 rounded-lg cursor-pointer fade-in"
      style={{
        animationDelay: `${delay}s`,
        backgroundColor: section.backgroundColor || '#0A0B0A',
      }}
    >
      {section.image && (
        <img
          src={section.image}
          alt={section.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h3
        className="font-space text-xl mb-3 text-center"
        style={{ color: section.textColor || '#87CEEB' }}
      >
        {section.title}
      </h3>
      {section.description && (
        <p className="text-gray-300 text-sm mb-4 text-center">
          {section.description}
        </p>
      )}
      {section.content && (
        <div className="text-gray-400 text-xs mb-4 line-clamp-3">
          {section.content}
        </div>
      )}
      <Link
        href={`/section/${section.slug}`}
        className="block text-center text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
      >
        Zobacz więcej →
      </Link>
    </div>
  );
}
