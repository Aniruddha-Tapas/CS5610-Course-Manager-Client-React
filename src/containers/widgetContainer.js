import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/index'

const stateToPropsMapper = state => ({
    preview: state.preview
});

const dispatchToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) =>
        actions.headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) =>
        actions.headingSizeChanged(dispatch, widgetId, newSize),
    widgetNameChanged: (widgetId, newName) =>
        actions.widgetNameChanged(dispatch, widgetId, newName),
    paragraphTextChanged: (widgetId, newText) =>
        actions.paragraphTextChanged(dispatch, widgetId, newText),
    listTextChanged: (widgetId, newList) =>
        actions.listTextChanged(dispatch, widgetId, newList),
    listTypeChanged: (widgetId, newListType) =>
        actions.listTypeChanged(dispatch, widgetId, newListType),
    imageSrcChanged: (widgetId, newSrc) =>
        actions.imageSrcChanged(dispatch, widgetId, newSrc),
    linkHrefChanged: (widgetId, newHref) =>
        actions.linkHrefChanged(dispatch, widgetId, newHref),
    linkTextChanged: (widgetId, newLinkText) =>
        actions.linkTextChanged(dispatch, widgetId, newLinkText),
    selectWidgetType: (widgetId, widgetType) =>
        actions.selectWidgetType(dispatch, widgetId, widgetType),
    deleteWidget: (widgetId, orderNumber) =>
        actions.deleteWidget(dispatch, widgetId, orderNumber),
    orderIncrease: (widgetOrder) => {
        actions.orderIncrease(dispatch, widgetOrder);
        actions.widgetSortByOrder(dispatch)
    },
    orderDecrease: (widgetOrder) => {
        actions.orderDecrease(dispatch, widgetOrder);
        actions.widgetSortByOrder(dispatch)
    }
});


// HEADING WIDGET
const Heading = ({widget, preview, headingTextChanged, headingSizeChanged, widgetNameChanged}) => {
    let selectElement;
    let inputFld;
    let inputFld2;
    return (
        <div>
            <div hidden={preview}>
                <div className="row  w-100">
                    <form className="row form-inline w-100">
                        <div className="col-3">
                            <label className="float-left" htmlFor="heading">Enter Heading Text:</label>
                        </div>
                        <div className="col-9">
                            <input onChange={() => headingTextChanged(widget.id, inputFld.value)}
                                   value={widget.text}
                                   id="heading"
                                   className="form-control w-100"
                                   placeholder="Heading Text"
                                   ref={node => inputFld = node}/>
                        </div>
                    </form>
                </div>
                <br/>
                <div className="row w-100">
                    <form className="row form-inline w-100">
                        <div className="col-3">
                            <label className="float-left" htmlFor="headingSize">Select Heading Size:</label>
                        </div>
                        <div className="col-9">
                            <select onChange={() => headingSizeChanged(widget.id, selectElement.value)}
                                    id="headingSize"
                                    value={widget.size}
                                    className="dropdown  w-100"
                                    ref={node => selectElement = node}>
                                <option className="dropdown-item" value="1">Heading 1</option>
                                <option className="dropdown-item" value="2">Heading 2</option>
                                <option className="dropdown-item" value="3">Heading 3</option>
                            </select>
                        </div>
                    </form>
                </div>
                <br/>
                <div className="row w-100">
                    <form className="row form-inline w-100">
                        <div className="col-3">
                            <label className="float-left" htmlFor="widgetName">Enter Widget Name:</label>
                        </div>
                        <div className="col-9">
                            <input onChange={() => widgetNameChanged(widget.id, inputFld2.value)}
                                   value={widget.name}
                                   id="widgetName"
                                   className="form-control w-100"
                                   placeholder="Widget Name (Optional)"
                                   ref={node => inputFld2 = node}/>
                        </div>
                    </form>
                </div>
                <br/>
                <div className="row">
                    <h4>Preview</h4>
                </div>
            </div>
            <div className="row">
                {widget.size === '1' && <h1>{widget.text}</h1>}
                {widget.size === '2' && <h2>{widget.text}</h2>}
                {widget.size === '3' && <h3>{widget.text}</h3>}
            </div>
        </div>
    )
};

const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading);


// PARAGRAPH WIDGET
const Paragraph = ({widget, preview, paragraphTextChanged, widgetNameChanged}) => {
    let inputFld;
    let inputFld2;
    return (
        <div>
            <div hidden={preview}>
                <div className="row">
                    <form className="form-inline w-100">
                        <label htmlFor="paragraph">Enter Text:</label>
                        <textarea onChange={() => paragraphTextChanged(widget.id, inputFld.value)}
                                  value={widget.text}
                                  id="paragraph"
                                  className="form-control w-100"
                                  placeholder="Lorem ipsum"
                                  ref={node => inputFld = node}/>
                    </form>
                </div>
                <br/>
                <div className="row w-100">
                    <form className="row form-inline w-100">
                        <div className="col-3">
                            <label className="float-left" htmlFor="widgetName1">Enter Widget Name:</label>
                        </div>

                        <div className="col-9">
                            <input onChange={() => widgetNameChanged(widget.id, inputFld2.value)}
                                   value={widget.name}
                                   id="widgetName1"
                                   className="form-control w-100"
                                   placeholder="Widget Name (Optional)"
                                   ref={node => inputFld2 = node}/>
                        </div>
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


// LIST WIDGET
const List = ({widget, preview, listTextChanged, listTypeChanged, widgetNameChanged}) => {
    let inputFld;
    let inputFld2;
    let selectElement;

    const listMaker = (text) => {
        var lines = text.split('\n');
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
                        <textarea onChange={() => listTextChanged(widget.id, inputFld.value)}
                                  value={widget.text}
                                  id="list"
                                  className="form-control w-100"
                                  placeholder="Put each of them in seperate row"
                                  ref={node => inputFld = node}/>
                    </form>
                </div>
                <br/>

                <div className="row w-100">
                    <form className="row form-inline w-100">
                        <div className="col-3">
                            <label className="float-left" htmlFor="listTypeId">Select List Type:</label>
                        </div>
                        <div className="col-9">
                            <select onChange={() => listTypeChanged(widget.id, selectElement.value)}
                                    id="listTypeId"
                                    value={widget.listType}
                                    className="dropdown w-100"
                                    ref={node => selectElement = node}>
                                <option className="dropdown-item" value="unordered">Unorderered List</option>
                                <option className="dropdown-item" value="ordered">Orderered List</option>
                            </select>
                        </div>
                    </form>
                </div>
                <br/>
                <div className="row w-100">
                    <form className="row form-inline w-100">
                        <div className="col-3">
                            <label className="float-left" htmlFor="widgetName3">Enter Widget Name:</label>
                        </div>
                        <div className="col-9">
                            <input onChange={() => widgetNameChanged(widget.id, inputFld2.value)}
                                   value={widget.name}
                                   id="widgetName3"
                                   className="form-control w-100"
                                   placeholder="Widget Name (Optional)"
                                   ref={node => inputFld2 = node}/>
                        </div>
                    </form>
                </div>
                <br/>
                <div className="row">
                    <h4>Preview</h4>
                </div>
            </div>
            <div className="row">
                {widget.listType === "ordered" && <ol>{listMaker(widget.text.replace(/\r?\n/g, '\n'))}</ol>}
                {widget.listType === "unordered" && <ul>{listMaker(widget.text.replace(/\r?\n/g, '\n'))}</ul>}
            </div>
        </div>
    )
};

const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List);


// IMAGE WIDGET
const Image = ({widget, preview, imageSrcChanged, widgetNameChanged}) => {
    let inputFld;
    let inputFld2;
    return (
        <div>
            <div hidden={preview}>
                <div className="row w-100">
                    <form className="row form-inline w-100">
                        <div className="col-3">
                            <label className="float-left" htmlFor="src">Enter Image Source:</label>
                        </div>
                        <div className="col-9">
                            <input onChange={() => imageSrcChanged(widget.id, inputFld.value)}
                                   value={widget.src}
                                   id="src"
                                   className="form-control w-100"
                                   placeholder="Enter Image Address"
                                   ref={node => inputFld = node}/>
                        </div>
                    </form>
                </div>
                <br/>
                <div className="row w-100">
                    <form className="row form-inline w-100">
                        <div className="col-3">
                            <label className="float-left" htmlFor="widgetName2">Enter Widget Name:</label>
                        </div>
                        <div className="col-9">
                            <input onChange={() => widgetNameChanged(widget.id, inputFld2.value)}
                                   value={widget.name}
                                   id="widgetName2"
                                   className="form-control  w-100"
                                   placeholder="Widget Name (Optional)"
                                   ref={node => inputFld2 = node}/>
                        </div>
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


// LINK WIDGET
const Link = ({widget, preview, linkHrefChanged, linkTextChanged, widgetNameChanged}) => {
    let inputFld;
    let inputFld2;
    let inputFld3;
    return (
        <div>
            <div hidden={preview}>
                <div className="row w-100">
                    <form className="row form-inline w-100">
                        <div className="col-3">
                            <label className="float-left" htmlFor="url">Enter Link Url:</label>
                        </div>
                        <div className="col-9">
                            <input onChange={() => linkHrefChanged(widget.id, inputFld.value)}
                                   value={widget.src}
                                   id="url"
                                   className="form-control w-100"
                                   placeholder="Enter URL (along with 'https://')"
                                   ref={node => inputFld = node}/>
                        </div>
                    </form>
                </div>
                <br/>

                <div className="row w-100">
                    <form className="row form-inline w-100">
                        <div className="col-3">
                            <label className="float-left" htmlFor="linkText">Enter Link Text:</label>
                        </div>
                        <div className="col-9">
                            <input onChange={() => linkTextChanged(widget.id, inputFld2.value)}
                                   value={widget.src}
                                   id="linkText"
                                   className="form-control w-100"
                                   placeholder="Enter Anchor Text"
                                   ref={node => inputFld2 = node}/>
                        </div>
                    </form>
                </div>
                <br/>
                <div className="row w-100">
                    <form className="row form-inline w-100">
                        <div className="col-3">
                            <label className="float-left" htmlFor="widgetName3">Enter Widget Name:</label>
                        </div>
                        <div className="col-9">
                            <input onChange={() => widgetNameChanged(widget.id, inputFld3.value)}
                                   value={widget.name}
                                   id="widgetName3"
                                   className="form-control w-100"
                                   placeholder="Widget Name (Optional)"
                                   ref={node => inputFld3 = node}/>
                        </div>
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



// WIDGET CONTAINER
const WidgetContainer = ({widget, preview, length, dispatch, selectWidgetType, deleteWidget, orderDecrease, orderIncrease}) => {
    let selectElement;
    return (
        <li className="list-group-item m-2 text-dark">

            <div hidden={preview} className="container-fluid mb-2">
                <div className="row clearfix">

                    <span className="navbar-brand" style={{width: '65%'}}>{widget.widgetType} Widget</span>

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