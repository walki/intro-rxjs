import $ from 'jquery';

const $title = $("#title");
const $results = $('#results');

let lastQuery = null;
let lastTimeOut = null;
let nextQueryId = 0;
$title.on('keyup', e => {
    const title = e.target.value;

    if (title == lastQuery)  return;

    lastQuery = title;

    if (lastTimeOut)
        window.clearTimeout(lastTimeOut);

    let ourQueryId = ++nextQueryId;
    lastTimeOut = window.setTimeout(()=> {
        getItems(title).then(items => {
            if (ourQueryId != nextQueryId) return;
            
            $results.empty();
    
            const $items = items.map(item => $(`<li />`).text(item));
            $results.append($items);
        });
    }, 400);
});
// ----------------------------
// Library
function getItems(title) {
    console.log(`Querying ${title}`);
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve([title, 'Item2', `Another ${Math.random()}`]);
        }, 200 + Math.random() * 1500);
    });
}
