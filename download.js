(async function () {
    const completed = document.querySelectorAll('.grammar-tile');
    console.log('Total:', completed.length);

    const list = [];
    const parsed = {};

    for (let index = 0; index < completed.length; index++) {
        const href = completed[index].querySelector('a');

        console.log(`[${index + 1} / ${completed.length}] ${href.textContent}`);

        const lesson = {
            name: href.textContent,
            progress: completed[index].classList.contains('tile--review-complete'),
            link: href.href,
            sentences: []
        }

        if (parsed[lesson.name]) {
            parsed[lesson.name].progress = lesson.progress;
            parsed[lesson.name].link = lesson.link;

            continue;
        }

        const listResponse = await fetch(href.href, {
            "headers": {
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
        
        const body = await listResponse.text();
        const newDocument = document.createElement('html');
        newDocument.innerHTML = body;

        const sentences = newDocument.querySelectorAll('.info__holder .japanese-example-sentence');
        for(const sentence of sentences) {
            let text = sentence.parentElement.querySelector('.example-sentence-english').textContent;
            let audio = sentence.parentElement.querySelector('.audio-holder').dataset.audioSrc;
            lesson.sentences.push({
                audio,
                text: sentence.textContent,
                translation: text
            });
        }

        parsed[lesson.name] = lesson;
        list.push(lesson);

        const relatedGrammars = newDocument.querySelectorAll('.related-grammar__holder .related-grammar-point');
        for (const relatedGrammar of relatedGrammars) {
            const relatedSentences = relatedGrammar.querySelectorAll('.japanese-example-sentence');
            const relatedLesson = {
                name: relatedGrammar.querySelector('strong').textContent,
                progress: false,
                link: '',
                sentences: []
            }

            if (parsed[relatedLesson.name]) {
                continue;
            }

            for(const sentence of relatedSentences) {
                let text = sentence.parentElement.querySelector('.example-sentence-english').textContent;
                let audio = sentence.parentElement.querySelector('.audio-holder').dataset.audioSrc;
                relatedLesson.sentences.push({
                    audio,
                    text: sentence.textContent,
                    translation: text
                });
            }

            parsed[relatedLesson.name] = relatedLesson;
            list.push(relatedLesson);
        }
    }

    console.debug(list);
    window.pene = JSON.stringify(list);
})();

