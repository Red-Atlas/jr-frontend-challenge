import { Box } from "@mui/material";
import "../../assets/components/template/AppTemplate.css";
import Navbar from "../app_bar/Navbar";

interface AppTemplateProps {
  children: React.ReactNode;
}

const AppTemplate = ({ children }: AppTemplateProps) => {
  return (
    <Box flex={1}>
      <Navbar />
      <div className="template-container">{children}</div>
    </Box>
  );
};

export default AppTemplate;
