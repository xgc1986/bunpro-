export class Storage {

    public static readonly PROGRESS_SUMMARY: string = 'settings-grammar';

    private static data: {[key: string]: number | boolean | string} = {};

    private static hasInit: boolean = false;

    private static init() {
        if (!Storage.hasInit) {
            Storage.hasInit = true;
            try {
                Storage.data = JSON.parse(localStorage['bpp'] ?? {})
            } catch (e) { 
                Storage.data = {};
            }
        }
    }

    public static saveBoolean(key: string, value: boolean) {
        try {
            Storage.init();
            Storage.data[key] = value;
            localStorage['bpp'] = JSON.stringify(Storage.data);
        } catch (e) {}
    }

    public static loadBoolean(key: string, def: boolean): boolean {
        Storage.init();
        if (Storage.data[key] === true) {
            return true;
        }

        if (Storage.data[key] === false) {
            return false;
        }

        return def;
    }
}