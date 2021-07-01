(function () {

    async function run() {
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

        const profileRaw = await (await fetch("https://bunpro.jp/user/profile/stats", {
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

        if (location.href === 'https://bunpro.jp/dashboard') {
            buildStatsPanel(stats);
        }
    }

    function buildStatsPanel(stats) {

        const texts = ['Apprentice', 'Guru', 'Master', 'Enlightened', 'Burned'];
        const panel = document.createElement('div');
        panel.classList.add('dashboard-tile', 'pt-4', 'pb-2', 'flex-grow-1', 'd-flex', 'flex-row', 'align-items-start', 'px-lg-4', 'px-2');
        const row = document.createElement('div');
        row.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'mb-4', 'mx-lg-3', 'mx-1', 'flex-grow-1');
        panel.appendChild(row);
        
        const panels = document.querySelectorAll('.dashboard-tile');
        const anchor = panels[panels.length - 2];

        for (const i in stats) {
            const info = document.createElement('div');
            info.classList.add('px-3', 'py-4', 'mr-2', 'stats-tile', 'flex-grow-1', 'extra-badge', `extra-badge-${i}`);
            
            const header = document.createElement('span');
            header.classList.add('header');
            header.textContent = texts[i];
            info.appendChild(header);

            const value = document.createElement('span');
            value.classList.add('stat');
            value.textContent = stats[i];
            info.appendChild(value);

            row.appendChild(info);
        }

        anchor.parentElement.insertBefore(panel, anchor);
    }

    run();
})();
