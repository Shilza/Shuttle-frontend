import React from "react";
import PropTypes from 'prop-types';
import Window from "./Window";

const Modal = React.memo(({children, onClose, zIndex, closeByClickOnCover, withCloseButton, visible}) => (
  <>
    {
      visible &&
      <Window
          onClose={onClose}
          withCloseButton={withCloseButton}
          closeByClickOnCover={closeByClickOnCover}
          zIndex={zIndex}
      >
        {children}
      </Window>
    }
  </>
));

Modal.defaultProps = {
  zIndex: 999,
  withCloseButton: true,
  visible: false,
  closeByClickOnCover: true,
  onClose: () => {}
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  withCloseButton: PropTypes.bool,
  closeByClickOnCover: PropTypes.bool,
  zIndex: PropTypes.number
};

export default Modal;
