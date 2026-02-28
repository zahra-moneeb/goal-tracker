import {
List,
  ListItem,
  Box,
  Typography,
  Chip,
  LinearProgress,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import { useTranslation } from "react-i18next";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

export default function GoalList({ goals, onEdit, onDelete }) {
//   const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!goals || goals.length === 0) return null;



  return (
    <List sx={{ width: "100%" }}>
  {(goals || []).map((goal) => {
  

    return (
      <ListItem
        key={goal.id}
        sx={{
          flexDirection: "column",
          alignItems: "stretch",
          borderBottom: "1px solid #b8a7b3",
          py: 3,
          m: 2,
          width: "100%",
          

        }}
      >
      
        {/* 🔹 Title + Category */}
        <Stack
          direction={{ xs: "column", sm: "row" }}  // موبایل: ستونی، دسکتاپ: ردیفی
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          <Typography variant="h6" fontWeight={600}>
            {goal.title}
          </Typography>

          <Chip
            label={goal.category}
            size="small"
            color="primary"
          />
        </Stack>

        {/* 🔹 Progress */}
       

        {/* 🔹 ستک باید در آخر چیب میبود که برده شد در آخر کامبونیت*/}
        <Stack
          direction={{ xs: "column", sm: "row" }}  // موبایل: زیر هم، دسکتاپ: کنار هم
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >

          {/* // date must be here */}
          <Typography variant="body2" color="text.secondary">
            {goal.current}/{goal.target} days
          </Typography>

          {/* <Chip
            label={goal.status}
            size="small"
            color={
              goal.status === "Completed"
                ? "success"
                : goal.status === "Paused"
                ? "warning"
                : "info"
            }
          /> */}
     

        {/* 🔹 Buttons */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 2 }}
          flexWrap="wrap" // موبایل دکمه‌ها را به خط بعدی می‌برد
        >
      
         <Button variant="outlined" size="small" sx={{ color: colors.blueAccent[200] }}>
            view details
          </Button>
          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Stack>
    </Stack>  
      </ListItem>
    );
  })}
</List>
  );
}
     
 


   
 













   
        {/* <CardContent>
            <Typography variant="h6">
                {goal.title}
            </Typography>

            <Typography variant="body2" color = {colors.greenAccent[300]}>
                {goal.description}
            </Typography>

           <Typography sx={{mt:1}}>
            {t("deadline")}: {goal.deadline}
            </Typography> 

            <Typography>
                {t("status")}: {t(goal.status)}
            </Typography>

            <Typography>
                {t("xp")}: {goal.xp}
            </Typography>

            <Typography>
                {t("streak")}: {goal.streak}
            </Typography> */}

            {/* <Stack direction="row" spacing={1} sx={{mt:2}}>
                <Button variant="contained" color={colors.primary[300]} size="small" onClick={()=> onEdit(goal)}>
                    {t("edit")}
                </Button>

                <Button variant="outlined" color={colors.redAccent[500]} size="small" onClick={() => onDelete(goal.id)}>
                    {t("delete")}
                </Button>
            </Stack> */}
        {/* </CardContent> */}

        




  