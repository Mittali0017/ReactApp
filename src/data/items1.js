export const items1 = [{
    type: 'label',
    title: 'Home'
}, '-', {
    title: 'Dropdown',
    items: [{
        title: 'Sub Menu 1',
        items: [{
            title: 'Item 1',
            items: [{
                title: 'Item 1-1',
                items: [{
                    title: 'Item 1-1-1'
                   
                }, '-', {
                    title: 'Item 2-1-1'
                }]
            }]
        }, '-', {
            title: 'Item 2'
        }]
    }, '-', {
        title: 'Sub Menu 2'
    }, '-', {
        title: 'Sub Menu 3'
    }, '-', {
        title: 'Sub Menu 4'
    }, '-', {
        title: 'Sub Menu 5'
    }]

}, {
    title: 'Lists',
    items: [{
        title: 'Report 1',
        callback(e) {
            console.log('*** Failure clicked', e);
        }
    }, '-', {
        title: 'Report 2',
        callback(e) {
            console.log('Report 2 clicked' + e);
        }
    }, '-', {
        title: 'Report 3'
    }],
    callback(e) {
        console.log('*** Report 3 clicked', e);
    }
}, {
    title: 'Image'
}, '-', {
    type: 'link',
    title: 'Contact',
    url: 'https://google.com',
    target: '_blank'
}];