import React, { Component } from 'react';
import DropdownMenu from './DropdownMenu.js';
import { items1 } from './../data/items1.js';
import { items2 } from './../data/items2.js';
import { items3 } from './../data/items3.js';
import { items4 } from './../data/items4.js';
import { items5 } from './../data/items5.js';

export default class TopToolbar extends Component {
    render() {
        return (
            <div className='toolbar'>
                <DropdownMenu items={items1} {...this.props}>
                    <button className='menu-button'><i className="fa fa-list-ul"></i>&nbsp;&nbsp;Dashboard</button>
                </DropdownMenu>
                <DropdownMenu buttonText='Menu 1' items={items2} {...this.props} />
                <DropdownMenu buttonText='Menu 2' items={items2} {...this.props} />
                <DropdownMenu buttonText='Menu 3' items={items3} {...this.props} />
                <DropdownMenu buttonText='Menu 4' items={items4} {...this.props} />
                <DropdownMenu buttonText='Menu 5' items={items5} {...this.props} />
            </div>
        );
    }
}

TopToolbar.propTypes = {
    onOpen: React.PropTypes.func.isRequired,
    openOnMouseOver: React.PropTypes.bool.isRequired,
    renderers: React.PropTypes.object.isRequired
};