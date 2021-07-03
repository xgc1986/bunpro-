import { BunproComponents } from "src/BunproComponents";
import { Component } from "src/Component";
import { Storage } from "src/Storage";

interface Props {
}

export class Settings extends Component<Props> {
   
    private panel: HTMLElement | null = null;

    constructor() {
        super({});
    }

    public build() {
        if (location.pathname !== "/settings/general") {
            return;
        }

        this.panel = BunproComponents.createSettingSection('Bunpro++');
        BunproComponents.addCheckboxSettings(this.panel, Storage.PROGRESS_SUMMARY, 'Grammar progress summary', true, 'Choose to show or hide grammar progress summary in the dashboard.');
    }
}
