// src/components/DepartmentList.tsx
import React, { useState } from 'react';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const departments = [
  { department: 'customer_service', sub_departments: ['support', 'customer_success'] },
  { department: 'design', sub_departments: ['graphic_design', 'product_design', 'web_design'] },
];

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const handleExpand = (department: string) => {
    setExpanded(expanded === department ? null : department);
  };

  const handleSelect = (value: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const isSelected = (value: string) => selected.includes(value);

  const handleDepartmentSelect = (department: string, subDepartments: string[]) => {
    if (isSelected(department)) {
      setSelected(selected.filter((item) => item !== department && !subDepartments.includes(item)));
    } else {
      setSelected([...selected, department, ...subDepartments.filter((item) => !selected.includes(item))]);
    }
  };

  return (
    <List>
      {departments.map(({ department, sub_departments }) => (
        <div key={department}>
          <ListItem>
            <ListItemIcon>
              <IconButton edge="start" onClick={() => handleExpand(department)}>
                {expanded === department ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
              <Checkbox
                edge="start"
                checked={isSelected(department) || sub_departments.every((sub) => isSelected(sub))}
                onChange={() => handleDepartmentSelect(department, sub_departments)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={department} />
          </ListItem>
          <Collapse in={expanded === department} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {sub_departments.map((sub) => (
                <ListItem key={sub} button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isSelected(sub)}
                      onChange={() => handleSelect(sub)}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
