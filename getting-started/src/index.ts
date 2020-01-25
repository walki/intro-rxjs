import { Observable, fromEvent } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, mergeMap, switchMap } from 'rxjs/operators';
import * as $ from 'jquery';

const $search = $('#search');
const $results = $('#results');

const queries$ = fromEvent<KeyboardEvent>($search, 'keyup')
    .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(query => getItems(query)),
    );

queries$.subscribe((items : Array<string>)  => {
    $results.empty();
    $results.append(
        items.map((item: string): JQuery<HTMLElement> => {
            return $('<li />').text(item);
        })
    );
});

function getItems(search: string) {
    console.log(`Querying ${search}`);

    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve([search, 'Item 2', `Another ${Math.random()}`]);
        }, 500 + Math.random() * 5000);
    });
}