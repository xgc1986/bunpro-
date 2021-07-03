export class DomObserver {

    private static cb: { [key: string]: Array<(element: HTMLElement) => void> } = {};

    static init() {
        const target = document.querySelector('html');
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                for (const node of mutation.addedNodes) {
                    for (const query in DomObserver.cb) {
                        const items = document.querySelectorAll(query);
                        for (const item of items) {
                            if (item instanceof HTMLElement) {
                                for (const cb of (DomObserver.cb[query] || [])) {
                                    cb(item);
                                }
                            }
                        }
                    }
                }
            });
        });
        var config = { attributes: false, childList: true, characterData: false };
        observer.observe(target, config);
    }

    static on(query: string, cb: (element: HTMLElement) => void): void {
        DomObserver.cb[query] = DomObserver.cb[query] ?? [];
        DomObserver.cb[query].push(cb);

        const items = document.querySelectorAll(query);
        for (const item of items) {
            if (item instanceof HTMLElement) {
                for (const cb of (DomObserver.cb[query] || [])) {
                    cb(item);
                }
            }
        }
    }
}
