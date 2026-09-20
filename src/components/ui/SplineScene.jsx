import React from 'react';
import Interactive3DAvatar from './Interactive3DAvatar';

export function SplineScene({ className }) {
  return (
    <div className={`w-full h-full ${className || ''}`}>
      <Interactive3DAvatar />
    </div>
  );
}
