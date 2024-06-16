function runFifoSimulation() {
    const pages = document.getElementById('fifo-pages').value.split(',').map(Number);
    const frames = parseInt(document.getElementById('fifo-frames').value);
    const resultDiv = document.getElementById('fifo-result');
    const [pageFaults, details] = FIFO(pages, frames);
    resultDiv.innerHTML = `Page Faults: ${pageFaults}<br>Details:<br>${details.join('<br>')}`;
}

function FIFO(pages, frames) {
    let queue = [];
    let page_faults = 0;
    let details = [];
    for (let page of pages) {
        if (!queue.includes(page)) {
            if (queue.length === frames) {
                queue.shift();
            }
            queue.push(page);
            page_faults++;
            details.push(`Page ${page} caused a fault. Memory: [${queue.join(', ')}]`);
        } else {
            details.push(`Page ${page} did not cause a fault. Memory: [${queue.join(', ')}]`);
        }
    }
    return [page_faults, details];
}

function runLruSimulation() {
    const pages = document.getElementById('lru-pages').value.split(',').map(Number);
    const frames = parseInt(document.getElementById('lru-frames').value);
    const resultDiv = document.getElementById('lru-result');
    const [pageFaults, details] = LRU(pages, frames);
    resultDiv.innerHTML = `Page Faults: ${pageFaults}<br>Details:<br>${details.join('<br>')}`;
}

function LRU(pages, frames) {
    let queue = [];
    let page_faults = 0;
    let details = [];
    for (let page of pages) {
        if (!queue.includes(page)) {
            if (queue.length === frames) {
                queue.shift();
            }
            queue.push(page);
            page_faults++;
            details.push(`Page ${page} caused a fault. Memory: [${queue.join(', ')}]`);
        } else {
            queue.splice(queue.indexOf(page), 1);
            queue.push(page);
            details.push(`Page ${page} did not cause a fault. Memory: [${queue.join(', ')}]`);
        }
    }
    return [page_faults, details];
}

function runOptimalSimulation() {
    const pages = document.getElementById('optimal-pages').value.split(',').map(Number);
    const frames = parseInt(document.getElementById('optimal-frames').value);
    const resultDiv = document.getElementById('optimal-result');
    const [pageFaults, details] = Optimal(pages, frames);
    resultDiv.innerHTML = `Page Faults: ${pageFaults}<br>Details:<br>${details.join('<br>')}`;
}

function Optimal(pages, frames) {
    let queue = [];
    let page_faults = 0;
    let details = [];
    for (let i = 0; i < pages.length; i++) {
        if (!queue.includes(pages[i])) {
            if (queue.length === frames) {
                let farthest_index = -1;
                let farthest_page = -1;
                for (let q of queue) {
                    let index = pages.slice(i + 1).indexOf(q);
                    if (index === -1) {
                        index = Infinity;
                    }
                    if (index > farthest_index) {
                        farthest_index = index;
                        farthest_page = q;
                    }
                }
                queue.splice(queue.indexOf(farthest_page), 1);
            }
            queue.push(pages[i]);
            page_faults++;
            details.push(`Page ${pages[i]} caused a fault. Memory: [${queue.join(', ')}]`);
        } else {
            details.push(`Page ${pages[i]} did not cause a fault. Memory: [${queue.join(', ')}]`);
        }
    }
    return [page_faults, details];
}
