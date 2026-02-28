import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

export default function GoalCard({ goal, onEdit, onDelete }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!goal) return null;
  return (
    <Card sx={{minWidth: 100, backgroundColor: colors.blueAccent[900]}}>
        <CardContent>
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
            </Typography>

            <Stack direction="row" spacing={1} sx={{mt:2}}>
                <Button variant="contained" color={colors.primary[300]} size="small" onClick={()=> onEdit(goal)}>
                    {t("edit")}
                </Button>

                <Button variant="outlined" color={colors.redAccent[500]} size="small" onClick={() => onDelete(goal.id)}>
                    {t("delete")}
                </Button>
            </Stack>
        </CardContent>

        



    </Card>
  )
}