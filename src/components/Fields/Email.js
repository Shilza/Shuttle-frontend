import React from "react";
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import FormItem from "antd/es/form/FormItem";

const inputStyles = {color: 'rgba(0,0,0,.25)'};

const Email = ({getFieldDecorator, initialValue=''}) => {
    return (
        <FormItem>
            {getFieldDecorator('email', {
                rules: [
                    {type: 'email', message: 'The input is not valid Email!'},
                    {required: true, message: 'Please input your Email!'}
                ],
                initialValue
            })(
                <Input
                    data-testid='input_email'
                    placeholder="Email"
                    prefix={<Icon type="mail" style={inputStyles}/>}
                />
            )}
        </FormItem>
    );
};

Email.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    initialValue: PropTypes.string
};

export default Email;