import { Drawer,List, ListItem, Toolbar, ListItemText } from "@mui/material"
import { NavLink } from "react-router-dom";


export default function SideBar(){
    const drawerWidth = 240 ;
    return(
         <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar /> 
      <List>
        {[
          { text: "Dashboard", path: "/dashboard" },
          { text: "Goals", path: "/goals" },
          { text: "Categories", path: "/categories" },
          { text: "Settings", path: "/settings" },
        ].map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={NavLink} 
            to={item.path}
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? "#1976d2" : "inherit",
              textDecoration: "none",
            })}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
    )
}