import React from 'react';
import ReactDom from 'react-dom';
import Axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import Icon from '@mdi/react';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import StepLabel from "@material-ui/core/StepLabel";
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { mdiCartOutline } from '@mdi/js';
import { mdiKnifeMilitary } from '@mdi/js';
import { mdiWrench } from '@mdi/js';
import { mdiFormatListBulleted } from '@mdi/js';
import { mdiCubeOutline } from '@mdi/js';
import './searchBar.css';



class SearchBar extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            input: "",
            possibleNames: [],
            divLength: window.innerWidth,
            isOpen: false,
            cart: 0,
            anchorEl: null,
            right: false,
        };
        this.updateDisplay = this.updateDisplay.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }
            
    changeItem(itemId) {
        let event = new CustomEvent("changeItem", {
            detail: itemId
        })
        window.dispatchEvent(event);
    }

    updateDisplay() {
        this.setState({
            divLength: window.innerWidth
        });
    }
    updateInput () {
        let newInput = document.getElementById("searchInput").value;
        this.setState({
            input: newInput,
        });
    }

    showPopover(event) {
        event.preventDefault();
        this.props.togglePopover(event.currentTarget);
    }

    handleClick(isOpen) {
        this.setState({
            anchorEl: document.getElementById("vertIcon"),
            isOpen: !this.state.isOpen,
        });
    }

    handleClose() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDrawer() {
        this.setState({
            right: !this.state.right,
        });
    }

    componentDidMount () {
        Axios.get('http://hallows-search-bar.us-east-2.elasticbeanstalk.com/searches')
        .then (res => {
            console.log(res);
            let items = res.data
            this.setState({
                possibleNames: items
            });
            
        });

        window.addEventListener('addToCart', event => {
            this.setState({
                cart: this.state.cart + event.detail,
            });
        });

        document.getElementById("searchInput").addEventListener("keyup", (e) => {
            if (e.keyCode === 13 && document.getElementById("searchInput") === document.activeElement) {
                let itemName = document.getElementById("searchInput").value;
                for (let i = 0; i < this.state.possibleNames.length; i++) {
                    if (this.state.possibleNames[i].name.toUpperCase() === itemName.toUpperCase()) {
                        this.changeItem(this.state.possibleNames[i].id);
                    }
                }
            }
        });

    }
    render () {
        document.addEventListener('click', (event) => {
            var isClickInsideSearch = document.getElementById("searchBar").contains(event.target);
            if (!isClickInsideSearch) {
              setTimeout(function(){ document.getElementById("tab1").style.display = "block"; }, 280);
              setTimeout(function(){ document.getElementById("tab2").style.display = "block"; }, 280);
              setTimeout(function(){ document.getElementById("tab3").style.display = "block"; }, 280);
            } else if (isClickInsideSearch){
              document.getElementById("tab1").style.display = "none";
              document.getElementById("tab2").style.display = "none";
              document.getElementById("tab3").style.display = "none";
            }
        });
        window.addEventListener("resize", this.updateDisplay);
        let isOpen = false;
        return (
            <div>
                <AppBar position="static" className="header" color='inherit'>
                    <Toolbar>
                        <StepLabel icon={ <img src="https://fec-hallowes.s3.amazonaws.com/Hallowes.png" alt="" width="75" height="65" /> } />
                        <React.Fragment>
                            <button className="headerCat" id="tab1" title="Shop">Shop</button>
                            <button className="headerCat" id="tab2" title="Ideas">Ideas</button>
                            <button className="headerCat" id="tab3" title="Savings">Savings</button>
                        </React.Fragment>
                        <Paper className="search" id="searchBar">
                            <IconButton className="searchIcon" aria-label="menu">
                                <SearchIcon />
                            </IconButton>
                            <input type="text" 
                                className="overSearch"
                                autoComplete="off"
                                name="search" 
                                placeholder="What are you looking for today?"
                                list="suggestions"
                                id="searchInput"
                                onChange={this.updateInput.bind(this)}
                            ></input>
                            <datalist id="suggestions">
                                {this.state.input !== "" ? this.state.possibleNames.map(item => {
                                    return (
                                        <option
                                            id={item.name}
                                            value={item.name}
                                            key={item.name}
                                        ></option>
                                    )
                                    }) : null
                                }
                            </datalist>
                        </Paper>
                        {
                            this.state.divLength < 1166 ?
                            (
                                <div>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={this.handleClick}
                                    >
                                        <MoreVertIcon id="vertIcon"/>
                                    </IconButton>
                                    <Menu
                                    open={this.state.isOpen}
                                    onClose={this.handleClose}
                                    anchorEl={this.state.anchorEl}
                                    >
                                        <MenuItem>
                                            <IconButton className="iconPersonSize"
                                                title="MyHallowes"
                                                edge="end"
                                                aria-label="account of current user"
                                                aria-haspopup="true"
                                                color="inherit"
                                                onClick={this.toggleDrawer}
                                            >
                                                <PersonIcon className="iconPerson" />
                                            </IconButton>
                                            <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer} width={500}>
                                            <MenuItem>Menu Item</MenuItem>
                                            <MenuItem>Menu Item 2</MenuItem>
                                            </Drawer>
                                        </MenuItem>
                                        <MenuItem>
                                            <IconButton aria-label="Cart" className="iconCartSize">
                                                <Badge badgeContent={this.state.cart} color="secondary">
                                                    <Icon  className="iconCart" path={mdiCartOutline}
                                                        title="Cart Count"
                                                        size={1}
                                                        color="black"
                                                    />
                                                </Badge>
                                            </IconButton>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            )
                            :
                            (
                                <div className="iconGroupHead">            
                                    <IconButton className="iconPersonSize"
                                        title="MyHallowes"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={this.toggleDrawer}
                                    >
                                        <PersonIcon className="iconPerson"/>
                                    </IconButton>
                                    <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer}>
                                        <h2 id="drawerTitle">Account</h2>
                                        <button id="drawerButton">SIGN IN OR CREATE ACCOUNT</button>
                                        <List>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <Icon  className="drawerIconEl" path={mdiCubeOutline}
                                                        title="Order History"
                                                        size={1}
                                                        color="black"
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary="Order History" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <Icon  className="drawerIconEl" path={mdiFormatListBulleted}
                                                        title="My List"
                                                        size={1}
                                                        color="black"
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary="My List" />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <Icon  className="drawerIconEl" path={mdiWrench}
                                                        title="Installation & Services"
                                                        size={1}
                                                        color="black"
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary="Installation & Services" />
                                            </ListItem>
                                                <ListItem button>
                                                <ListItemIcon>
                                                    <Icon  className="drawerIconEl" path={mdiKnifeMilitary}
                                                        title="Military Discount"
                                                        size={1}
                                                        color="black"
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary="Military Discount" />
                                            </ListItem>
                                        </List>
                                    </Drawer>
                                    <IconButton aria-label="Cart" className="iconCartSize">

                                        <Badge badgeContent={this.state.cart} color="secondary">

                                            <Icon  className="iconCart" path={mdiCartOutline}
                                                title="Cart Count"
                                                size={1}
                                                color="black"
                                            />
                                        </Badge>
                                    </IconButton>
                                </div>
                            )
                        }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

ReactDom.render(<SearchBar />, document.getElementById("search"));






// import React from 'react';
// import ReactDom from 'react-dom';
// import Axios from 'axios';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
// import SearchIcon from '@material-ui/icons/Search';
// import PersonIcon from '@material-ui/icons/Person';
// import Icon from '@mdi/react';
// import Paper from '@material-ui/core/Paper';
// import StepLabel from "@material-ui/core/StepLabel";
// import { mdiCartOutline } from '@mdi/js';
// import './searchBar.css';

// class SearchBar extends React.Component {
//     constructor (props) {
//         super (props);
//         this.state = {
//             input: "",
//             possibleNames: []
//         }
//     }

//     updateInput () {
//         let newInput = document.getElementById("searchInput").value;
//         this.setState({
//             input: newInput,
//         })
//     }

//     componentDidMount () {
//         Axios.get('http://hallows-search-bar.us-east-2.elasticbeanstalk.com/searches')
//         .then (res => {
//             console.log(res);
//             let items = res.data.map(item => item.name);
//             this.setState({
//                 possibleNames: items
//             })
//         })
//     }

//     render () {
//         document.addEventListener('click', function(event) {
//             var isClickInside = document.getElementById("searchBar").contains(event.target);
//             if (!isClickInside) {
//               setTimeout(function(){ document.getElementById("tab1").style.display = "block"; }, 280);
//               setTimeout(function(){ document.getElementById("tab2").style.display = "block"; }, 280);
//               setTimeout(function(){ document.getElementById("tab3").style.display = "block"; }, 280);
//             } else {
//               document.getElementById("tab1").style.display = "none";
//               document.getElementById("tab2").style.display = "none";
//               document.getElementById("tab3").style.display = "none";
//             }
//         });
//         return (
//             <div>
//                 <AppBar position="static" className="header" color='inherit'>
//                     <Toolbar>
//                         <StepLabel icon={ <img src="https://fec-hallowes.s3.amazonaws.com/Hallowes.png" alt="" width="75" height="65" /> } />
//                         <React.Fragment>
//                             <button className="headerCat" id="tab1" title="Shop">Shop</button>
//                             <button className="headerCat" id="tab2" title="Ideas">Ideas</button>
//                             <button className="headerCat" id="tab3" title="Savings">Savings</button>
//                         </React.Fragment>
//                         <Paper className="search" id="searchBar">
//                             <IconButton className="searchIcon" aria-label="menu">
//                                 <SearchIcon />
//                             </IconButton>
//                             <input type="text" 
//                                 className="overSearch"
//                                 autoComplete="off"
//                                 name="search" 
//                                 placeholder="What are you looking for today?"
//                                 list="suggestions"
//                                 id="searchInput"
//                                 onChange={this.updateInput.bind(this)}
//                             ></input>
//                             <datalist id="suggestions">
//                                 {this.state.input !== "" ? this.state.possibleNames.map(name => {
//                                     return (
//                                         <option value={name} key={name}></option>
//                                     )
//                                     }) : null
//                                 }
//                             </datalist>
//                         </Paper>
//                         <div className="iconGroupHead">            
//                             <IconButton className="iconPersonSize"
//                                 title="MyHallowes"
//                                 edge="end"
//                                 aria-label="account of current user"
//                                 aria-haspopup="true"
//                                 color="inherit"
//                             >
//                                 <PersonIcon className="iconPerson"/>
//                             </IconButton>
//                             <IconButton aria-label="Cart" className="iconCartSize">
//                                 <Badge badgeContent={3} color="secondary">
//                                     <Icon  className="iconCart" path={mdiCartOutline}
//                                         title="Cart Count"
//                                         size={1}
//                                         color="black"
//                                     />
//                                 </Badge>
//                             </IconButton>
//                         </div>
//                     </Toolbar>
//                 </AppBar>
//             </div>
//         )

//     }
// }

// ReactDom.render(<SearchBar />, document.getElementById("search"));