export class Storage {

    public static readonly PROGRESS_SUMMARY: string = 'settings-grammar';

    public static saveBoolean(key: string, value: boolean) {
        localStorage[key] = value;
    }

    public static loadBoolean(key: string, def: boolean): boolean {
        if (localStorage[key] === 'true') {
            return true;
        }

        if (localStorage[key] === 'false') {
            return false;
        }

        return def;
    }
}