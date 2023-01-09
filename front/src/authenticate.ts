import { loginUser, registerUser } from './requests';

document.addEventListener('DOMContentLoaded', async event => {
    if (document.getElementById('login')) {
        document.querySelector('.formContainer').addEventListener('submit', async (event) => {
            event.preventDefault();
            // @ts-ignore
            const email = document.getElementById('emailForm').value;
            // @ts-ignore
            const password = document.getElementById('passwordForm').value;

            const response = await loginUser({ email, password });
            if (response) {
                localStorage.setItem('authToken', response.token);
                return window.location.replace('http://localhost:4000/');
            }
            else {
                document.querySelector('.errors').innerHTML = 'Неправильная эл.почта или пароль';
                setTimeout(() => {
                    document.querySelector('.errors').innerHTML = '';
                }, 3000)
            }
        })
    }

    if (document.getElementById('register')) {
        document.querySelector('.formContainer').addEventListener('submit', async (event) => {
            event.preventDefault()

            let firstname = document.getElementById('firstnameForm');

            let lastname = document.getElementById('lastnameForm');

            let password = document.getElementById('passwordForm');

            let confirm = document.getElementById('passwordConfirmForm');

            let email = document.getElementById('emailForm');

            // @ts-ignore
            if (![firstname, lastname, password, confirm, email].some(element => element === null)) {
                // @ts-ignore
                if (password.value === confirm.value) {
                    // @ts-ignore
                    if (password.value.length > 5) {
                        // @ts-ignore
                        firstname = firstname.value;
                        // @ts-ignore
                        lastname = lastname.value;
                        // @ts-ignore
                        password = password.value;
                        // @ts-ignore
                        email = email.value;

                        // @ts-ignore
                        const response = await registerUser({ firstname, lastname, password, email });
                        if (response) {
                            localStorage.setItem('authToken', response.token);
                            return window.location.replace('http://localhost:4000/');
                        }
                        else {
                            document.querySelector('.errors').innerHTML = 'Пользователь уже зарегистрирован!';
                            setTimeout(() => {
                                document.querySelector('.errors').innerHTML = '';
                            }, 3000)
                        }
                    }
                    else {
                        document.querySelector('.errors').innerHTML = 'Пароль должен быть больше 5 символов';
                        setTimeout(() => {
                            document.querySelector('.errors').innerHTML = '';
                        }, 3000)
                    }
                }
                else {
                    document.querySelector('.errors').innerHTML = 'Пароли не совпадают!';
                    setTimeout(() => {
                        document.querySelector('.errors').innerHTML = '';
                    }, 3000)
                }
            }
            else {
                document.querySelector('.errors').innerHTML = 'Все поля объязательны!';
                setTimeout(() => {
                    document.querySelector('.errors').innerHTML = '';
                }, 3000)
            }
        })
    }
})