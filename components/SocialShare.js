'use client';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export default function SocialShare({ url, title, className = '', size = 'normal' }) {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    whatsapp: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
  };

  const handleShare = async (platform) => {
    // Track share in database
    try {
      await fetch('/api/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, url, title }),
      });
    } catch (error) {
      console.error('Error tracking share:', error);
    }

    // Open share window
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const buttonSize = size === 'small' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'small' ? 16 : 20;

  return (
    <div className={`flex gap-3 justify-center ${className}`}>
      <button
        onClick={() => handleShare('facebook')}
        className={`${buttonSize} flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors`}
        title="Udostępnij na Facebook"
      >
        <FaFacebook size={iconSize} />
      </button>
      <button
        onClick={() => handleShare('twitter')}
        className={`${buttonSize} flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-colors`}
        title="Udostępnij na X (Twitter)"
      >
        <FaTwitter size={iconSize} />
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className={`${buttonSize} flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-colors`}
        title="Udostępnij na LinkedIn"
      >
        <FaLinkedin size={iconSize} />
      </button>
      <button
        onClick={() => handleShare('whatsapp')}
        className={`${buttonSize} flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors`}
        title="Udostępnij na WhatsApp"
      >
        <FaWhatsapp size={iconSize} />
      </button>
    </div>
  );
}
