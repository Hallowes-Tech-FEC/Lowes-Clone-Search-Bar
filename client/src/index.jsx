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
import Paper from '@material-ui/core/Paper';
import StepLabel from "@material-ui/core/StepLabel";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { mdiCartOutline } from '@mdi/js';
import './searchBar.css';

class SearchBar extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            input: "",
            possibleNames: [],
            divLength: window.innerWidth,
            isOpen: false,
        };
        this.updateDisplay = this.updateDisplay.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
    };


    // handleRequestClose = () => {
    //     this.props.togglePopover();
    //   };



    handleClick(isOpen) {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleClose() {

    }

    componentDidMount () {
        Axios.get('http://hallows-search-bar.us-east-2.elasticbeanstalk.com/searches')
        .then (res => {
            console.log(res);
            let items = res.data.map(item => item.name);
            this.setState({
                possibleNames: items
            });
            
        });
    }

    render () {
        document.addEventListener('click', function(event) {
            var isClickInside = document.getElementById("searchBar").contains(event.target);
            if (!isClickInside) {
              setTimeout(function(){ document.getElementById("tab1").style.display = "block"; }, 280);
              setTimeout(function(){ document.getElementById("tab2").style.display = "block"; }, 280);
              setTimeout(function(){ document.getElementById("tab3").style.display = "block"; }, 280);
            } else {
              document.getElementById("tab1").style.display = "none";
              document.getElementById("tab2").style.display = "none";
              document.getElementById("tab3").style.display = "none";
            }
        });
        window.addEventListener("resize", this.updateDisplay);
        const { anchorEl } = this.props;
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
                                {this.state.input !== "" ? this.state.possibleNames.map(name => {
                                    return (
                                        <option value={name} key={name}></option>
                                    )
                                    }) : null
                                }
                            </datalist>
                        </Paper>
                        {
                            this.state.divLength < 905 ?
                            (
                                <div>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={this.handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                    open={this.state.isOpen}
                                    anchorEl={anchorEl}
                                    >
                                        <MenuItem>
                                            <IconButton className="iconPersonSize"
                                                title="MyHallowes"
                                                edge="end"
                                                aria-label="account of current user"
                                                aria-haspopup="true"
                                                color="inherit"
                                            >
                                                <PersonIcon className="iconPerson"/>
                                            </IconButton>
                                        </MenuItem>
                                        <MenuItem>
                                            <IconButton aria-label="Cart" className="iconCartSize">
                                                <Badge badgeContent={3} color="secondary">
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
                                    >
                                        <PersonIcon className="iconPerson"/>
                                    </IconButton>
                                    <IconButton aria-label="Cart" className="iconCartSize">
                                        <Badge badgeContent={3} color="secondary">
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