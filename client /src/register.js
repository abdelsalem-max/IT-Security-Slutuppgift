import { register } from './api.js';
import { logError } from './utils.js';


export function renderRegisterPage(container) {
    container.innerHTML = `
        <div class="auth-page">
            <h2>Registrera nytt konto</h2>
            <div id="register-error" class="error-message" style="display: none;"></div>
            <div id="register-success" class="success-message" style="display: none;"></div>
            <form id="register-form">
                <div class="form-group">
                    <label for="register-username">Användarnamn</label>
                    <input 
                        type="text" 
                        id="register-username" 
                        name="username" 
                        required 
                        minlength="3"
                        autocomplete="username"
                    >
                </div>
                <div class="form-group">
                    <label for="register-password">Lösenord</label>
                    <input 
                        type="password" 
                        id="register-password" 
                        name="password" 
                        required 
                        minlength="8"
                        autocomplete="new-password"
                    >
                    <small style="color: #666;">Minst 8 tecken och Mindre än 16 tecken</small>
                </div>
                <div class="form-group">
                    <label for="register-confirm-password">Bekräfta lösenord</label>
                    <input 
                        type="password" 
                        id="register-confirm-password" 
                        name="confirmPassword" 
                        required 
                        autocomplete="new-password"
                    >
                </div>
                <button type="submit" class="btn btn-primary">Registrera</button>
            </form>
            <div class="auth-link">
                <p>Redan har ett konto? <a href="#/login">Logga in</a></p>
            </div>
        </div>
    `;

    document.getElementById('register-form').addEventListener('submit', handleRegister);
}

async function handleRegister(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('register-username');
    const passwordInput = document.getElementById('register-password');
    const confirmPasswordInput = document.getElementById('register-confirm-password');
    const errorDiv = document.getElementById('register-error');
    const successDiv = document.getElementById('register-success');

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password.length < 8) {
        showError(errorDiv, 'Lösenord måste vara minst 8 tecken långt');
        console.log('Error har hänt, försök igen')
        return;
    }
     if (password.length > 16) {
        showError(errorDiv, 'Lösenord måste vara mindre än 16 tecken långt');
       console.log('Error har hänt, försök igen')
        return;
    }

    if (password !== confirmPassword) {
        showError(errorDiv, 'Lösenorden matchar inte');
        console.log('Error har hänt, försök igen')
        return;
    }

    if (username.length < 3) {
        showError(errorDiv, 'Användarnamn måste vara minst 3 tecken långt');
        console.log('Error har hänt, försök igen')
        return;
    }

     if (username.length > 15) {
        showError(errorDiv, 'Användarnamn måste vara mindre än 15 tecken långt');
        console.log('Error har hänt, försök igen')
        return;
    }

    try {
        const response = await register(username, password);

        if (response.status === 'SUCCESS') {
            showSuccess(successDiv, 'Konto skapat! Du kan nu logga in.');
            setTimeout(() => {
                window.location.hash = '/login';
            }, 2000);
        } else {
            showError(errorDiv, response.message || 'Registration misslyckades');
        }
    } catch (error) {
        showError(errorDiv, 'Något gick fel. Försök igen.');
        logError('Register', error);
    }
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    element.parentElement.querySelector('.success-message').style.display = 'none';
}

function showSuccess(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    element.parentElement.querySelector('.error-message').style.display = 'none';
}
