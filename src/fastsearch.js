const params = {
    fuseOpts: {},
    cx: 'f388e696a33d54890'
};

import Fuse from 'fuse.js';

let fuse;
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let sButton = document.getElementById('searchButton');

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

// TODO: search suggestions

export function search() {
    console.log('Searching...');
    resList.hidden = false;
    resList.innerHTML = `<div role="status">
            <span class="sr-only">Searching ...</span>
        </div>`;
    if (sInput.value !== '') {
        let query = "https://customsearch.googleapis.com/customsearch/v1?";
        query += "cx=" + params.cx;
        query += "&q=" + sInput.value;
        query += "&key=AIzaSyC6y55s4OqQkyT4tp_ePjKShK7s3hRWGKc";
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (event) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    resList.innerHTML = '';
                    let res;
                    for (res of data.items) {
                        console.log(res);
                        let resItem = document.createElement('a');
                        resItem.classList.add('block', 'w-full', 'px-4', 'py-2', 'border-b', 'cursor-pointer', 'text-black', 'dark:text-white', 'hover:text-black', 'hover:dark:text-white', 'hover:bg-slate-600');
                        resItem.href = res.link;
                        resItem.ariaLabel = res.title;
                        let resTitle = document.createElement('div');
                        resTitle.innerHTML = `<h3 class="text-lg font-semibold">${res.htmlTitle}</h3>`;
                        let resSummary = document.createElement('div');
                        resSummary.classList.add('text-sm', 'font-normal');
                        resSummary.innerHTML = `<p class="hover:text-black dark:hover:text-white">${res.htmlSnippet}</p>`;
                        resItem.appendChild(resTitle);
                        resItem.appendChild(resSummary);
                        resList.appendChild(resItem);
                    }
                }
            }
        }
        xhr.open('GET', query);
        xhr.send();
    }
}

// execute search on enter key
sInput.onkeydown = function (e) {
    if (e.key === 'Enter') {
        search();
    }
}

// execute search when the search button is clicked
sButton.onclick = function () {
    search();
};
