import { Button, Grid, Paper } from "@material-ui/core";
import Topbar from '../Utilities/Topbar';

import "./AddCustomer.css";

const AddCustomer = () => {
    return (
        <Grid container>
            <Topbar />

            <div className="entire_div">

                <h2 className="home_heading">Hi Name Surname</h2>
                <p className="home_text_alt">Welcome back</p>

                <p className="home_text"> Email Sent</p>


                <Paper className="cus_card" >
                    <div className="cus_content">
                        <h1>Mr. ABC</h1>
                        <p className="home_text_alt">98, Shirley Street, Australia</p>
                    </div>
                </Paper>

                <Button variant="contained" style={{ background: "#191919", color: "#ffffff", padding: "10px 30px" }}>PRINT</Button>
            </div>
        </Grid>
    );
}

export default AddCustomer;