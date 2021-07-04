import { BunproComponents } from "src/BunproComponents";
import { Component } from "src/Component";
import { Storage } from "src/Storage";

interface Props {
    stats: number[];
    ghosts: number;
}

export class GrammarProgress extends Component<Props> {

    private panel: HTMLElement | null = null;
    private ghostsBox: HTMLElement | null = null;
    private apprenticeBox: HTMLElement | null = null;
    private guruBox: HTMLElement | null = null;
    private masterBox: HTMLElement | null = null;
    private enlightenedBox: HTMLElement | null = null;
    private burnedBox: HTMLElement | null = null;

    constructor() {
        super({
            ghosts: Storage.loadNumber(Storage.PROGRESS_SUMMARY_GHOSTS, 0),
            stats: [
                Storage.loadNumber(Storage.PROGRESS_SUMMARY_APPRENTICE, 0),
                Storage.loadNumber(Storage.PROGRESS_SUMMARY_GURU, 0),
                Storage.loadNumber(Storage.PROGRESS_SUMMARY_MASTER, 0),
                Storage.loadNumber(Storage.PROGRESS_SUMMARY_ENLIGHTENED, 0),
                Storage.loadNumber(Storage.PROGRESS_SUMMARY_BURNED, 0)
            ]
        });
    }

    public destroy(): void {
        if (this.panel !== null) {
            this.panel.remove();
        }
        this.panel = null;
        this.ghostsBox = null;
        this.apprenticeBox = null;
        this.guruBox = null;
        this.masterBox = null;
        this.enlightenedBox = null;
        this.burnedBox = null;
    }

    public build(element: HTMLElement): void {
        const panels = element.querySelectorAll('.dashboard-tile');
        const anchor = panels[panels.length - 2];

        if (!anchor) {
            return;
        }

        if (!Storage.loadBoolean(Storage.PROGRESS_SUMMARY, true)) {
            return;
        }

        if (!this.panel) {
            this.panel = BunproComponents.createSection('progress-panel', 'Grammar progress summary');
            this.ghostsBox = BunproComponents.createBox('ghosts-info', 'Ghosts', `${this.props.ghosts}`);
            this.apprenticeBox = BunproComponents.createBox('apprentice-info', 'Novice', `${this.props.stats[0] ?? 0}`);
            this.guruBox = BunproComponents.createBox('guru-info', 'Intermediate', `${this.props.stats[1] ?? 0}`);
            this.masterBox = BunproComponents.createBox('master-info', 'Advanced', `${this.props.stats[2] ?? 0}`);
            this.enlightenedBox = BunproComponents.createBox('enlightened-info', 'Expert', `${this.props.stats[3] ?? 0}`);
            this.burnedBox = BunproComponents.createBox('burned-info', 'Master', `${this.props.stats[4] ?? 0}`);

            BunproComponents.addToSection(this.ghostsBox, this.panel);
            BunproComponents.addToSection(this.apprenticeBox, this.panel);
            BunproComponents.addToSection(this.guruBox, this.panel);
            BunproComponents.addToSection(this.masterBox, this.panel);
            BunproComponents.addToSection(this.enlightenedBox, this.panel);
            BunproComponents.addToSection(this.burnedBox, this.panel);
        }

        anchor.parentElement.insertBefore(this.panel, anchor);
        this.loadData();
    }

    public render(): void {
        if (!Storage.loadBoolean(Storage.PROGRESS_SUMMARY, true)) {
            return;
        }

        if (!this.panel) {
            return;
        }

        if (this.ghostsBox) {
            BunproComponents.updateBox(this.ghostsBox, 'Ghosts', `${this.props.ghosts}`);
        }

        if (this.apprenticeBox) {
            BunproComponents.updateBox(this.apprenticeBox, 'Novice', `${this.props.stats[0] ?? 0}`);
        }

        if (this.guruBox) {
            BunproComponents.updateBox(this.guruBox, 'Intermediate', `${this.props.stats[1] ?? 0}`);
        }

        if (this.masterBox) {
            BunproComponents.updateBox(this.masterBox, 'Advanced', `${this.props.stats[2] ?? 0}`);
        }

        if (this.enlightenedBox) {
            BunproComponents.updateBox(this.enlightenedBox, 'Expert', `${this.props.stats[3] ?? 0}`);
        }

        if (this.burnedBox) {
            BunproComponents.updateBox(this.burnedBox, 'Master', `${this.props.stats[4] ?? 0}`);
        }
    }

    public async loadData(): Promise<void> {
        (await fetch("/user/profile/stats", {
            "headers": {
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        })).text().then((body: string) => {
            const levels: number[] = JSON.parse(body.match(/\[[\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+\]/)[0]);
            const stats = [0, 0, 0, 0, 0];

            for (let i = 0; i < levels.length; i++) {
                let stat = 0;
                if (i < 4) {
                    stat = 0;
                } else if (i < 7) {
                    stat = 1;
                } else if (i < 9) {
                    stat = 2;
                } else if (i < 11) {
                    stat = 3;
                } else {
                    stat = 4;
                }

                stats[stat] += levels[i];
            }

            Storage.saveNumber(Storage.PROGRESS_SUMMARY_APPRENTICE, stats[0] ?? this.props.stats[0] ?? 0);
            Storage.saveNumber(Storage.PROGRESS_SUMMARY_GURU, stats[1] ?? this.props.stats[1] ?? 0);
            Storage.saveNumber(Storage.PROGRESS_SUMMARY_MASTER, stats[2] ?? this.props.stats[2] ?? 0);
            Storage.saveNumber(Storage.PROGRESS_SUMMARY_ENLIGHTENED, stats[3] ?? this.props.stats[3] ?? 0);
            Storage.saveNumber(Storage.PROGRESS_SUMMARY_BURNED, stats[4] ?? this.props.stats[4] ?? 0);

            this.setProps({
                ghosts: this.props.ghosts,
                stats
            });
        });

        (await fetch("/summary", {
            "headers": {
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        })).text().then((body) => {
            const ghostsRaw = body.match(/Ghost: \d+\/(\d+)/);
            let ghosts = this.props.ghosts;
            if (ghostsRaw !== null) {
                ghosts = parseInt(ghostsRaw[1]);
            }

            Storage.saveNumber(Storage.PROGRESS_SUMMARY_GHOSTS, ghosts);

            this.setProps({
                ghosts,
                stats: this.props.stats
            })
        });
    }
}
