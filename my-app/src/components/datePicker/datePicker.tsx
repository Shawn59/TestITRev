import React, {FC, Fragment} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "./style.css";
import classNames from "classnames";

export interface IDatePickerProps {
    actionChange: Function,
    selectedDate?: Date,
    invalid: boolean,
    disabled: boolean,
    label?: string,
    format: string,
    placeholder?: string
    maxDate?: Date
}

export interface IDatePickerState {
    changeValue: string,
    isInvalid: boolean
}

class MyDatePicker extends React.PureComponent<IDatePickerProps, IDatePickerState> {

    constructor(props: any) {
        super(props);

        this.state = {
            changeValue: (props.selectedDate ? moment(props.selectedDate).format(props.format) : ''),
            isInvalid: props.invalid
        }
    }

    public checkValidDateFormat = (dateStr: string) => {
        return moment(dateStr, this.props.format, true).isValid();
    };

    // у momentjs и Date разные форматы
    public getConvertFormatForDate = (format: string) => {
        switch (format) {
            case 'DD.MM.YYYY': {
                return 'dd.MM.yyyy';
                break;
            }
        }
    };

    private handleChangeRaw = (event: any, maxDate: Date) => {
        if (event) {
            let dateStr = event.target.value;
            let isValid = false;

            if (this.checkValidDateFormat(dateStr)) {
                isValid = (new Date(dateStr)).toTimeString() <=  maxDate.toTimeString();
            }

            this.setState({
                isInvalid: !isValid,
                changeValue: dateStr
            });

            this.props.actionChange(null, event, false);
        }
    };

    private handleChange = (date: Date | null, event: any) => {
        let isValid = this.checkValidDateFormat(event.target.value) || event.target.value === undefined;

        if (date && event && isValid) {
            this.props.actionChange(date, event);

            this.setState({
                isInvalid: !isValid
            });
        }
    };

    render() {
        const {
            selectedDate,
            disabled,
            label,
            format,
            placeholder = '',
            maxDate = moment('12.12.2100').toDate()
        } = this.props;
        const toDay = new Date();

        return (
            <Fragment>
                {label && label.trim() && <span className="label">{label}</span>}

                <DatePicker
                    selected={selectedDate}
                    value={selectedDate && !this.state.isInvalid
                        ? moment(selectedDate).format(format)
                        : this.state.changeValue
                    }
                    onChange={this.handleChange}
                    placeholderText={placeholder}
                    dateFormat={this.getConvertFormatForDate(format)}
                    disabled={disabled}
                    className={this.state.isInvalid ? "error-style_input" : ""}
                    onChangeRaw={(e) => this.handleChangeRaw(e, maxDate)}
                    maxDate={maxDate}
                >
                    <div className="today_block">
                        <span>{'Сегодня ' + toDay.toLocaleDateString()}</span>
                    </div>
                </DatePicker>
            </Fragment>
        )
    }

}

/*const MyDatePicker: FC<IDatePickerProps> = (props) => {
    const {actionChange, selectedDate, invalid, disabled, label, format, placeholder} = props;

    const [changeValue, setChangeValue] = React.useState<string>(selectedDate
        ? moment(selectedDate).format(format)
        : ''
    );
    const [isInvalid, setIsInvalid] = React.useState<boolean>(invalid);


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

    const handleChange = (date: Date | null, event: any) => {
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
                onChange={handleChange}
                placeholderText={placeholder}
                dateFormat={getConvertFormatForDate(format)}
                disabled={disabled}
                className={isInvalid ? "error-style_input" : ""}
                onChangeRaw={handleChangeRaw}
            >
                <div className="today_block">
                    <span>{'Сегодня ' + toDay.toLocaleDateString()}</span>
                </div>
            </DatePicker>
        </Fragment>
    );
};*/

export default MyDatePicker;
