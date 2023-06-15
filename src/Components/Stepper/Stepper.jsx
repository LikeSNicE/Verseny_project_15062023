import { Stack, Step, StepLabel, Stepper } from '@mui/material'
import React from 'react';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#7272D8',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#7272D8',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  
  }));


QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };

function QontoStepIcon(props) {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <div className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
}

  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#7272D8',
    }),
    '& .QontoStepIcon-completedIcon': {
        border: "5px solid #7272d8",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
    },
    '& .QontoStepIcon-circle': {
        border: "3px solid #eaeaf0",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
    },
  }));
export default function StepperUI({steps,activeStep=1}) {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
    <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
        {steps.map((value,index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={QontoStepIcon} >{value.label}</StepLabel>
            </Step>
        ))}
    </Stepper>
    </Stack>
  ) 
}
