import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Typography from "@material-ui/core/es/Typography/Typography";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/es/Menu/Menu";
import MenuIcon from '@material-ui/icons/Menu';
import BaseComponent from "../component/BaseComponent.jsx";
import {withStyles} from "@material-ui/core/styles/index";
import SwipeableDrawer from "@material-ui/core/es/SwipeableDrawer/SwipeableDrawer";
import List from "@material-ui/core/es/List/List";
import Divider from "@material-ui/core/es/Divider/Divider";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import Grid from "@material-ui/core/es/Grid/Grid";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import HomeIcon from '@material-ui/icons/Home';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import LinkIcon from '@material-ui/icons/Link';

const styles = {
    root: {
        flexGrow: 1,
    },
    text: {
        flexGrow: 1,
        fontWeight: 800
    }
};

class HW_Menu extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            appBarClassName: "backgroundTransparent",
            auth: true,
            anchorEl: null,
            elevation: 0,
            left: false
        };
    }

    toggleDrawer(side, open) {
        this.setState({
            [side]: open,
        });
    };


    render() {
        return (
            <div>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer.bind(this, 'left', false)}
                    onOpen={this.toggleDrawer.bind(this, 'left', true)}
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <List>
                                <ListItem button>
                                    <ListItemIcon>
                                        <HomeIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="主页" onClick={()=>{
                                        this.PageJumpingOperator.goToHomePage();
                                    }}/>
                                </ListItem>
                                <Divider/>
                                <ListItem button>
                                    <ListItemIcon>
                                        <LinkIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="友链" onClick={() => {
                                        alert("不存在的");
                                    }}/>
                                </ListItem>
                                <Divider light/>
                                <ListItem button>
                                    <ListItemIcon>
                                        <LiveHelpIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="关于"/>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </SwipeableDrawer>
                <AppBar position="fixed" className={this.state.appBarClassName}
                        elevation={this.state.elevation}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu" onClick={() => {
                            this.setState({left: !this.state.left});
                        }}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={this.props.classes.text}>
                            我的小宅子
                        </Typography>
                        {this.state.auth && (
                            <div>
                                <IconButton
                                    aria-owns={Boolean(this.state.anchorEl) ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={
                                        this.handleUserMenu.bind(this)

                                    }
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={() => {
                                        this.setState({anchorEl: null});
                                    }}
                                >
                                    <MenuItem onClick={() => {
                                        this.setState({anchorEl: null});
                                    }}>注销</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    topBarHide(currentY) {
        if (currentY > this.props.changeLimitY) {
            if (this.state.elevation == 0 || this.state.appBarClassName == "backgroundTransparent") {
                this.setState({elevation: 1, appBarClassName: ""});
            }
        } else {
            if (this.state.elevation == 1 || this.state.appBarClassName == "") {
                this.setState({elevation: 0, appBarClassName: "backgroundTransparent"});
            }
        }
    }

    componentDidMount() {
        this.props.WindowsEventHelper.addCallback_Scroll("topBar是否隐藏", this.topBarHide.bind(this));
    }

    handleUserMenu(event) {
        this.setState({anchorEl: event.currentTarget});
    };
}

export default withStyles(styles)(HW_Menu);