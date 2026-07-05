import { storage, STORAGE_KEYS } from '../utils/storage';

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36);
}

function generateToken() {
  return 'tk_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 15);
}

export function register(name, email, password) {
  const users = storage.get(STORAGE_KEYS.USERS_DB, []);

  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    throw new Error('A user with this email already exists');
  }

  const newUser = {
    id: Date.now().toString(36),
    name,
    email: email.toLowerCase(),
    password: simpleHash(password),
    createdAt: new Date().toISOString(),
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff&size=128`,
  };

  users.push(newUser);
  storage.set(STORAGE_KEYS.USERS_DB, users);

  const token = generateToken();
  const userData = { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar, createdAt: newUser.createdAt };

  storage.set(STORAGE_KEYS.AUTH_USER, userData);
  storage.set(STORAGE_KEYS.AUTH_TOKEN, token);

  return { user: userData, token };
}

export function login(email, password) {
  const users = storage.get(STORAGE_KEYS.USERS_DB, []);

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    throw new Error('No account found with this email');
  }

  if (user.password !== simpleHash(password)) {
    throw new Error('Incorrect password');
  }

  const token = generateToken();
  const userData = { id: user.id, name: user.name, email: user.email, avatar: user.avatar, createdAt: user.createdAt };

  storage.set(STORAGE_KEYS.AUTH_USER, userData);
  storage.set(STORAGE_KEYS.AUTH_TOKEN, token);

  return { user: userData, token };
}

export function logout() {
  storage.remove(STORAGE_KEYS.AUTH_USER);
  storage.remove(STORAGE_KEYS.AUTH_TOKEN);
}

export function getCurrentUser() {
  const user = storage.get(STORAGE_KEYS.AUTH_USER);
  const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);
  if (user && token) {
    return { user, token };
  }
  return null;
}

export function updateProfile(updates) {
  const current = storage.get(STORAGE_KEYS.AUTH_USER);
  if (!current) throw new Error('Not authenticated');

  const updated = { ...current, ...updates };
  storage.set(STORAGE_KEYS.AUTH_USER, updated);

  const users = storage.get(STORAGE_KEYS.USERS_DB, []);
  const idx = users.findIndex(u => u.id === current.id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...updates };
    storage.set(STORAGE_KEYS.USERS_DB, users);
  }

  return updated;
}
