import React from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Grid, 
  Avatar, 
  Chip,
  Stack
} from "@mui/material";
import { 
  PersonOutline, 
  MailOutline, 
  LockOpenOutlined, 
  VerifiedUserOutlined 
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { user } = useAuth();
  const { t } = useTranslation();


  const DetailRow = ({ icon, labelKey, value, isPassword }) => (
    <Box display="flex" alignItems="center" py={2.5}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: 44, 
          height: 44, 
          borderRadius: 2, 
          bgcolor: '#8859c2', 
          mr: 3, 
          color: '#ffffff',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        {icon}
      </Box>
      <Box flex={1}>
        <Typography 
          variant="caption" 
          color="text.secondary" 
          fontWeight="700" 
          sx={{ textTransform: 'uppercase', letterSpacing: 1, display: 'block', mb: 0.5 , pr:1}}
        >
          {t(labelKey)}
        </Typography>
        <Typography 
          variant="body1" 
          fontWeight="600"
          sx={{ 
            fontFamily: isPassword ? "'Roboto Mono', monospace" : 'inherit',
            color: 'text.primary',
            wordBreak: 'break-all',
            pr: 1
          }}
        >
          {value || t("common.not_provided")}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: "auto" }}>
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 3, 
          overflow: "hidden", 
          border: "1px solid", 
          borderColor: "divider",
          bgcolor: 'background.paper'
        }}
      >
        <Box 
          sx={{ 
            height: 140, 
            background: 'linear-gradient(135deg, #7a669e 0%, #434343 100%)',
            position: 'relative' 
          }} 
        />
        
        <Box sx={{ px: { xs: 3, md: 5 }, pb: 5, mt: -6 }}>
          <Stack spacing={4}>
         
            <Box display="flex" alignItems="flex-end" gap={3}>
              <Avatar 
                sx={{ 
                  width: 110, 
                  height: 110, 
                  border: "4px solid #fff", 
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                  bgcolor: "#573985", 
                  fontSize: "2.5rem",
                  fontWeight: 700
                }}
              >
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </Avatar>
              <Box mb={1.5}>
                <Typography variant="h4" fontWeight="800" sx={{ letterSpacing: '-0.02em', pt: 3 }}>
                  {t("ProfileTitle")}
                </Typography>
                <Chip 
                  label={t("status_active")} 
                  size="small" 
                  sx={{ 
                    mt: 1, 
                    fontWeight: 700, 
                    bgcolor: 'action.selected',
                    borderRadius: 1
                  }} 
                  icon={<VerifiedUserOutlined style={{ fontSize: 16 }} />}
                />
              </Box>
            </Box>

            <Divider />

            {/* Profile Details Grid */}
            <Box>
              <Typography variant="h6" fontWeight="800" mb={2} color="text.primary">
                {t("account_details")}
              </Typography>
              <Grid container columnSpacing={4}>
                <Grid item xs={12} md={6}>
                  <DetailRow 
                    icon={<PersonOutline />} 
                    labelKey={t("username")} 
                    value={user?.username} 
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DetailRow 
                    icon={<MailOutline />} 
                    labelKey={t("email")} 
                    value={user?.email} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1, borderStyle: 'dashed' }} />
                  <DetailRow 
                    icon={<LockOpenOutlined />} 
                    labelKey={t("password")}
                    value={user?.password} 
                    isPassword={true} 
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Security Notice Section */}
            <Box 
              sx={{ 
                p: 2.5, 
                bgcolor: 'action.hover', 
                borderRadius: 2, 
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box sx={{ mt: 0.3, color: 'text.secondary' }}>
                  <VerifiedUserOutlined fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight="700" color="text.primary" gutterBottom>
                    {t("security_notice_title")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {t("security_notice_desc")}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

