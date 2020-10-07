/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './field.module.scss';
import visibleIcon from '../../assets/images/inputs-icons/visible_icon.svg';
import hideIcon from '../../assets/images/inputs-icons/hidden_icon.svg';

class Field extends Component {
    state = {
        focused: false,
        inputType: '',
        isVisibleEye: false,
    };

    componentDidMount() {
        const { type } = this.props;
        this.setState({
            inputType: type,
        });
    }

    onBlur = () => {
        this.setState({ focused: false });
    };

    onFocus = () => {
        this.setState({ focused: true });
    };

    switchEye = () => {
        const { inputType } = this.state;
        if (inputType === 'text') {
            this.setState({
                inputType: 'password',
                isVisibleEye: false,
            });
        }

        if (inputType === 'password') {
            this.setState({
                inputType: 'text',
                isVisibleEye: true,
            });
        }
    };

    render() {
        const {
            id,
            labelText,
            type,
            placeholder,
            value,
            onChange,
            onKeyDown,
            name,
            inputStyle,
            min,
            max,
            disabled,
            step,
            icon,
        } = this.props;
        const { focused, inputType, isVisibleEye } = this.state;

        const labelStyle = focused || value.lenth
            ? classNames(
                style.container__inputWrrapper_label,
                style.container__inputWrrapper_labelActive,
            )
            : style.container__inputWrrapper_label;

        const inputClassNames = classNames(inputStyle, style.container__inputWrrapper_input);

        const eye = isVisibleEye ? (
            <img className={style.container__eye} src={hideIcon} alt="icon" />
        ) : (
            <img className={style.container__eye} src={visibleIcon} alt="icon" />
        );

        return (
            <div className={style.container}>
                <label className={labelStyle} htmlFor={id}>
                    {labelText}
                </label>
                <div className={style.container__inputWrrapper}>
                    {icon}
                    <input
                        id={id}
                        type={inputType}
                        className={inputClassNames}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        name={name}
                        maxLenth="80"
                        min={min}
                        max={max}
                        autoComplete="new-password"
                        disabled={disabled}
                        step={step}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                    />
                </div>
                {type === 'password' ? <div onClick={this.switchEye}>{eye}</div> : null}
            </div>
        );
    }
}

Field.defaultProps = {
    labelText: '',
    placeholder: '',
    value: '',
    name: '',
    min: 0,
    inputStyle: '',
    step: '',
    onChange: () => {},
    disabled: false,
    icon: '',
};

Field.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    name: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.string,
    inputStyle: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.any,
};

export default Field;
