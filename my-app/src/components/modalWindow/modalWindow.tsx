import React, {FC, Fragment} from "react";
import "./style.css";
import iconClosed from "../../images/closed.svg";

interface IModalWindow {
    contentChildren?: any,
    footerChildren?: any,
    title?: string,
    open: boolean,
    actionClosed: Function,
}

const ModalWindow: FC<IModalWindow> = (props) => {
    const {contentChildren, footerChildren, title = 'Какой-то заголовок', actionClosed, open} = props;

    const closed = () => {
        actionClosed();
    };

    return (
        <Fragment>
            {open &&
            <div className="modal-wrapper">
                <div className="modal-window">
                    <div className="modal-block">
                        <div className="modal-header">
                            <span>{title}</span>
                            <img className="closed-img" src={iconClosed} onClick={closed}/>
                        </div>

                        <div className="modal-content">
                            {contentChildren}
                        </div>

                        <div className="modal-footer">
                            {footerChildren}
                        </div>
                    </div>
                </div>
            </div>
            }
        </Fragment>
    )
};

export default ModalWindow;