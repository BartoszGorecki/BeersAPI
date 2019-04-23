import React, { Component } from "react";
import "../style/Home.css";
import SearchBar from "./SearchBar";
import ListItems from "./ListItems";
import Modal from "./Modal";
import axios from "axios";
import { throttled } from "../Helpers";

class Home extends Component {
  state = {
    data: [],
    totalItems: 20,
    searchBeer: "",
    selected: {},
    isOpen: false,
    similar: [],
    loadingSimilar: false,
    scrolling: false,
    page: 1,
    done: false,
    error: false
  };
  componentDidMount() {
    const { totalItems, page } = this.state;
    let url = `https://api.punkapi.com/v2/beers?per_page=${totalItems}&page=${page}`;
    this.getItems(url);
    this.scrollListener = window.addEventListener(
      "scroll",
      throttled(500, () => {
        this.handleScroll();
      })
    );
  }
  componentWillUnmount() {
    window.removeEventListener(this.scrollListener);
  }
  handleScroll = () => {
    const { scrolling, page } = this.state;
    if (scrolling) return;
    if (page < 30) {
      const lastEle = document.querySelector(
        ".li-container > .li-item:last-child"
      );
      const lastEleOffset = lastEle.offsetTop + lastEle.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastEleOffset * .9) {
        this.loadMore();
      }
    } else {
      this.setState({
        done: true
      });
      return;
    }
  };
  loadMore = () => {
    this.setState(
      prevState => ({
        scrolling: true,
        page: prevState.page + 1,
        totalItems: 10
      }),
      () => {
        const { totalItems, page } = this.state;
        let url = `https://api.punkapi.com/v2/beers?per_page=${totalItems}&page=${page}`;
        this.getItems(url);
      }
    );
  };
  getItems = async url => {
    try {
      this.setState({ loading: true });
      let result = await axios(url);
      let data = result.data;
      this.setState({
        data: [...this.state.data, ...data],
        loading: false,
        scrolling: false
      });
    } catch (err) {
      console.log(err);
    }
  };
  handleSearch = e => {
    const { totalItems, searchBeer } = this.state;
    const searchTerm = e.target.value;
    let url = "";
    this.setState({ searchBeer: searchTerm, loading: true, data: [] });
    if (searchBeer === "") {
      url = `https://api.punkapi.com/v2/beers?per_page=${totalItems}`;
    } else {
      url = `https://api.punkapi.com/v2/beers?beer_name=${searchBeer}&per_page=${totalItems}`;
    }
    this.getItems(url);
  };
  showModal = async e => {
    if (e.target.classList.contains("li-image")) {
      const selected = this.state.data.filter(item =>
        item.name.startsWith(
          e.target.parentElement.querySelector(".li-title").innerText
        )
      );
      this.setState({ selected, isOpen: true, similar: [] }, () =>
        this.getSimilar()
      );
      this.toggleScrollLock();
    }
  };
  getSimilar = async () => {
    const { ibu, ebc, abv } = this.state.selected[0];
    try {
      this.setState({ loadingSimilar: true });
      const result = await axios(
        `https://api.punkapi.com/v2/beers?abv_gt=${parseInt(
          abv - 2
        )}&abv_lt=${parseInt(abv + 10)}&ibu_gt=${parseInt(
          ibu - 5
        )}&ibu_lt=${parseInt(ibu + 20)}&ebc_gt=${parseInt(
          ebc || 10
        )}&ebc_lt=${parseInt(ebc + 100)}&per_page=4`
      );
      const similar = result.data
        .filter(item => item.id !== this.state.selected[0].id)
        .slice(0, 3);
      this.setState({ similar, loadingSimilar: false, error: false });
    } catch (err) {
      console.log(err);
      this.setState({ error: true})
    }
  };
  closeModal = () => {
    this.setState({ isOpen: false });
    this.toggleScrollLock();
  };
  toggleScrollLock = () =>
    document.querySelector("html").classList.toggle("lock-scroll");
  render() {
    console.log('render z HOME')
    const {
      data,
      searchBeer,
      isOpen,
      selected,
      similar,
      loadingSimilar,
      done,
      error
    } = this.state;
    const modalProps = {
      loadingSimilar,
      similar,
      error,
      ariaLabel: "Information about selected alcohol",
      selected,
      closeModal: this.closeModal,
      toggleScrollLock: this.toggleScrollLock
    };
    return (
      <main className="home-container">
        <SearchBar handleSearch={this.handleSearch} value={searchBeer} />
        <ListItems data={data} done={done} showModal={this.showModal} />
        {isOpen && <Modal {...modalProps} />}
      </main>
    );
  }
}
export default Home;
