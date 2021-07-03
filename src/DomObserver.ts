export class DomObserver {

    private static loadCb: { [key: string]: Array<(element: HTMLElement) => void> } = {};

    private static unloadCb: { [key: string]: Array<(element: HTMLElement) => void> } = {};

    static init() {
        const target = document.querySelector('html');
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                for (const node of mutation.addedNodes) {
                    for (const query in DomObserver.loadCb) {
                        const items = document.querySelectorAll(query);
                        for (const item of items) {
                            if (item instanceof HTMLElement) {
                                for (const cb of (DomObserver.loadCb[query] || [])) {
                                    cb(item);
                                }
                            }
                        }
                    }
                }

                for (const node of mutation.removedNodes) {
                    for (const query in DomObserver.unloadCb) {
                        const items = document.querySelectorAll(query);
                        for (const item of items) {
                            if (item instanceof HTMLElement) {
                                for (const cb of (DomObserver.unloadCb[query] || [])) {
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

    static onLoad(query: string, cb: (element: HTMLElement) => void): void {
        DomObserver.loadCb[query] = DomObserver.loadCb[query] ?? [];
        DomObserver.loadCb[query].push(cb);

        const items = document.querySelectorAll(query);
        for (const item of items) {
            if (item instanceof HTMLElement) {
                for (const cb of (DomObserver.loadCb[query] || [])) {
                    cb(item);
                }
            }
        }
    }

    static onUnload(query: string, cb: (element: HTMLElement) => void): void {
        DomObserver.unloadCb[query] = DomObserver.unloadCb[query] ?? [];
        DomObserver.unloadCb[query].push(cb);
    }
}
