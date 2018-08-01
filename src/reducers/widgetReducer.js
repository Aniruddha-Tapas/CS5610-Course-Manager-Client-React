import * as constants from "../constants/index"

export const widgetReducer = (state = {widgets: [], preview: false, length: 0}, action) => {
    let newState;

    switch (action.type) {

        case constants.PREVIEW:
            return {
                widgets: state.widgets,
                preview: !state.preview
            };

        case constants.HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.WIDGET_NAME_CHANGED:
            console.log(action);
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.name = action.name
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.PARAGRAPH_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.text = action.text;
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.IMAGE_SRC_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.src = action.src;
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.LIST_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text;
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.LIST_TYPE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id){
                        widget.listType = action.listType;
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.LINK_HREF_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id){
                        widget.href = action.href;
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.LINK_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id){
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.ORDER_DECREASE:
            return{
                widgets: state.widgets.map(widget => {
                    if(widget.orderNumber === action.orderNumber){
                        widget.orderNumber = (widget.orderNumber - 1);
                    }
                    else if(widget.orderNumber === (action.orderNumber - 1)){
                        widget.orderNumber = (widget.orderNumber + 1);
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.ORDER_INCREASE:
            return{
                widgets: state.widgets.map(widget => {
                    if(widget.orderNumber === action.orderNumber){
                        widget.orderNumber = (widget.orderNumber + 1);
                    }
                    else if(widget.orderNumber === (action.orderNumber + 1)){
                        widget.orderNumber = (widget.orderNumber - 1);
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.SELECT_WIDGET_TYPE:
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if(widget.id === action.id) {
                        widget.widgetType = action.widgetType;

                        if (widget.widgetType === 'List') {
                            widget.listType = "ordered"
                        }
                        if (widget.widgetType === 'Link') {
                            widget.href = "";
                            widget.text = ""
                        }
                    }
                    return true;
                })
            };
            return JSON.parse(JSON.stringify(newState));

        case constants.SAVE:
            fetch('http://localhost:8080/api/topic/'+action.topicId+"/widget", {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'}
            });
            return state;

        case constants.FIND_ALL_WIDGETS:
            newState = Object.assign({}, state);
            newState.widgets = action.widgets;
            return newState;

        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                )).map(widget => {
                    if(widget.orderNumber > action.orderNumber){
                        widget.orderNumber = widget.orderNumber - 1
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.SORT_BY_ORDER:
            newState = Object.assign({}, state);
            newState.widgets = newState.widgets.sort(function(w1, w2) {
                if(w1.orderNumber > w2.orderNumber){
                    return 1;
                }
                else if (w1.orderNumber < w2.orderNumber){
                    return -1;
                }
                return 0;
            });
            return newState;

        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {
                        id: state.widgets.length + 1,
                        orderNumber: state.widgets.length + 1,
                        text: '',
                        widgetType: 'Heading',
                        size: '1',
                        name: ''
                    }
                ]
            };

        default:
            return state
    }
};
