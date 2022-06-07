import './Topbar.css';
import { Grid } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';

const Home = () =>{
    return(
        <Grid container className="back">
            <Grid item md={10} className="search">
                <button type="button">
                    <SearchIcon sx={{fontSize: 30}}/>
                </button>
            </Grid>
            <Grid item md={2} className="profile">Name Surname</Grid>
        </Grid>
    );
}

export default Home;