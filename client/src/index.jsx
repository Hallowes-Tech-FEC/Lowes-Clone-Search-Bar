import React from 'react';
import ReactDom from 'react-dom';
import Axios from 'axios';

class SearchBar extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            input: "",
            possibleNames: ["chair", "chairs", "table", "tables"]
        }
    }

    updateInput () {
        let newInput = document.getElementById("searchInput").value;
        this.setState({
            input: newInput,
        })
    }

    componentDidMount () {
        Axios.get('/items')
        .then (res => {
            let items = res.data.map(item => item.name);
            this.setState({
                possibleNames: items
            })
        })
    }

    render () {
        return (
            <div>
                <input
                    list="suggestions"
                    id="searchInput"
                    onChange={this.updateInput.bind(this)}
                >
                </input>
                <datalist id="suggestions">
                    {this.state.input !== "" ? this.state.possibleNames.map(name => {
                        return (
                            <option value={name} key={name}></option>
                        )
                    }) : null}
                </datalist>
            </div>
        )

    }
}

ReactDom.render(<SearchBar />, document.getElementById("search"));