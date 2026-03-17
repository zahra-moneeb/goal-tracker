import React from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Container, 
  Stack, 
  Card, 
  CardContent, 
  Divider 
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dir = t('dir') || 'ltr';

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.grey[50],
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3
      }}
    >
      <Container maxWidth="sm">
        <Card 
          elevation={4} 
          dir={dir}
          sx={{ 
            borderRadius: 4, 
            textAlign: 'center',
            overflow: 'visible', // Allows icon to pop out if desired
            position: 'relative'
          }}
        >
          <CardContent sx={{ py: 6, px: { xs: 2, sm: 6 } }}>
            {/* Large Decorative Header */}
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: '6rem', 
                fontWeight: 900, 
                color: 'primary.light', 
                opacity: 0.2,
                lineHeight: 1,
                mb: -4 // Negative margin to overlap with title
              }}
            >
              {t('code')}
            </Typography>

            <SentimentVeryDissatisfiedIcon 
              color="primary" 
              sx={{ fontSize: 64, mb: 2 , mt: 3}} 
            />

            <Typography variant="h4" component="h2" gutterBottom fontWeight="700">
              {t('notFoundTitle')}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {t('message')}
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center"
            >
              <Button
                variant="contained"
                disableElevation
                size="large"
                onClick={() => navigate('/')}
                sx={{ borderRadius: 2, px: 4, textTransform: 'none'}}
              >
                {t('primaryBtn')}
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/support')}
                sx={{ borderRadius: 2, px: 4, textTransform: 'none', m:3, pr: 2 }}
              >
                {t('secondaryBtn')}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default NotFound;