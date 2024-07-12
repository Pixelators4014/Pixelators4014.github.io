const params = {
    fuseOpts: {}
};

import Fuse from 'fuse.js';

let fuse;
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');


let resultsAvailable = false;

function makeResult(item) {
    return `<a class="block w-full px-4 py-2 border-b cursor-pointer text-black dark:text-white hover:text-black hover:dark:text-white hover:bg-slate-600" href="${item.item.permalink}" aria-label="${item.item.title}">
                <div>
                    <h3 class="text-lg font-semibold">${item.item.title}</h3>
                </div>
                <div class="text-sm font-normal"><p class="hover:text-black dark:hover:text-white">${item.item.summary}</p></div>
            </a>`;
}

// load our search index
window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data) {
                    // fuse.js options; check fuse.js website for details
                    let options = {
                        distance: 100,
                        threshold: 0.4,
                        ignoreLocation: true,
                        keys: [
                            'title',
                            'permalink',
                            'summary',
                            'content'
                        ]
                    };
                    if (params.fuseOpts) {
                        options = {
                            isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
                            includeScore: params.fuseOpts.includescore ?? false,
                            includeMatches: params.fuseOpts.includematches ?? false,
                            minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
                            shouldSort: params.fuseOpts.shouldsort ?? true,
                            findAllMatches: params.fuseOpts.findallmatches ?? false,
                            keys: params.fuseOpts.keys ?? ['title', 'permalink', 'summary', 'content'],
                            location: params.fuseOpts.location ?? 0,
                            threshold: params.fuseOpts.threshold ?? 0.4,
                            distance: params.fuseOpts.distance ?? 100,
                            ignoreLocation: params.fuseOpts.ignorelocation ?? true
                        }
                    }
                    console.log('Fuse.js search initialized');
                    fuse = new Fuse(data, options); // build the index from the json file
                }
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.open('GET', "../index.json");
    xhr.send();
}

function reset() {
    resultsAvailable = false;
    resList.innerHTML = sInput.value = ''; // clear inputbox and searchResults
    sInput.focus(); // shift focus to input box
}

function search() {
    if (fuse) {
        // Run a search query (for "term") every time a letter is typed
        // in the search box
        let results;
        if (params.fuseOpts) {
            results = fuse.search(sInput.value.trim(), {limit: params.fuseOpts.limit}); // the actual query being run using fuse.js along with options
        } else {
            results = fuse.search(sInput.value.trim()); // the actual query being run using fuse.js
        }
        if (results.length !== 0) {
            // build our html if result exists
            let resultSet = ''; // our results bucket

            for (let item in results) {
                resultSet += makeResult(results[item]);
            }

            resList.innerHTML = resultSet;
            resultsAvailable = true;
            resList.hidden = false;
        } else {
            resultsAvailable = false;
            resList.hidden = true;
            resList.innerHTML = '';
        }
    } else {
        console.warn('Fuse not initialized');
    }
}

// execute search as each character is typed
sInput.onkeyup = function (_e) {
    search();
}