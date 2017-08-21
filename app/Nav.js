import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppMenuItems from './data/AppMenuItems.js';
import BottomToolbar from './components/BottomToolbar.js';
import Circle from './components/Circle.js';
import {CIRCLE_ID_PREFIX} from './components/Circle.js';
/*import CircleMenuItems from './data/CircleMenuItems.js';
import CircleOps from './util/CircleOps.js';*/
import LinkRenderer from './renderers/LinkRenderer.js';
import Menu from './components/Menu.js';
import MenuEmitter from './emitters/MenuEmitter.js';
import Svg from './components/Svg.js';
import TextRotator from './components/TextRotator.js';
import TopToolbar from './components/TopToolbar.js';


var Emitter = require('raycast-dom').Emitter.default;


require('./styles/main.less');
require('./styles/menu.less');

var rootNode, canvasNode;

export class Nav extends Component {
	 constructor(props) {
        super(props);

        this.state = {
            contextMenuVisible: false,
            openOnMouseOver: true // if true, drop-down menu will open on mouse over
           
        };

        this.onMenuClose = this.onMenuClose.bind(this);
        this.onMouseDownInsideOrOutside = this.onMouseDownInsideOrOutside.bind(this);
        this.onContextMenuOutside = this.onContextMenuOutside.bind(this);
        this.executeCommand = this.executeCommand.bind(this);

       
    }

     onMouseOver(ray) {
        var circle = ray.intersectsId(CIRCLE_ID_PREFIX),
            circleId, circleIndex;

        if (circle) {
            // circle mouse over
            circleId = circle.id;
            circleIndex = parseInt(circleId.split(CIRCLE_ID_PREFIX)[1]);
            this.setState({
                hoveredCircleIndex: circleIndex
            });
        }
    }