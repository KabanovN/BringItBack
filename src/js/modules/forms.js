export default class Forms {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.status = {
            loading: "LOADING...",
            success: "It's ok! We'll call you",
            failure: "Wow! Something wrong"
        };
        this.path = 'assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    checkEmailInputs() {
        const emailInputs = document.querySelectorAll('[type="email"]');

        emailInputs.forEach(input => {
            input.addEventListener('input', () => {
                input.value = input.value.replace(/[^a-z 0-9 @ \.]/ig, '');
            });
        });
    }

    // маска для ввода номера телефона
    initMask() {
        function createMask(event) {
            let pattern = '+1 (___) ___-____',
            i = 0,
            def = pattern.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');
        
            if (def.length >= val.length) {
                val = def;
            }

            this.value = pattern.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length === 2) {
                    this.value = '';
                }
            } 
        }

        let phoneInputs = document.querySelectorAll('[name="phone"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData(data, url) {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    init() {
        this.checkEmailInputs();
        this.initMask();

        this.forms.forEach(form => {
            form.addEventListener('submit', (evt) => {
                evt.preventDefault();

                const statusMessage = document.createElement('p');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: inherit;
                `;

                statusMessage.textContent = this.status.loading;
                form.parentNode.append(statusMessage);

                const formData = new FormData(form);
                this.postData(formData, this.path)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.status.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.status.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    });
            });
            
        });
    }
}