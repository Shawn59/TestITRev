import React, {FC, Fragment, ReactChildren} from "react";
import "./style.css";
import iconClosed from "../../images/closed.svg";

interface IModalWindow {
    contentChildren?: any,
    footerChildren?: any,
    title?: string
}

const ModalWindow: FC<IModalWindow> = (props) => {
    const {contentChildren, footerChildren, title = 'Какой-то заголовок'} = props;
    const [isOpen, setIsOpen] = React.useState(false);

    const closed = () => {
        setIsOpen(false);
    };

    return (
        <Fragment>
            {isOpen &&
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