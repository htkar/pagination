/**
 * Created by Jeffry on 2015/8/27.
 */

'use strict';

var React = require('react');

var Pagination = React.createClass({
    getInitialState: function() {
        return {showPages: this.props.showPages || 5};
    },

    componentDidMount: function () {
    },
    componentWillUnmount: function() {
    },
    generateClickCallback: function(pageIndex) {
        var that = this;
        return function(e) {
            typeof that.props.onChange === "function" && that.props.onChange(pageIndex);
        };
    },
    getDisplayPageList: function(currentPage, totalPages) {
        var showPages = this.state.showPages > totalPages ? totalPages : this.state.showPages,
            startPage = 0,
            endPage = 0,
            half = 0,
            displayPageList = [];
        if (showPages%2 > 0) {
            half = Math.floor(showPages/2);
        } else {
            half = showPages/2
        }
        startPage = currentPage - half;

        if (startPage < 1) {
            startPage = 1;
        }
        endPage = startPage + showPages - 1;
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = endPage - showPages + 1;
        }
        for (var i = startPage; i <= endPage; i++) {
            displayPageList.push(i);
        }
        return displayPageList;
    },
    render: function() {
        var pages,
            currentPage;

        currentPage = this.props.currentPage;

        pages = this.getDisplayPageList(currentPage, this.props.totalPages);

        return (
            <nav className={"pagination-container" + ((this.props.totalElements === 0 || this.props.totalPages === 1) ? " hide" : "")}>
                <ul className="pagination">
                    <li className={currentPage === 1 ? "disabled" : ""} onClick={currentPage === 1 ? null : this.generateClickCallback(1)}>
                        <a href="javascript: void(0)" aria-label="First">
                            <span aria-hidden="true">First</span>
                        </a>
                    </li>
                    <li className={currentPage === 1 ? "disabled" : ""} onClick={currentPage === 1 ? null : this.generateClickCallback(currentPage - 1)}>
                        <a href="javascript: void(0)" aria-label="Previous">
                            <span aria-hidden="true">Previous</span>
                        </a>
                    </li>
                    {pages.map((pageIndex, index) => (
                        <li key={"pagination." + pageIndex} className={currentPage === pageIndex ? "active" : ""} onClick={this.generateClickCallback(pageIndex)}>
                            <a href="javascript: void(0)">{pageIndex}</a>
                        </li>
                    ))}
                    <li className={currentPage === this.props.totalPages ? "disabled" : ""} onClick={currentPage === this.props.totalPages ? null : this.generateClickCallback(currentPage + 1)}>
                        <a href="javascript: void(0)" aria-label="Next">
                            <span aria-hidden="true">Next</span>
                        </a>
                    </li>
                    <li className={currentPage === this.props.totalPages ? "disabled" : ""} onClick={currentPage === this.props.totalPages ? null : this.generateClickCallback(this.props.totalPages)}>
                        <a href="javascript: void(0)" aria-label="Last">
                            <span aria-hidden="true">Last</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
});
module.exports = Pagination;
