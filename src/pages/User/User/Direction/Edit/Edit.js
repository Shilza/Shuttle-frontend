import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "redux";
import {Form, message} from "antd";

import {isMobile} from "utils";
import {Button, SimpleModal, MobileDrawer} from 'ui';
import EditBody from "./EditBody/EditBody";

import EditTitle from "./EditTitle/EditTitle";
import {withRouter} from "react-router";
import styles from './edit.module.css';


const Edit = React.memo(({dispatch, history, form}) => {

  let [isEditVisible, setIsEditVisible] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  const showDrawer = () => {
    setIsEditVisible(true);
  };

  const closeDrawer = useCallback(() => {
    setIsEditVisible(false);
  }, []);

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        if(form.isFieldsTouched(Object.keys(values))) {
          setIsLoading(true);
          dispatch.auth.update({values, history})
            .then((data) => {
              message.success(data.message);
            })
            .finally(() => {
              setIsLoading(false);
              setIsEditVisible(false);
            })
        } else {
          message.warn('Nothing to update');
        }
      }
    });
  }, [form, history, dispatch]);

  return <>
    <Button onClick={showDrawer} className={styles.editButton}>
      Edit
    </Button>
    <>
      {
        isMobile() ?
          <MobileDrawer
            visible={isEditVisible}
            onClose={closeDrawer}
          >
            <Form onSubmit={onSubmit}>
              <EditTitle onClose={closeDrawer} submit={onSubmit} isLoading={isLoading}/>
              <EditBody form={form}/>
            </Form>
          </MobileDrawer>
          : <SimpleModal
            title='Edit profile'
            className={styles.modal}
            visible={isEditVisible}
            onCancel={closeDrawer}
            onOk={onSubmit}
            isLoading={isLoading}
          >
            <Form onSubmit={onSubmit}>
              <EditBody form={form} />
            </Form>
          </SimpleModal>
      }
    </>
  </>
});

Edit.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default compose(
  connect(),
  Form.create(),
  withRouter
)(Edit);
