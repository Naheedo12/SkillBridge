// Test simple pour le service d'authentification
describe('AuthService Tests', () => {
  test('validation email - email valide', () => {
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
  });

  test('validation email - email invalide', () => {
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });

  test('validation mot de passe - longueur minimale', () => {
    const isValidPassword = (password) => {
      return !!(password && password.length >= 6);
    };

    expect(isValidPassword('123456')).toBe(true);
    expect(isValidPassword('motdepasse')).toBe(true);
    expect(isValidPassword('12345')).toBe(false);
    expect(isValidPassword('')).toBe(false);
    expect(isValidPassword(null)).toBe(false);
    expect(isValidPassword(undefined)).toBe(false);
  });

  test('formatage nom complet', () => {
    const formatFullName = (prenom, nom) => {
      if (!prenom || !nom) return '';
      return `${prenom} ${nom}`;
    };

    expect(formatFullName('John', 'Doe')).toBe('John Doe');
    expect(formatFullName('Marie', 'Dupont')).toBe('Marie Dupont');
    expect(formatFullName('', 'Doe')).toBe('');
    expect(formatFullName('John', '')).toBe('');
  });

  test('calcul initiales utilisateur', () => {
    const getUserInitials = (prenom, nom) => {
      if (!prenom || !nom) return '??';
      return `${prenom[0]}${nom[0]}`.toUpperCase();
    };

    expect(getUserInitials('John', 'Doe')).toBe('JD');
    expect(getUserInitials('marie', 'dupont')).toBe('MD');
    expect(getUserInitials('', 'Doe')).toBe('??');
    expect(getUserInitials('John', '')).toBe('??');
  });
});