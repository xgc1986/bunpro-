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
}