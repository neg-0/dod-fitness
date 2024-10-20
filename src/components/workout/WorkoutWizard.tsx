import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

interface WorkoutWizardProps {
  onComplete: (data: any) => void;
  onCancel: () => void;
}

const WorkoutWizard: React.FC<WorkoutWizardProps> = ({
  onComplete,
  onCancel,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [branch, setBranch] = useState('');
  const [goal, setGoal] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const steps = [
    'Select Military Branch',
    'Choose Fitness Goal',
    'Set Target Date',
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    onComplete({
      branch,
      goal,
      targetDate,
      duration: calculateDuration(targetDate),
    });
  };

  const calculateDuration = (date: string) => {
    const target = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(target.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormControl fullWidth>
            <InputLabel>Military Branch</InputLabel>
            <Select
              value={branch}
              onChange={(e) => setBranch(e.target.value as string)}
            >
              <MenuItem value="Army">Army</MenuItem>
              <MenuItem value="Navy">Navy</MenuItem>
              <MenuItem value="Air Force">Air Force</MenuItem>
              <MenuItem value="Space Force">Space Force</MenuItem>
              <MenuItem value="Marines">Marines</MenuItem>
              <MenuItem value="Coast Guard">Coast Guard</MenuItem>
            </Select>
          </FormControl>
        );
      case 1:
        return (
          <TextField
            fullWidth
            label="Fitness Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Score 90+ on Air Force PT test"
          />
        );
      case 2:
        return (
          <TextField
            fullWidth
            label="Target Date"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mt-4">
        {activeStep === steps.length ? (
          <div>
            <Typography variant="body1">
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleComplete} className="mt-2">
              Create Workout Plan
            </Button>
          </div>
        ) : (
          <div>
            <Typography component="div" variant="body1">
              {getStepContent(activeStep)}
            </Typography>
            <div className="mt-4">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={
                  activeStep === steps.length - 1 ? handleComplete : handleNext
                }
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              <Button onClick={onCancel}>Cancel</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutWizard;
