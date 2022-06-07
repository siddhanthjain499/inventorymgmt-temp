import { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import SideBar from '../Utilities/Sidebar';
import classes from './Layout.module.css';

const Layout = (props) => {
    return (
        <Fragment>
            <Grid container className={classes.layout}>
                <Grid item sm={2}>
                    <SideBar />
                </Grid>
                <Grid item sm={10}>
                    <main className={classes.main}>{props.children}</main>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default Layout;