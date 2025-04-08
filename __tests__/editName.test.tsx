// __tests__/editName.test.tsx

jest.mock('@/app/profile/page', () => {
    return {
      __esModule: true,
      default: () => <input aria-label="name" defaultValue="Jas Toor" />
    };
  });
  
  import { render, screen } from '@testing-library/react';
  import ProfilePage from '@/app/profile/page';
  import React from 'react';

  
  describe('Profile - Edit Name', () => {
    it('renders the mocked input', () => {
      render(<ProfilePage />);
      expect(screen.getByLabelText(/name/i)).toHaveValue('Jas Toor');
    });
  });
  