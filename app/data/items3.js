export const items3 = [{
    title: 'Sub Menu 3'
}, '-', {
    title: 'Item 1-2',
    items: [{
        title: 'Item 2-1',
        callback(e) {
            console.log('*** Item 2-1 clicked', e);
        }
    },
    {
        title: 'Item 2-2',
        callback(e) {
            console.log('*** Item 2-2 clicked', e);
        }
    }, 
    {
        title: 'Item 2-3',
        callback(e) {
            console.log('*** Item 2-3 clicked', e);
        }
    }]
    
    }];