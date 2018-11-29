class Menu {
    constructor(){
        this.actualState = false;
        this.$navbarButton = $('#navbar-button');
        this.$navbar = $('#navbar');

        this.init();
    }


    init(){
        this.addEvents();
    }

    addEvents(){
        this.$navbarButton.click(() => {
            this.$navbarButton.toggleClass('active');
            this.$navbar.toggleClass('active');

            if(this.$navbar.hasClass('inactive')){
                this.$navbar.removeClass('inactive')
            }
        })
    }

}

new Menu();

class Slider {
    constructor(quantity){
        this.quantity = quantity;
        this.actual = 1;
        this.flag = false; //Flag para correção de duplo clique
        this.$slider = $('#header-slider');
        this.$prox = $('#prox');
        this.$prev = $('#prev');

        this.addEvents();
    }

    addEvents(){
        this.$prox.click(() => {
            if(this.quantity > this.actual && !this.flag){
                this.flag = true;
                let sliderLeftValue = parseInt(this.$slider.css('left').split('px')[0]);
                this.$slider.css('left', `${sliderLeftValue-450}px`);
                this.actual++;

                setTimeout(() => this.flag = false, 250);
            }
        })

        this.$prev.click(() => {
            if(this.actual != 1 && !this.flag){
                this.flag = true;
                let sliderLeftValue = parseInt(this.$slider.css('left').split('px')[0]);
                this.$slider.css('left', `${sliderLeftValue+450}px`);
                this.actual--;
                setTimeout(() => this.flag = false, 250)
            }
        })
    }
};

new Slider(3);

class Page {
    constructor(){
        this.$content = $('#content');
        this.$overlaySection = $('#overlay-section');
    }

    toggle(){
        this.$overlaySection.toggleClass('active');
        this.$content.toggleClass('blured');
    }
};

class LoginPage {
    constructor(){
        this.$loginLink = $('[data-page="login"]');
        this.$login = $('#login');
        this.Page = new Page();

        this.init();
    }

    init(){
        this.addEvents();
    }

    addEvents(){
        this.$loginLink.click(() => {
            this.Page.toggle();
            this.$login.toggleClass('active')
        })
    }
}

new LoginPage();

class Toast {
    constructor(message){
        this.message = message;
        this.$toast = $('#toast');
        this.$toastMessage = $('#toast-message');

        this.toggleShow();
    }

    toggleShow(){
        this.$toastMessage.text(this.message);
        this.$toast.addClass('active');

        setTimeout(() => {
            this.$toast.removeClass('active');
        }, 6000)
    }
}

class FormLogin {
    constructor(){
        this.$form = $('#login-form');

        this.init();
    }

    init(){
        this.addEvents();
    }

    addEvents(){
        this.$form.submit((e) => {
            e.preventDefault();

            // new Toast('rola')
            let serializedForm = this.$form.serializeArray(),
                hasError = false;

            serializedForm.map((element) => {
                if(element.value === ''){
                    this.setErrorElement(element.name);
                    hasError = true;
                }else{
                    this.removeErrorElement(element.name);
                }
            })

            if(serializedForm[1].value.length < 8){
                this.setErrorElement('password','Your password must have more than seven characters!');
                hasError = true;
            }else if(!(/[A-Z]/.test(serializedForm[1].value))){
                this.setErrorElement('password','Your password must have least one capitalized letter!');
                hasError = true;
            }

            if(!hasError){
                $('#loader').addClass('active');

                setTimeout(() => {
                    $('#loader').removeClass('active');
                    new Toast('Welcome back, we\'re happy that you\'re here again :)')
                }, 5000)
            }
        })
    }

    setErrorElement(field, message = 'Please, fill this field!'){
        $(`#input-control-${field}`).addClass('error');
        $(`#input-control-${field}-message`).text(message);
    }

    removeErrorElement(field){
        $(`#input-control-${field}`).removeClass('error');
    }
}

new FormLogin();
