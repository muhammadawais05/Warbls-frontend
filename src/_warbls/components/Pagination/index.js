import "./styles.css"

import React, { Component } from "react"
import Pagination from "react-js-pagination"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1
    }
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber })
    this.props.setPageNo(pageNumber)
  }

  render() {
    return (
      this.props.total > 49 && (
        <div className="pagination-wrapper">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={50}
            innerClass="pagination-list"
            totalItemsCount={this.props.total}
            activeClass="active-page"
            nextPageText="Next  | > "
            prevPageText="Previous  | <"
            itemClassFirst="first-class"
            itemClassLast="last-class"
            itemClassNext="next-class"
            itemClassPrev="prev-class"
            lastPageText="Last"
            firstPageText="First"
            pageRangeDisplayed={3}
            onChange={this.handlePageChange.bind(this)}
          />
        </div>
      )
    )
  }
}
