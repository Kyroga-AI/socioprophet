import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./SearchBar.scss";
import {
	Search
} from "carbon-components-react";

class SearchBar extends Component {

	_onInputChange(evt) {
		this.props.onSearchInput(evt.target.value);
	}

	render() {
		const iconClass = styles.iconFilter;

		const searchIcon = (
			<svg className={iconClass} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve">
        <path d="M24,2C11.852,2,2,11.852,2,24c0,12.147,9.852,22,22,22s22-9.853,22-22C46,11.852,36.148,2,24,2z M24,44C12.972,44,4,35.028,4,24S12.972,4,24,4s20,8.972,20,20S35.028,44,24,44z" />
        <rect x="47.757" y="42.101" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -21.5391 52)" width="8.485" height="19.799" />
        <circle cx="42" cy="42" r="2" />
      </svg>
		);

		let barClass = styles.searchBarCarbon;
		if (this.props.narrow) {
			barClass += " " + styles.narrow;
		}

		const searchBarField = (
			<div className={barClass}>
				<Search
					value={this.props.filterText}
					labelText={this.props.placeholderText || ""}
					placeHolderText={this.props.placeholderText || ""}
					closeButtonLabelText=""
					onChange={this._onInputChange.bind(this)}
					id="search-1"
					light={this.props.light || false}
				/>
			</div>
		);

		const className = styles.searchBarContainer;

		const searchBar = (
			<div className={className}>
				{searchIcon}
				{searchBarField}
			</div>
		);

		return searchBar;
	}
}


SearchBar.propTypes = {
	placeholderText: PropTypes.string,
	filterText: PropTypes.string.isRequired,
	onSearchInput: PropTypes.func.isRequired,
	narrow: PropTypes.bool,
	light: PropTypes.bool
};

module.exports = SearchBar;
