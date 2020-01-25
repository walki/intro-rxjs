import $ from 'jquery';
import Rx from 'rxjs/Rx'


const $title = $("#title");
const $results = $('#results');


// everything can be monitored / transformed / observed / subcribed upon...
const keyUps$ =  Rx.Observable.fromEvent($title, 'keyup');

keyUps$.subscribe(e => {
    console.log(e);
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
