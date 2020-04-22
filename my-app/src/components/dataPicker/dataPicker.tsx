import React, {FC, Fragment} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"

export interface IDatePicker {
    actionChange: Function,
    value?: Date,
    invalid: boolean,
    disabled: boolean,
    label?: string,
    format: string,
    placeholder: string
}

function getToDayString(date: Date) {
    let days = date.getDate();
    let months = date.getMonth() + 1;
    let years = date.getFullYear();

    return (days < 10 ? '0' + days : days) + '.' + (months < 10 ? '0' + months : months) + '.' + years;
}

const dataPicker: FC<IDatePicker> = (props) => {
    const {actionChange, value, invalid, disabled, label, format, placeholder} = props;
    const toDay = new Date();

    const handleBlur = () => {

    };

    return (
        <Fragment>
            {label && label.trim() && <span className="label">{label}</span>}

            <DatePicker
                selected={value}
                onChange={(date , event) => actionChange(date, event)}
                dateFormat={format}
                placeholderText={placeholder}
                disabled={disabled}
                className={invalid ? "error-style_input" : ""}
                onBlur={handleBlur}
            >
                <div className="today_block">
                    <span>{'Сегодня ' + getToDayString(toDay)}</span>
                </div>
            </DatePicker>
        </Fragment>
    );
};

export default dataPicker;