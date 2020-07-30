import React from 'react';
import { render } from 'react-native-testing-library';
import SignIn from '../../pages/SignIn';

jest.mock('@react-native-community/async-storage');

jest.mock('@react-navigation/native', () => ({ useNavigation: jest.fn() }));

describe('SignIn Page', () => {
  it('should contains email/password inputs', () => {
    const { getByPlaceholder } = render(<SignIn />);

    expect(getByPlaceholder('E-mail')).toBeTruthy();
    expect(getByPlaceholder('Password')).toBeTruthy();
  });
});
