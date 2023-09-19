import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

type BookCategoryProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const BookCategory = ({
  selectedCategory,
  onCategoryChange,
}: BookCategoryProps) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(event);
    onCategoryChange(newValue);
  };

  return (
    <TabContext value={selectedCategory}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="All Category" value="All" />
          <Tab label="Science" value="Science" />
          <Tab label="Fiction" value="Fiction" />
          <Tab label="Philosophy" value="Philosophy" />
        </TabList>
      </Box>
      <TabPanel value="All"></TabPanel>
      <TabPanel value="Science"></TabPanel>
      <TabPanel value="Fiction"></TabPanel>
      <TabPanel value="Philosophy"></TabPanel>
    </TabContext>
  );
};

export default BookCategory;
