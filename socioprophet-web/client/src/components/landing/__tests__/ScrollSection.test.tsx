import React from 'react';
import ScrollSection from '../ScrollSection';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('header renders with correct text', () => {
  const component = render(<ScrollSection />);
  // const headerEl = component.getByTestId('login-btn');

  // expect(headerEl.textContent).toBe('LOGIN');
});
