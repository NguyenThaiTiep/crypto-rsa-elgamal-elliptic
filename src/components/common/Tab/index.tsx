import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tab: {
    backgroundColor: "#ffffff",
    color: "gray",
  },
});
interface InputItem {
  label: any;
  component: any;
  icon: any;
}
interface Props {
  input: InputItem[];
}
export const TabsRender = (props: Props) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState([] as InputItem[]);
  const { input } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.tab} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {input.map((item, index) => (
            <Tab label={item.label} {...a11yProps(index)} key={index} />
          ))}
        </Tabs>
      </AppBar>
      {input.map((item, index) => (
        <TabPanel value={value} index={index} key={index}>
          {item.component}
        </TabPanel>
      ))}
    </div>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
