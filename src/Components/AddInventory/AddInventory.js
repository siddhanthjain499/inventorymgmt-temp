import { Button, FormControl, Grid, TextField } from "@material-ui/core";
import Topbar from '../Utilities/Topbar';

import './AddInventory.css';

const AddInventory = () => {

    return (
        <Grid container>

            <Topbar />
            <Grid container style={{ marginTop: "0px" }}>
                <Grid item sm={12} spacing={12}>
                    <h1 className="home_heading">Add To Inventory</h1>
                    <Grid container sm={12} spacing={12} className="inventory_form">

                        <Grid container xs={12} spacing={4}>

                            <Grid item xs={6}>
                                <FormControl fullWidth variant="standard">
                                    <TextField label="Name" variant="standard"></TextField>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth variant="standard">
                                    <TextField label="Total Cost" variant="standard"></TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="standard">
                                    <TextField id="standard-multiline-static" label="Material/Notes" variant="standard" multiline rows={4}></TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                            <Button variant="contained" className="sub_button" style={{ background: "#191919", color: "#ffffff", padding: "1em 5em",margin:"2em 0 0 0"}}>SUBMIT</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );

}

export default AddInventory;