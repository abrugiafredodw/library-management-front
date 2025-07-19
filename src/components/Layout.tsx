import { Box } from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./Footer";


const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
     return (
        <Box display="flex" flexDirection="column" minHeight="98vh">
          <header>
            <NavBar />
          </header>
          <Box component="main" flexGrow={1}>
            {children}
          </Box>
          <Footer />
        </Box>
      );
}


export default Layout;