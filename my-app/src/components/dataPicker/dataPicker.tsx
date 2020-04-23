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

const DataPicker: FC<IDatePicker> = (props) => {
    const {actionChange, selectedDate, invalid, disabled, label, format, placeholder} = props;

    const [changeValue, setChangeValue] = React.useState<string>(selectedDate
        ? moment(selectedDate).format(format)
        : ''
    );
    const [isInvalid, setIsInvalid] = React.useState<boolean>(invalid);
    const toDay = new Date();

    const handleChangeRaw = (event: any) => {
        let dateStr = event.target.value;

        // валидация.
        if (moment(dateStr, format, true).isValid()) {
            setIsInvalid(false);
        } else {
            setIsInvalid(true);
        }

        setChangeValue(dateStr);
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

    return (
        <Fragment>
            {label && label.trim() && <span className="label">{label}</span>}

            <DatePicker
                selected={selectedDate}
                value={selectedDate && !isInvalid ? moment(selectedDate).format(format) : changeValue}
                onChange={(date , event) => actionChange(date, event)}
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

export default DataPicker;