// ==UserScript==
// @name         BunPro++
// @namespace    Xgc
// @version      1.1.0
// @description  Just addons to make my life simpler, and for fun.
// @author       xgc1986
// @include      /https:\/\/(www.){0,1}bunpro.jp\//
// @grant        none
// ==/UserScript==

(function () {
    "use stricct";
    const loadCb = [];

    function onLoad(query, cb) {
        if (!loadCb[query]) {
            loadCb[query] = [];
        }
        loadCb[query].push(cb);

        const items = document.querySelectorAll(query);
        for (const item of items) {
            for (const cb of (loadCb[query] || [])) {
                cb(item);
            }
        }
    }

    async function setup() {
        const style = document.createElement('style');
        style.textContent = `
            .extra-badge-0::before {
                background: url(https://d2o2t59m50yv2e.cloudfront.net/images/BunproHanko1PNG.png);
            }
            .extra-badge-1::before {
                background: url(https://d2o2t59m50yv2e.cloudfront.net/images/BunproHanko4PNG.png);
            }
            .extra-badge-2::before {
                background: url(https://d2o2t59m50yv2e.cloudfront.net/images/BunproHanko7PNG.png);
            }
            .extra-badge-3::before {
                background: url(https://d2o2t59m50yv2e.cloudfront.net/images/BunproHanko10PNG.png);
            }
            .extra-badge-4::before {
                background: url(https://d2o2t59m50yv2e.cloudfront.net/images/BunproHanko12PNG.png);
            }
            .bpp-ghosts-info::before {
                background: url(https://d2o2t59m50yv2e.cloudfront.net/images/GhostReviewIconPNGBlack.png);
                background-size: 100px;
                background-repeat: no-repeat;
                background-position-x: 100%;
                opacity: 0.3;
                content: "";
                position: absolute;
                width: 100px;
                height: 100px;
                top: 0%;
                right: 0;
                transform: rotate(-15deg) scale(0.9);
                background-overflow: visible;
                overflow: hidden;
            }

            .modern-dark .bpp-ghosts-info::before {
                background: url(https://d2o2t59m50yv2e.cloudfront.net/images/GhostReviewIconPNG.png);
                background-size: 100px;
                background-repeat: no-repeat;
                background-position-x: 100%;
            }

            .extra-badge::before {
                background-size: 100px;
                opacity: 0.3;
                background-repeat: no-repeat;
                background-position-x: 100%;
                content: "";
                position: absolute;
                width: 100px;
                height: 100px;
                top: 0%;
                right: 0;
                transform: rotate(-15deg) scale(0.9);
                background-overflow: visible;
                overflow: hidden;
            }
        `;

        document.head.appendChild(style);

        const target = document.querySelector('html');
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                for (const node of mutation.addedNodes) {
                    for (const query in loadCb) {
                        const items = document.querySelectorAll(query);
                        for (const item of items) {
                            for (const cb of (loadCb[query] || [])) {
                                cb(item);
                            }
                        }
                    }
                }
            });
        });
        var config = { attributes: false, childList: true, characterData: false };
        observer.observe(target, config);
    }

    let progressStats = ['-', '-', '-', '-', '-'];
    let progressGhosts = '-';
    onLoad('#user-dashboard', (element) => {
        const panels = element.querySelectorAll('.dashboard-tile');
        const anchor = panels[panels.length - 2];
        
        if (!anchor) {
            refreshProgress(element);
            return;
        }

        const oldPanel = document.querySelector('.bpp-progress-panel');
        if (oldPanel) {
            oldPanel.remove();
        }

        const texts = ['Apprentice', 'Guru', 'Master', 'Enlightened', 'Burned'];
        const panel = document.createElement('div');
        panel.classList.add('dashboard-tile', 'pt-4', 'pb-2', 'flex-grow-1', 'd-flex', 'flex-row', 'align-items-start', 'px-lg-4', 'px-2', 'bpp-progress-panel');

        const panelHeader = document.createElement('div');
        panel.appendChild(panelHeader);
        panelHeader.textContent = 'Grammar progress summary';

        const row = document.createElement('div');
        row.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'mb-4', 'mx-lg-3', 'mx-1', 'flex-grow-1');
        panelHeader.appendChild(row);

        const ghostsInfo = document.createElement('div');
        ghostsInfo.classList.add('px-3', 'py-4', 'mr-2', 'stats-tile', 'flex-grow-1', 'bpp-ghosts-info');

        const header = document.createElement('span');
        header.classList.add('header');
        header.textContent = 'Ghosts';
        ghostsInfo.appendChild(header);

        const value = document.createElement('span');
        value.classList.add('stat');
        value.textContent = `${progressGhosts}`;
        ghostsInfo.appendChild(value);

        row.appendChild(ghostsInfo);

        for (const i in progressStats) {
            const info = document.createElement('div');
            info.classList.add('px-3', 'py-4', 'mr-2', 'stats-tile', 'flex-grow-1', 'extra-badge', `extra-badge-${i}`);

            const header = document.createElement('span');
            header.classList.add('header');
            header.textContent = texts[i];
            info.appendChild(header);

            const value = document.createElement('span');
            value.classList.add('stat');
            value.textContent = progressStats[i];
            info.appendChild(value);

            row.appendChild(info);
        }

        anchor.parentElement.insertBefore(panel, anchor);

        refreshProgress(element);
    });

    async function refreshProgress(element) {
        (async function () {
            const profileRaw = await (await fetch("/user/profile/stats", {
                "headers": {
                },
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
            })).text();

            const levels = JSON.parse(profileRaw.match(/\[[\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+, [\d]+\]/)[0]);
            const stats = [0, 0, 0, 0, 0];
            const ghosts = progressGhosts;

            for (const i in levels) {
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

            renderProgress(element, { stats, ghosts });
        })();

        (async function () {
            const profileRaw = await (await fetch("/summary", {
                "headers": {
                },
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
            })).text();

            const ghosts = profileRaw.match(/Ghost: \d+\/(\d+)/)[1];
            const stats = progressStats;
            renderProgress(element, { stats, ghosts });
        })();
    }

    function renderProgress(element, props) {
        progressStats = props.stats;
        progressGhosts = props.ghosts;

        for (const i in progressStats) {
            const stat = element.querySelector(`.extra-badge-${i}`);
            if (stat) {
                stat.children[1].textContent = progressStats[i];
            }
        }

        const ghostStat = element.querySelector(`.bpp-ghosts-info`);
        if (ghostStat) {
            ghostStat.children[1].textContent = progressGhosts;
        }
    }

    setup();
})();
