import { getApiUrl, logError, normalizeId, sanitizeHtml } from './utils.js';
import { getAuthToken } from './auth.js';

async function request(endpoint, options = {}) {
    const url = `${getApiUrl()}${endpoint}`;
    const token = getAuthToken();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'same-origin', 
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Error: ${response.status}`);
        }

        return data;
    } catch (error) {
        logError('API Request', error);
        throw error;
    }
}

export async function login(username, password) {
    const cleanUsername = sanitizeHtml(username);

    return request('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username: cleanUsername, password: String(password ?? '') }),
    });
}

export async function register(username, password) {
    const cleanUsername = sanitizeHtml(username);

    return request('/api/register', {
        method: 'POST',
        body: JSON.stringify({ username: cleanUsername, password: String(password ?? '') }),
    });
}

export async function getCurrentUser() {
    return request('/api/user?action=ME');
}

export async function searchUsers(searchQuery) {
    const cleanSearchQuery = encodeURIComponent(sanitizeHtml(searchQuery));
    return request(`/api/user?action=SEARCH&search=${cleanSearchQuery}`);
}

export async function getMessages() {
    return request('/api/message');
}

export async function sendMessage(to, message) {
    const cleanTo = normalizeId(to);
    const cleanMessage = sanitizeHtml(message);

    return request('/api/message', {
        method: 'POST',
        body: JSON.stringify({ to: cleanTo, message: cleanMessage }),
    });
}
