import * as constants from "../constants/index"

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET
    })
);

export const selectWidgetType = (dispatch, widgetId, widgetType) => (
    dispatch({
        type: constants.SELECT_WIDGET_TYPE,
        id: widgetId,
        widgetType: widgetType
    })
);

export const preview = dispatch => (
    dispatch({type: constants.PREVIEW
    })
);

export const save = (dispatch, topicId) => (
    dispatch({
        type: constants.SAVE,
        topicId: topicId
    })
);

export const headingTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
);

export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize
    })
);

export const widgetNameChanged = (dispatch, widgetId, newName) => (
    dispatch({
        type: constants.WIDGET_NAME_CHANGED,
        id: widgetId,
        name: newName
    })
);

export const paragraphTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.PARAGRAPH_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
);

export const listTextChanged = (dispatch, widgetId, newList) => (
    dispatch({
        type: constants.LIST_TEXT_CHANGED,
        id: widgetId,
        text: newList
    })
);

export const listTypeChanged = (dispatch, widgetId, newListType) => (
    dispatch({
        type: constants.LIST_TYPE_CHANGED,
        id: widgetId,
        listType: newListType
    })
);

export const imageSrcChanged = (dispatch, widgetId, newSrc) => (
    dispatch({
        type: constants.IMAGE_SRC_CHANGED,
        id: widgetId,
        src: newSrc
    })
);

export const linkHrefChanged = (dispatch, widgetId, newHref) => (
    dispatch({
        type: constants.LINK_HREF_CHANGED,
        id: widgetId,
        href: newHref
    })
);

export const linkTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.LINK_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
);

export const deleteWidget = (dispatch, widgetId, orderNumber) => (
    dispatch({
        type: constants.DELETE_WIDGET,
        id: widgetId,
        orderNumber: orderNumber
    })
);

export const orderIncrease = (dispatch, widgetOrder) => (
    dispatch({
        type: constants.ORDER_INCREASE,
        orderNumber: widgetOrder
    })
);

export const orderDecrease = (dispatch, widgetOrder) => (
    dispatch({
        type: constants.ORDER_DECREASE,
        orderNumber: widgetOrder
    })
);

export const widgetSortByOrder = (dispatch) => (
    dispatch({
        type: constants.SORT_BY_ORDER
    })
);


export const findAllWidgetsForTopicId = (dispatch, topicId) => {
    fetch('https://cs5610-whiteboard-server-java.herokuapp.com/api/topic/'+topicId+"/widget")
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
};
