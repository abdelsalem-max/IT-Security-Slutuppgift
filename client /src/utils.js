import { config } from './config/index.js';
import DOMPurify from "../node_modules/dompurify/dist/purify.es.mjs";

export function getApiUrl() {
    return config.apiBaseUrl;
}

export function sanitizeHtml(input) {
    return DOMPurify.sanitize(String(input ?? '')).trim();
}

export function normalizeId(input) {
    const id = Number(input);
    return Number.isInteger(id) && id > 0 ? id : null;
}

export function logError(context, error) {
    console.error(`[${context}]`, error);
}

export function setupSecurityHeaders() {

}
