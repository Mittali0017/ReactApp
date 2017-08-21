import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppMenuItems from './data/AppMenuItems.js';
/*import BottomToolbar from './components/BottomToolbar.js';
import Circle from './components/Circle.js';*/
import {CIRCLE_ID_PREFIX} from './components/Circle.js';
import CircleMenuItems from './data/CircleMenuItems.js';
import CircleOps from './util/CircleOps.js';
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


//</editor-fold>

export class App extends Component {

    //<editor-fold desc="Constructor">
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
    //</editor-fold>

    //<editor-fold desc="Raycast">
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

    onMouseOut(ray) {
        var circle = ray.intersectsId(CIRCLE_ID_PREFIX);

        if (circle) {
            // circle mouse over
            this.setState({
                hoveredCircleIndex: -1
            });
        }
    }

    onMouseDown(ray) {
        var self = this;

        if (!ray.intersects(canvasNode)) {
            return;
        }

        this.setState({
            mouseIsDown: true,
            mousePosition: ray.position
        }, function() {
            if (ray.e.altKey) {
                if (ray.e.shiftKey) {
                    self.executeCommand('clear'); // Alt + Shift + click = clear
                } else if (ray.intersects(canvasNode)) {
                    self.executeCommand('new-circle'); // Alt + click = new circle
                }
            }
        });
    }

    onMouseUp() {
        this.setState({
            mouseIsDown: false
        });
    }

    onMouseMove(ray) {
        var self = this;

        if (!ray.e.altKey || !this.state.mouseIsDown || !ray.intersects(canvasNode)) {
            return;
        }

        this.setState({
            mousePosition: ray.position
        }, function() {
            self.executeCommand('new-circle'); // Alt + mouse move = new circle
        });
    }

    onMouseDownInsideOrOutside() {
        this.setState({
            openOnMouseOver: false
        });
    }

    onMouseUpInside() {
        this.setState({
            openOnMouseOver: false
        });
    }

    /**
     * Fires on contextmenu or tap-and-hold outside of the current menu
     * @param ray Ray
     */
    onContextMenuOutside(ray) {
        var target = ray.target;

        this.setState({
            openOnMouseOver: true
        });

        if (ray.intersects(rootNode)) {
            // cancel default on the app root (not the web page - GitHub link must work)
            ray.preventDefault();
        }

        if (!ray.intersects(canvasNode)) {
            return; // we're interested only in canvas clicks
        }

        // cancel default menu on canvas
        ray.preventDefault();

        if (isCircle(target)) {
            // circle clicked
            this.selectCircle(target);
            this.showContextMenu(ray, this.circleContextMenuItems);
        } else {
            // canvas clicked
            this.setState({
                selectedCircleIndex: -1
            });
            this.showContextMenu(ray, this.appContextMenuItems);
        }
    }

    /**
     * Fires on menu close
     * We would accomplish the same effect by subscribing to dispatched directly, instead of the Menu
     */
    onMenuClose() {
        this.setState({
            contextMenuVisible: false,
            selectedCircleIndex: -1
        });
    }
    //</editor-fold>

    //<editor-fold desc="Show context menu">
    showContextMenu(ray, items) {
        this.setState({
            contextMenuVisible: true,
            menuPosition: ray.position,
            items
        });
    }
    //</editor-fold>

    //<editor-fold desc="Circles & commands">
    selectCircle(circleElement) {
        this.state.selectedCircleIndex = getCircleId(circleElement);
    }

    executeCommand(command) {
        var position = this.state.mouseIsDown ?
            this.state.mousePosition :
            this.state.menuPosition,

            circles = CircleOps.executeCommand(command, this.state.circles, this.state.selectedCircleIndex, position);

        this.setState({circles});
    }
    //</editor-fold>

    //<editor-fold desc="React">
    render() {
        var self = this,
            index = 0,
            commonToolbarProps = {
                openOnMouseOver: this.state.openOnMouseOver,
                renderers: {
                    'link': LinkRenderer
                },
                onOpen() {
                    self.setState({
                        // let's have the Mac-like behaviour
                        // once the first drop-down was opened by clicking, consequent drop-downs open on mouse-over
                        openOnMouseOver: true
                    });
                }
            },
            
            menu = this.state.contextMenuVisible ? (
                <Menu items={this.state.items}
                      position={this.state.menuPosition}
                      onClose={this.onMenuClose} />
            ) : null;

        return (
            <div ref='root'>
                <TopToolbar {...commonToolbarProps} />
              {menu}
             
            </div>
        );
    }

    componentDidMount() {
        var self = this;

        function binder() {
            return self.executeCommand.bind(self, ...arguments);
        }
        
        this.appContextMenuItems = new AppMenuItems(binder);

        rootNode = ReactDOM.findDOMNode(this.refs.root);
        canvasNode = ReactDOM.findDOMNode(this.refs.canvas);
    }
    //</editor-fold>
}