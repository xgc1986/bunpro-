import { isNumber } from "util";

export class Storage {

    public static readonly PROGRESS_SUMMARY: string = 'progressSummary';
    public static readonly PROGRESS_SUMMARY_APPRENTICE: string = 'progressSummaryApprentice';
    public static readonly PROGRESS_SUMMARY_GHOSTS: string = 'progressSummaryGhosts';
    public static readonly PROGRESS_SUMMARY_GURU: string = 'progressSummaryGuru';
    public static readonly PROGRESS_SUMMARY_MASTER: string = 'progressSummaryMaster';
    public static readonly PROGRESS_SUMMARY_ENLIGHTENED: string = 'progressSummaryEnlightened';
    public static readonly PROGRESS_SUMMARY_BURNED: string = 'progressSummaryBurned';

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

    public static loadBoolean(key: string, def: boolean): boolean {
        Storage.init();
        const value = Storage.data[key];
        if (typeof value === 'boolean') {
            return value;
        }
        return def;
    }
    
    public static loadNumber(key: string, def: number): number {
        Storage.init();
        const value = Storage.data[key];
        if (typeof value === 'number') {
            return value;
        }

        return def;
    }

    public static saveBoolean(key: string, value: boolean) {
        try {
            Storage.init();
            Storage.data[key] = value;
            localStorage['bpp'] = JSON.stringify(Storage.data);
        } catch (e) {}
    }

    public static saveNumber(key: string, value: number) {
        try {
            Storage.init();
            Storage.data[key] = value;
            localStorage['bpp'] = JSON.stringify(Storage.data);
        } catch (e) {}
    }
}