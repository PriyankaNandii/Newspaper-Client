import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet} from 'react-router-dom'


const Root = () => {
    return (
        <div className="font-pt">
        <Navbar />
      
        <div className="py-12">
      <Outlet/>
      </div>
      <Footer />
   </div>
     
    );
};

export default Root;