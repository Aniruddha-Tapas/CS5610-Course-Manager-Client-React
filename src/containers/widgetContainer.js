import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/index'

const dispatchToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) =>
        actions.headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) =>
        actions.headingSizeChanged(dispatch, widgetId, newSize),
    widgetNameChanged: (widgetId, newName) =>
        actions.widgetNameChanged(dispatch, widgetId, newName),
    paragraphTextChanged: (widgetId, newText) =>
        actions.paragraphTextChanged(dispatch, widgetId, newText),
    imageSrcChanged: (widgetId, newSrc) =>
        actions.imageSrcChanged(dispatch, widgetId, newSrc),
    listTextChanged: (widgetId, newList) =>
        actions.listTextChanged(dispatch, widgetId, newList),
    listTypeChanged: (widgetId, newListType) =>
        actions.listTypeChanged(dispatch, widgetId, newListType),
    linkHrefChanged: (widgetId, newHref) =>
        actions.linkHrefChanged(dispatch, widgetId, newHref),
    linkTextChanged: (widgetId, newLinkText) =>
        actions.linkTextChanged(dispatch, widgetId, newLinkText),
    deleteWidget: (widgetId, orderNumber) =>
        actions.deleteWidget(dispatch, widgetId, orderNumber),
    selectWidgetType: (widgetId, widgetType) =>
        actions.selectWidgetType(dispatch, widgetId, widgetType),
    orderDecrease: (widgetOrder) => {
        actions.orderDecrease(dispatch, widgetOrder);
        actions.widgetSortByOrder(dispatch)
    },
    orderIncrease: (widgetOrder) => {
        actions.orderIncrease(dispatch, widgetOrder);
        actions.widgetSortByOrder(dispatch)
    }
});

const stateToPropsMapper = state => ({
    preview: state.preview
});

const Heading = ({widget, preview, headingTextChanged, headingSizeChanged, widgetNameChanged}) => {
    let selectElem;
    let inputElem;
    let inputElem2;
    return (
        <div>
            <div hidden={preview}>
                <div className="row">
                    <form className="form-inline w-100">
                        <label htmlFor="heading">Enter Heading Text:</label>
                        &nbsp;
                        <input onChange={() => headingTextChanged(widget.id, inputElem.value)}
                               value={widget.text}
                               id="heading"
                               className="form-control"
                               placeholder="Heading Text"
                               style={{width: '80%'}}
                               ref={node => inputElem = node}/>
                    </form>
                </div>
                <br/>
                <div className="row">
                    <label>Select Heading Size:</label>
                    &nbsp;
                    <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                            value={widget.size}
                            className="dropdown"
                            style={{width: '80%'}}
                            ref={node => selectElem = node}>
                        <option className="dropdown-item" value="1">Heading 1</option>
                        <option className="dropdown-item" value="2">Heading 2</option>
                        <option className="dropdown-item" value="3">Heading 3</option>
                    </select>
                </div>
                <br/>
                <div className="row">
                    <form className="form-inline w-100">
                        <label htmlFor="widgetName">Enter Widget Name:</label>
                        &nbsp;
                        <input onChange={() => widgetNameChanged(widget.id, inputElem2.value)}
                               value={widget.name}
                               id="widgetName"
                               className="form-control"
                               placeholder="Widget Name (Optional)"
                               style={{width: '80%'}}
                               ref={node => inputElem2 = node}/>
                    </form>
                </div>
                <br/>
                <div className="row">
                    <h4>Preview</h4>
                </div>
            </div>
            <div className="row">
                {widget.size == '1' && <h1>{widget.text}</h1>}
                {widget.size == '2' && <h2>{widget.text}</h2>}
                {widget.size == '3' && <h3>{widget.text}</h3>}
            </div>
        </div>
    )
};

const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading);

//-----------------------------------------------------------------------------------------------------


const Paragraph = ({widget, preview, paragraphTextChanged, widgetNameChanged}) => {
    let inputElem;
    let inputElem2;
    return (
        <div>
            <div hidden={preview}>
                <div className="row">
                    <form className="form-inline w-100">
                        <label htmlFor="paragraph">Enter Text:</label>
                        &nbsp;
                        <textarea onChange={() => paragraphTextChanged(widget.id, inputElem.value)}
                                  value={widget.text}
                                  id="paragraph"
                                  className="form-control w-100"
                                  placeholder="Lorem ipsum"
                                  ref={node => inputElem = node}/>
                    </form>
                </div>
                <br/>
                <div className="row">
                    <form className="form-inline w-100">
                        <label htmlFor="widgetName1">Enter Widget Name:</label>
                        &nbsp;
                        <input onChange={() => widgetNameChanged(widget.id, inputElem2.value)}
                               value={widget.name}
                               id="widgetName1"
                               className="form-control"
                               placeholder="Widget Name (Optional)"
                               style={{width: '81.5%'}}
                               ref={node => inputElem2 = node}/>
                    </form>
                </div>

                <br/>
                <div className="row">
                    <h4>Preview</h4>
                </div>
            </div>
            <div className="row">
                {widget.text}
            </div>
        </div>
    )
};

const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph);


//-----------------------------------------------------------------------------------------------------


const Image = ({widget, preview, imageSrcChanged, widgetNameChanged}) => {
    let inputElem;
    let inputElem2;
    return (
        <div>
            <div hidden={preview}>

                <div className="row">
                    <form className="form-inline w-100">
                        <label htmlFor="src">Enter Image Source:</label>
                        &nbsp;
                        <input onChange={() => imageSrcChanged(widget.id, inputElem.value)}
                               value={widget.src}
                               id="src"
                               className="form-control"
                               style={{width: '80%'}}
                               placeholder="Enter Image Address"
                               ref={node => inputElem = node}/>
                    </form>
                </div>
                <br/>
                <div className="row">
                    <form className="form-inline w-100">
                        <label htmlFor="widgetName2">Enter Widget Name:</label>
                        &nbsp;
                        <input onChange={() => widgetNameChanged(widget.id, inputElem2.value)}
                               value={widget.name}
                               id="widgetName2"
                               className="form-control"
                               placeholder="Widget Name (Optional)"
                               style={{width: '80%'}}
                               ref={node => inputElem2 = node}/>
                    </form>
                </div>
                <br/>
                <div className="row">
                    <h4>Preview</h4>
                </div>
            </div>
            <div className="row">
                <img src={widget.src}/>
            </div>
        </div>
    )
};

const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image);

//-----------------------------------------------------------------------------------------------------


const List = ({widget, preview, listTextChanged, listTypeChanged, widgetNameChanged}) => {
    let inputElem;
    let inputElem2;
    let selectElem;

    const listmaker = (text) => {
        var lines = text.split('\n');
        console.log(lines);
        return lines.map(function (line) {
            return (
                <li key={line}> {line} </li>
            )
        });
    };

    return (
        <div>
            <div hidden={preview}>
                <div className="row">
                    <form className="form-inline w-100">
                        <label htmlFor="list">Enter List Items:</label>
                        &nbsp;
                        <textarea onChange={() => listTextChanged(widget.id, inputElem.value)}
                                  value={widget.text}
                                  id="list"
                                  className="form-control w-100"
                                  placeholder="Put each of them in seperate row"
                                  ref={node => inputElem = node}/>
                    </form>
                </div>
                <br/>

                <div className="row">
                    <label>Select List Type:</label>
                    &nbsp;
                    <select onChange={() => listTypeChanged(widget.id, selectElem.value)}
                            value={widget.listType}
                            className="dropdown"
                            style={{width: '84.5%'}}
                            ref={node => selectElem = node}>
                        <option className="dropdown-item" value="ordered">Orderered List</option>
                        <option className="dropdown-item" value="unordered">Unorderered List</option>
                    </select>
                </div>
                <br/>
                <div className="row">
                    <form className="form-inline w-100">
                        <label htmlFor="widgetName3">Enter Widget Name:</label>
                        &nbsp;
                        <input onChange={() => widgetNameChanged(widget.id, inputElem2.value)}
                               value={widget.name}
                               id="widgetName3"
                               className="form-control"
                               placeholder="Widget Name (Optional)"
                               style={{width: '81.5%'}}
                               ref={node => inputElem2 = node}/>
                    </form>
                </div>
                <br/>
                <div className="row">
                    <h4>Preview</h4>
                </div>
            </div>
            <div className="row">
                {widget.listType == "ordered" && <ol>{listmaker(widget.text.replace(/\r?\n/g, '\n'))}</ol>}
                {widget.listType == "unordered" && <ul>{listmaker(widget.text.replace(/\r?\n/g, '\n'))}</ul>}
            </div>
        </div>
    )
};

const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List);


//-----------------------------------------------------------------------------------------------------

const Link = ({widget, preview, linkHrefChanged, linkTextChanged, widgetNameChanged}) => {
    let inputElem;
    let inputElem2;
    let inputElem3;
    return (
        <div>
            <div hidden={preview}>
                <div className="row">
                    <form className="form-inline w-100">
                        <label htmlFor="url">Enter Link Url:</label>
                        &nbsp;
                        <input onChange={() => linkHrefChanged(widget.id, inputElem.value)}
                               value={widget.src}
                               id="url"
                               className="form-control"
                               placeholder="Enter URL (along with 'https://')"
                               style={{width: '85%'}}
                               ref={node => inputElem = node}/>
                    </form>
                </div>
                <br/>

                <div className="row">
                    <form className="form-inline w-100">
                        <label htmlFor="linkText">Enter Link Text:</label>
                        &nbsp;
                        <input onChange={() => linkTextChanged(widget.id, inputElem2.value)}
                               value={widget.src}
                               id="linkText"
                               className="form-control"
                               placeholder="Enter Anchor Text"
                               style={{width: '84%'}}
                               ref={node => inputElem2 = node}/>
                    </form>
                </div>
                <br/>
                <div className="row">
                    <form className="form-inline w-100">
                        <label htmlFor="widgetName3">Enter Widget Name:</label>
                        &nbsp;
                        <input onChange={() => widgetNameChanged(widget.id, inputElem2.value)}
                               value={widget.name}
                               id="widgetName3"
                               className="form-control"
                               placeholder="Widget Name (Optional)"
                               style={{width: '80%'}}
                               ref={node => inputElem3 = node}/>
                    </form>
                </div>
                <br/>
                <div className="row">
                    <h4>Preview</h4>
                </div>
            </div>
            <div className="row">
                <a href={widget.href} target="_blank"><b>{widget.text}</b></a>
            </div>
        </div>
    )
};

const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link);

//-----------------------------------------------------------------------------------------------------

const WidgetContainer = ({widget, preview, length, dispatch, selectWidgetType, deleteWidget, orderDecrease, orderIncrease}) => {
    let selectElement;
    return (
        <li className="list-group-item m-2 text-dark">

            <div hidden={preview} className="container-fluid mb-2">
                <div className="row clearfix">

                    <span className="navbar-brand" style={{width: '60%'}}>{widget.widgetType} Widget</span>

                    <button onClick={() => orderDecrease(widget.orderNumber)}
                            style={{width: '5%'}}
                            className="btn btn-warning fa fa-arrow-up float-right mx-2"
                            hidden={widget.orderNumber === 1}/>
                    <button onClick={() => orderIncrease(widget.orderNumber)}
                            style={{width: '5%'}}
                            className="btn btn-warning fa fa-arrow-down float-right"
                            hidden={widget.orderNumber === length}/>


                    <select value={widget.widgetType}
                            style={{width: '15%'}}
                            onChange={() => selectWidgetType(widget.id, selectElement.value)}
                            className="float-right dropdown mx-2"
                            ref={node => selectElement = node}>
                        <option className="dropdown-item">Heading</option>
                        <option className="dropdown-item">Paragraph</option>
                        <option className="dropdown-item">List</option>
                        <option className="dropdown-item">Image</option>
                        <option className="dropdown-item">Link</option>
                    </select>

                    <button onClick={() => deleteWidget(widget.id, widget.orderNumber)}
                            style={{width: '5%'}}
                            className="btn btn-danger fa fa-times float-right"/>


                </div>

            </div>
            <div className="container-fluid">
                {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType === 'List' && <ListContainer widget={widget}/>}
                {widget.widgetType === 'Image' && <ImageContainer widget={widget}/>}
                {widget.widgetType === 'Link' && <LinkContainer widget={widget}/>}
            </div>
        </li>
    )
};

const WidgetContainerConnect = connect(stateToPropsMapper, dispatchToPropsMapper)(WidgetContainer);

export default WidgetContainerConnect