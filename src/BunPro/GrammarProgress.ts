import { BunproComponents } from "src/BunproComponents";
import { Component } from "src/Component";

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
            ghosts: 0,
            stats: [0, 0, 0, 0, 0]
        });
    }

    public build(element: HTMLElement): void {
        if (this.panel === null) {
            const panels = element.querySelectorAll('.dashboard-tile');
            const anchor = panels[panels.length - 2];

            if (!anchor) {
                return;
            }

        
            this.panel = BunproComponents.createSection('progress-panel', 'Grammar progress summary');
            this.ghostsBox = BunproComponents.createBox('ghosts-info', 'Ghosts', `${this.props.ghosts}`);
            this.apprenticeBox = BunproComponents.createBox('apprentice-info', 'Apprentice', `${this.props.stats[0] ?? 0}`);
            this.guruBox = BunproComponents.createBox('guru-info', 'Guru', `${this.props.stats[1] ?? 0}`);
            this.masterBox = BunproComponents.createBox('master-info', 'Master', `${this.props.stats[2] ?? 0}`);
            this.enlightenedBox = BunproComponents.createBox('enlightened-info', 'Apprentice', `${this.props.stats[3] ?? 0}`);
            this.burnedBox = BunproComponents.createBox('burned-info', 'Apprentice', `${this.props.stats[4] ?? 0}`);

            BunproComponents.addToSection(this.ghostsBox, this.panel);
            BunproComponents.addToSection(this.apprenticeBox, this.panel);
            BunproComponents.addToSection(this.guruBox, this.panel);
            BunproComponents.addToSection(this.masterBox, this.panel);
            BunproComponents.addToSection(this.enlightenedBox, this.panel);
            BunproComponents.addToSection(this.burnedBox, this.panel);

            anchor.parentElement.insertBefore(this.panel, anchor);
        }

        this.loadData();
    }

    public render(): void {
        if (!this.panel) {
            return;
        }

        if (this.ghostsBox) {
            BunproComponents.updateBox(this.ghostsBox, 'Ghosts', `${this.props.ghosts}`);
        }
        
        if (this.apprenticeBox) {
            BunproComponents.updateBox(this.apprenticeBox, 'Ghosts', `${this.props.stats[0] ?? 0}`);
        }

        if (this.guruBox) {
            BunproComponents.updateBox(this.guruBox, 'Ghosts', `${this.props.stats[1] ?? 0}`);
        }

        if (this.masterBox) {
            BunproComponents.updateBox(this.masterBox, 'Ghosts', `${this.props.stats[2] ?? 0}`);
        }

        if (this.enlightenedBox) {
            BunproComponents.updateBox(this.enlightenedBox, 'Ghosts', `${this.props.stats[3] ?? 0}`);
        }

        if (this.burnedBox) {
            BunproComponents.updateBox(this.burnedBox, 'Ghosts', `${this.props.stats[4] ?? 0}`);
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
            let ghosts = 0;
            if (ghostsRaw !== null) {
                ghosts = parseInt(ghostsRaw[1]);
            }

            this.setProps({
                ghosts,
                stats: this.props.stats
            })
        });
    }
}
