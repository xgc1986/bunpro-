import { Storage } from "src/Storage";

export class BunproComponents {
    
    static createSection(id: string, title: string): HTMLElement {
        const panel = document.createElement('div');
        panel.classList.add('dashboard-tile', 'pt-4', 'pb-2', 'flex-grow-1', 'px-lg-4', 'px-2', 'bpp-section', `bpp-${id}`);

        const header = document.createElement('div');
        header.textContent = 'Grammar progress summary';
        panel.appendChild(header);

        const body = document.createElement('div');
        body.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'mb-4', 'mx-lg-3', 'mx-1', 'flex-grow-1', 'pt-4', 'bpp-section-body');
        panel.appendChild(body);

        return panel;
    }

    static addToSection(element: HTMLElement, section: HTMLElement): void {
        if (!section.classList.contains('bpp-section')) {
            throw new Error('Trying to add elements to a nonsection');
        }

        const body = section.querySelector('.bpp-section-body');
        if (!body) {
            return;
        }

        body.appendChild(element);
    }

    static createBox(id: string, title: string, value: string): HTMLElement {
        const box = document.createElement('div');
        box.classList.add('px-3', 'py-4', 'mr-2', 'stats-tile', 'flex-grow-1', `bpp-${id}`);

        const header = document.createElement('span');
        header.classList.add('header');
        header.textContent = title;
        box.appendChild(header);

        const valueField = document.createElement('span');
        valueField.classList.add('stat');
        valueField.textContent = value;
        box.appendChild(valueField);

        return box;
    }

    static updateBox(box: HTMLElement, title: string, value: string): void {
        const header = box.querySelector('.header');
        if (header) {
            header.textContent = title;
        }

        const stat = box.querySelector('.stat');
        if (stat) {
            stat.textContent = value;
        }
    }

    static createSettingSection(title: string): HTMLElement {
        if (location.pathname !== "/settings/general") {
            throw new Error("Cannot add settings in this page");
        }

        const hrs = document.querySelectorAll('hr');
        const anchor = hrs[hrs.length - 1];

        const separator = document.createElement('hr');
        anchor.parentElement.insertBefore(separator, anchor);

        const element = document.createElement('div');
        element.classList.add('pb-2', 'bpp-settings');
        const h5 = document.createElement('h5');
        h5.classList.add('mb-4');
        h5.textContent = title;
        element.appendChild(h5);
        
        anchor.parentElement.insertBefore(element, anchor);

        return element;
    }

    static addCheckboxSettings(settings: HTMLElement, id: string, name: string, def: boolean, description: string): void {
        if (!settings.classList.contains('bpp-settings')) {
            throw new Error('You cannot perform this action');
        }

        const value = Storage.loadBoolean(id, def);

        const body = document.createElement('div');
        body.classList.add('mb-3', 'd-flex', 'flex-sm-row', 'flex-column', 'settings-form-holder');

        const label = document.createElement('div');
        label.classList.add('setting-label');
        label.textContent = name;
        body.appendChild(label);

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('flex-grow-1', 'd-flex', 'justify-content-start');
        const formContainer = document.createElement('div');
        formContainer.classList.add('edit-settings-input-form');
        const anotherContainer = document.createElement('div');
        anotherContainer.classList.add('d-flex', 'align-items-center', 'mb-2');
        const fakeLabel = document.createElement('label');
        fakeLabel.classList.add('settings-switch');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = 'Off';
        const span = document.createElement('span');
        span.classList.add('settings-slider', 'round');
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.value = input.value;
        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('extra-info');
        descriptionContainer.textContent = description;

        body.appendChild(inputContainer);
        inputContainer.appendChild(formContainer);
        formContainer.appendChild(anotherContainer);
        anotherContainer.appendChild(fakeLabel);
        fakeLabel.appendChild(input);
        fakeLabel.appendChild(span);
        fakeLabel.appendChild(hiddenInput);
        formContainer.appendChild(descriptionContainer);

        span.addEventListener('click', () => {
            if (input.value === 'On') {
                input.value = 'Off';
                hiddenInput.value = 'Off';
            } else {
                input.value = 'On';
                hiddenInput.value = 'On';
            }

            Storage.saveBoolean(id, input.value === 'On');
        });

        if (value) {
            span.click();
        }

        settings.appendChild(body);
    }
}