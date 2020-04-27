import React from "react";
import PropTypes from 'prop-types';
import {Icon, Input} from "antd";
import FormItem from "antd/es/form/FormItem";

const inputStyles = {color: 'rgba(0,0,0,.25)'};

const Confirm = ({getFieldDecorator, validator, onBlur}) => {
    return (
        <FormItem>
            {getFieldDecorator('confirm', {
                rules: [{
                    required: true, message: 'Please confirm your password!'
                },
                    {validator}
                ]
            })(
                <Input
                    data-testid='input_password_confirmation'
                    type="password"
                    placeholder="Confirm password"
                    prefix={<Icon type="eye" style={inputStyles}/>}
                    onBlur={onBlur}
                />
            )}
        </FormItem>
    );
};

Confirm.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    validator: PropTypes.func
};

export default Confirm;