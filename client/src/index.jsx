import React from 'react';
import ReactDom from 'react-dom';

class SearchBar extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            input: "",
            suggestions: [],
            possibleNames: ["chair", "chairs", "table", "tables"]
        }
    }

    updateInput () {
        let newInput = document.getElementById("searchInput").value;
        let newSuggestions = this.state.possibleNames.filter((name) => 
            name.substring(0, newInput.length) === newInput
        )
        this.setState({
            input: newInput,
            suggestions: newSuggestions
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
                    {this.state.possibleNames.map(name => {
                        return (
                            <option value={name}></option>
                        )
                    })}
                </datalist>
            </div>
        )

    }
}

ReactDom.render(<SearchBar />, document.getElementById("search"));