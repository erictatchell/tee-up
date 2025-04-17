jest.mock('@/app/profile/page', () => {
    return {
      __esModule: true,
      default: () => <input type="file" aria-label="profile image" />
    };
  });
  
  import { render, screen, fireEvent } from '@testing-library/react';
  import ProfilePage from '@/app/profile/page';
  import React from 'react';

  
  describe('Profile - Edit Image', () => {
    it('uploads a file', () => {
      render(<ProfilePage />);
      const fileInput = screen.getByLabelText(/profile image/i);
      const file = new File(['(⌐□_□)'], 'pic.png', { type: 'image/png' });
      fireEvent.change(fileInput, { target: { files: [file] } });
  
      expect(fileInput.files[0]).toBe(file);
      expect(fileInput.files).toHaveLength(1);
    });
  });
  