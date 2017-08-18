export const items5 = [{
    title: 'Sub Menu 5'
}, '-', {
    title: 'Item 5',
    items: [{
        title: 'Item 5-1',
        callback(e) {
            console.log('*** Item 5-1 clicked', e);
        }
    }, {
        title: 'Item 5-2',
        callback(e) {
            console.log('*** Item 2-2 clicked', e);
        }
    
    }]
}];