import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import { X } from 'lucide-react';
import { keyframes } from '@emotion/react';

interface WellnessCheckInModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    physical: number | null;
    soreness: number | null;
    mental: number | null;
  }) => void;
  initialData?: {
    physical: number | null;
    soreness: number | null;
    mental: number | null;
  } | null;
}

interface RatingOption {
  emoji: string;
  label: string;
  value: number;
}

interface AnimatingEmoji {
  section: 'physical' | 'soreness' | 'mental';
  emoji: string;
}

const springAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1.1); }
`;

const ratingOptions: RatingOption[] = [
  { emoji: '😫', label: 'Very Poor', value: 1 },
  { emoji: '🙁', label: 'Poor', value: 2 },
  { emoji: '😐', label: 'Neutral', value: 3 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😊', label: 'Excellent', value: 5 },
];

const BUTTON_SIZE = 64;
const BUTTON_GAP = 8;
const BUTTON_SPACING = BUTTON_SIZE + BUTTON_GAP;

const WellnessCheckInModal: React.FC<WellnessCheckInModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const theme = useTheme();
  const [physical, setPhysical] = useState<number | null>(null);
  const [soreness, setSoreness] = useState<number | null>(null);
  const [mental, setMental] = useState<number | null>(null);
  const [animatingEmoji, setAnimatingEmoji] = useState<AnimatingEmoji | null>(null);

  useEffect(() => {
    if (open && initialData) {
      setPhysical(initialData.physical);
      setSoreness(initialData.soreness);
      setMental(initialData.mental);
    }
  }, [open, initialData]);

  const handleSubmit = () => {
    onSubmit({
      physical,
      soreness,
      mental,
    });
  };

  const handleRatingClick = (type: 'physical' | 'soreness' | 'mental', value: number, emoji: string) => {
    const setter = {
      physical: setPhysical,
      soreness: setSoreness,
      mental: setMental,
    }[type];

    const currentValue = {
      physical,
      soreness,
      mental,
    }[type];

    setter(currentValue === value ? null : value);
    
    if (currentValue !== value) {
      setAnimatingEmoji({ section: type, emoji });
      setTimeout(() => setAnimatingEmoji(null), 600);
    }
  };

  const RatingSection = ({ 
    title, 
    value, 
    type 
  }: { 
    title: string; 
    value: number | null; 
    type: 'physical' | 'soreness' | 'mental';
  }) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" align="center" gutterBottom>
        {title}
      </Typography>
      <Box 
        sx={{ 
          position: 'relative',
          display: 'flex', 
          gap: `${BUTTON_GAP}px`, 
          justifyContent: 'center',
          minHeight: '80px',
          mx: 'auto',
          maxWidth: 'fit-content',
        }}
      >
        {value && (
          <Box
            sx={{
              position: 'absolute',
              width: `${BUTTON_SIZE}px`,
              height: `${BUTTON_SIZE}px`,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              border: `2px solid ${theme.palette.primary.main}`,
              left: `${(value - 1) * BUTTON_SPACING}px`,
              transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 0,
            }}
          />
        )}
        
        {ratingOptions.map((option) => (
          <Box
            key={option.value}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              zIndex: 1,
              width: `${BUTTON_SIZE}px`,
            }}
          >
            <IconButton
              onClick={() => handleRatingClick(type, option.value, option.emoji)}
              sx={{
                width: `${BUTTON_SIZE}px`,
                height: `${BUTTON_SIZE}px`,
                borderRadius: 2,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  '& .emoji': {
                    transform: 'scale(1.2)',
                  },
                },
                '& .emoji': {
                  fontSize: value === option.value ? '42px' : '32px',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: animatingEmoji?.section === type && animatingEmoji?.emoji === option.emoji ? 
                    `${springAnimation} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)` : 
                    'none',
                  transform: value === option.value ? 'scale(1.1)' : 'scale(1)',
                },
              }}
            >
              <Box className="emoji">{option.emoji}</Box>
            </IconButton>
            {value === option.value && (
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 'medium',
                  opacity: 0.8,
                  position: 'absolute',
                  bottom: -4,
                  width: '64px',
                  textAlign: 'center',
                }}
              >
                {option.label}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: theme.shadows[10],
        },
      }}
    >
      <Box 
        component="div" 
        sx={{ 
          m: 0, 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box component="span" sx={{ fontSize: '1.25rem', fontWeight: 500 }}>
          Daily Wellness Check-in
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: theme.palette.grey[500],
          }}
        >
          <X size={20} />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 2, pb: 1 }}>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center" 
          sx={{ mb: 3 }}
          fontSize="26px"
        >
          <i>How are you feeling today?</i>
        </Typography>

        <RatingSection
          title="Physical Health"
          value={physical}
          type="physical"
        />

        <RatingSection
          title="Soreness Level"
          value={soreness}
          type="soreness"
        />

        <RatingSection
          title="Mental Wellbeing"
          value={mental}
          type="mental"
        />
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Submit Check-in
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WellnessCheckInModal;