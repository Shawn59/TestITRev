import React, {FC, Fragment} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "./style.css";

export interface IDatePicker {
    actionChange: Function,
    selectedDate?: Date,
    invalid: boolean,
    disabled: boolean,
    label?: string,
    format: string,
    placeholder: string
}

const MyDatePicker: FC<IDatePicker> = (props) => {
    const {actionChange, selectedDate, invalid, disabled, label, format, placeholder} = props;

    const [changeValue, setChangeValue] = React.useState<string>(selectedDate
        ? moment(selectedDate).format(format)
        : ''
    );
    const [isInvalid, setIsInvalid] = React.useState<boolean>(invalid);
    const toDay = new Date();

    const checkValidDateFormat = (dateStr: string) => {
        return moment(dateStr, format, true).isValid();
    };

    const handleChangeRaw = (event: any) => {
        if (event) {
            let dateStr = event.target.value;
            setIsInvalid(!checkValidDateFormat(dateStr));
            setChangeValue(dateStr);
        }
    };

    // у momentjs и Date разные форматы
    const getConvertFormatForDate = (format: string) => {
        switch (format) {
            case 'DD.MM.YYYY': {
                return 'dd.MM.yyyy';
                break;
            }
        }
    };

    const handleChange = (date: Date|null, event: any) => {
        let isValid = checkValidDateFormat(event.target.value) || event.target.value === undefined;
        if (date && event && isValid) {
            setIsInvalid(!isValid);
            actionChange(date, event);
        }
    };

    return (
        <Fragment>
            {label && label.trim() && <span className="label">{label}</span>}

            <DatePicker
                selected={selectedDate}
                value={selectedDate && !isInvalid ? moment(selectedDate).format(format) : changeValue}
                onChange={(date , event) => handleChange(date, event)}
                placeholderText={placeholder}
                dateFormat={getConvertFormatForDate(format)}
                disabled={disabled}
                className={isInvalid ? "error-style_input" : ""}
                onChangeRaw={(event) => handleChangeRaw(event)}
            >
                <div className="today_block">
                    <span>{'Сегодня ' + toDay.toLocaleDateString()}</span>
                </div>
            </DatePicker>
        </Fragment>
    );
};

export default MyDatePicker;