import { config } from './config/index.js';

export function getApiUrl() {
    return config.apiBaseUrl;
}

export function sanitizeHtml(input) {
    return input;
}

export function logError(context, error) {
    console.error(`[${context}]`, error);
}

export function setupSecurityHeaders() {

}
