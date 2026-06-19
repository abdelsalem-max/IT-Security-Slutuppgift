import { getApiUrl } from './utils.js';

export function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

export function getAuthToken() {
    return localStorage.getItem('authToken');
}

export function removeAuthToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
}

export function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

export function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated() {
    return getAuthToken() !== null;
}

export function initNavigation() {
    const navMenu = document.getElementById('nav-menu');
    const currentUser = getCurrentUser();
    const token = getAuthToken();

    if (token) {
        navMenu.innerHTML = `
            <span>Välkommen, ${currentUser?.username || 'Användare'}!</span>
            <a href="#/dashboard">Dashboard</a>
            <button id="logout-btn">Logga ut</button>
        `;
        
        document.getElementById('logout-btn').addEventListener('click', handleLogout);
    } else {
        navMenu.innerHTML = `
            <a href="#/login">Logga in</a>
            <a href="#/register">Registrera</a>
        `;
    }
}

export async function handleLogout() {
    removeAuthToken();
    window.location.hash = '/login';
}
