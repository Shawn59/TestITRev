import React, {FC, Fragment} from "react";
import ModalWindow from "../modalWindow/modalWindow";

interface IModalWindow {
    contentChildren?: any,
    footerChildren?: any,
    title?: string,
    open: boolean,
    actionClosed: any,
    walkingRecord: object
}

const ModalWalkingTable: FC<IModalWindow> = (props) => {
    return(
        <ModalWindow
            open={props.open}
            actionClosed={props.actionClosed}
            contentChildren={
                <Fragment>
                    <div className="modal-row">
                        <span>Дата</span>
                        <input type="date"/>
                    </div>
                    <div className="modal-row">
                        <span>Дистанция</span>
                        <input type="number"/>
                    </div>
                </Fragment>
            }

            footerChildren={
                <Fragment>
                    <button>Добавить</button>
                </Fragment>
            }
        />
    );
};

export default ModalWalkingTable;