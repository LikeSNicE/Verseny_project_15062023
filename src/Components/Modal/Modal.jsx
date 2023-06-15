import React from "react";
import styles from "./Modal.module.scss";
import {
  Box,
  Modal,
  IconButton,
  Button
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";


const ModalCustom = (props) => {
  const {
    rootClass,
    iconTopSection,
    iconTopSectionStyles,
    TopSectiontext,
    btnStyles = "",
    btnLabel = "",
    btnStartIcon = "",
    btnDisabled,
    labelStyles,
    children,
    heightModal,
    open,
    setIsOpen,
    className,
  } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "60%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    height: heightModal,
    borderRadius: "10px",
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={rootClass}>
      <Button
        onClick={handleOpen}
        startIcon={btnStartIcon}
        children={btnLabel}
        className={btnStyles}
        disabled={btnDisabled}
      />
      <Modal
        className={className}
        open={open}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalTopSection
            iconCross={<CloseOutlinedIcon />}
            onClick={handleClose}
            text={TopSectiontext}
            iconStyles={iconTopSectionStyles}
            icon={iconTopSection}
          />
          <div className={labelStyles}>
            <div className={styles.modalContainer}>
              <div>{children}</div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCustom;

const ModalTopSection = (props) => {
  const { onClick, text, icon, iconStyles } = props;
  return (
    <div className={styles.modalSectionTop}>
      <div className={styles.modalSectionTopContainer}>
        <div className={styles.modalSectionTopLeft}>
          <div className={iconStyles}>{icon}</div>
          <div className={styles.modalSectionTopLeftTitle}>{text}</div>
        </div>
        <div>
          <IconButton onClick={onClick}>{<CloseOutlinedIcon />}</IconButton>
        </div>
      </div>
    </div>
  );
};
