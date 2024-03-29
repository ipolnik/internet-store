import React from 'react';
import { Box, Card, InputBase } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SegmentIcon from '@mui/icons-material/Segment';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const types = useSelector((store) => store.products.types);

  const handleClick = () => {
    setOpen(!open);
  };
  
  return (
    <Box style={{padding: "24px 0px 24px 24px"}} flex={2} sx={{ display: { xs: "none", sm: "block" }}}>
      <Card>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          // subheader={
          //   <ListSubheader component="div" id="nested-list-subheader">
          //     <InputBase placeholder="Найти..." />
          //   </ListSubheader>
          // }
        >
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="На главную" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/contacts')}>
            <ListItemIcon>
              <LocalPhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Связатся с нами" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/basket')}>
            <ListItemIcon>
              <ShoppingCartRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Корзина" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <SegmentIcon />
            </ListItemIcon>
            <ListItemText primary="Категории" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>                      
              <ListItemButton onClick={() => navigate(`/category/${types[0].id}`)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize='small' />
                </ListItemIcon >
                <ListItemText primary="Мебель для спальни" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate(`/category/${types[1].id}`)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Мягкая мебель" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate(`/category/${types[2].id}`)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Мебель для кухни" />
              </ListItemButton >
              <ListItemButton onClick={() => navigate(`/category/${types[3].id}`)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Мебель для бизнеса" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate(`/category/${types[4].id}`)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText  primary="Мебель для гостиной" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate(`/category/${types[5].id}`)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Мебель для детской" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate(`/category/${types[6].id}`)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Столы и стулья" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate(`/category/${types[7].id}`)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Спецзаказ" onClick={() => navigate('/calculate')}/>
              </ListItemButton>
            </List>
          </Collapse>       
        </List>
        
        
      </Card>
    </Box>
  );
}

export default Sidebar;
