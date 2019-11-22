import React from "react";
import "./App.scss";
import footerLogo from './assets/footer-logo.svg';
import headerLogo from './assets/nomad-name-only.png';
import cards from './assets/cards.png';
import pin from './assets/pin.svg';

import { Helmet } from "react-helmet";
import Select from "react-select";

class App extends React.Component {
  cityOptions = [
    { value: "Istanbul", label: "Istanbul" },
    { value: "Ankara", label: "Ankara" }
  ];

  cuisineOptions = [
    { value: "Bar", label: "Bar" },
    { value: "Burger", label: "Burger" },
    { value: "Cafe", label: "Cafe" },
    { value: "Desserts", label: "Desserts" },
    { value: "Italian", label: "Italian" },
    { value: "Kebab", label: "Kebab" },
    { value: "Patisserie", label: "Patisserie" },
    { value: "Pizza", label: "Pizza" },
    { value: "Restaurant", label: "Restaurant" },
    { value: "Steak", label: "Steak" },
    { value: "Turkish", label: "Turkish" },
    { value: "World", label: "World" }
  ];

  data = [
    {
      name: "Bar",
      ankara: 0,
      istanbul: 1
    },
    {
      name: "Burger",
      ankara: 0,
      istanbul: 1
    },
    {
      name: "Cafe",
      ankara: 4,
      istanbul: 3
    },
    {
      name: "Desserts",
      ankara: 0,
      istanbul: 2
    },
    {
      name: "Italian",
      ankara: 0,
      istanbul: 1
    },
    {
      name: "Kebab",
      ankara: 10,
      istanbul: 0
    },
    {
      name: "Patisserie",
      ankara: 1,
      istanbul: 0
    },
    {
      name: "Pizza",
      ankara: 1,
      istanbul: 0
    },
    {
      name: "Restaurant",
      ankara: 0,
      istanbul: 4
    },
    {
      name: "Steak",
      ankara: 1,
      istanbul: 0
    },
    {
      name: "Turkish",
      ankara: 1,
      istanbul: 1
    },
    {
      name: "World",
      ankara: 2,
      istanbul: 1
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cuisine: ""
    };
    this.cityDescriptionRef = React.createRef();
    this.cuisineDescriptionRef = React.createRef();
    this.resultRef = React.createRef();
  }

  cityHandler = parameter => {
    this.setState({
      city: parameter.value
    });
    function getNumberOfRestaurants() {
      if (parameter.value === "Istanbul") {
        return "14";
      } else {
        return "20";
      }
    }
    this.cityDescriptionRef.current.innerText = `${getNumberOfRestaurants()} Restaurants in ${
      parameter.value
    }`;
  };

  cuisineHandler = parameter => {
    const cuisine = parameter.value;
    const cityObject = this.data.find(item => item.name === cuisine);
    const cityName = this.state.city;
    const numberOfRestaurants = cityObject[this.state.city.toLowerCase()];

    this.cuisineDescriptionRef.current.innerText = `${numberOfRestaurants} spots in ${cityName}`;
  };

  submitHandler = event => {
    event.preventDefault();
    this.resultRef.current.style.display = "flex";
  }

  render() {
    let ankaraEmbed;
    if (this.state.city === 'Ankara') {
      ankaraEmbed = <>
        <iframe src="https://public.tableau.com/views/BS3D/Sheet2?:showVizHome=n&amp;:embed=true&amp;:display_count=yes" width="1200" height="1200"></iframe>
      </>;
    } else {
      ankaraEmbed = <>
        <iframe src="https://public.tableau.com/views/Istambul_15744501832120/Sheet2?:showVizHome=n&amp;:embed=true&amp;:display_count=yes" width="1200" height="1200"></iframe>
      </>;
    }

    return (
      <div className="App">
        <Helmet>
          <title>Nomad | Powered by Zomato</title>
        </Helmet>
        <header className="header">
          <img className="header__logo" src={headerLogo} alt="logo" />
          <div className="header__container">
            <img className="header__icon" src={pin} />
            <span className="header__country">Turkey</span>
            <span className="header__link">change country</span>
          </div>
        </header>
        <form className="form" onSubmit={this.submitHandler}>
          <div className="form__input-container form--city-container">
            <p className="form__label form--city-label">What city are you going to?</p>
            <Select
              className="form__input form--city-input"
              options={this.cityOptions}
              onChange={this.cityHandler}
            />
            {/* <p
              className="form__description form--city-description"
              ref={this.cityDescriptionRef}
            ></p> */}
          </div>
          <div className="form__input-container form--cuisine-container">
            <p
              className="form__description form--city-description"
              ref={this.cityDescriptionRef}
            ></p>
            <p className="form__label form--cuisine-label">
              What kind of food are you looking for?
            </p>
            <Select
              className="form__input form--cuisine-input"
              options={this.cuisineOptions}
              onChange={this.cuisineHandler}
            />
            <p
              className="form__description form--cuisine-description"
              ref={this.cuisineDescriptionRef}
            ></p>
            <button className="form__button" type="submit">
              Search
            </button>
          </div>
        </form>
        <div className="result" ref={this.resultRef}>
          <div className="result__image-container">
            <p className="result__header">3 Cafe results found in Istanbul</p>
            <img className="result__image" src={cards} alt="cards" />
          </div>
          {ankaraEmbed}
        </div>
        <footer className="footer">
          <img className="footer__logo" src={footerLogo} alt="logo" />
          <p className="footer__email">nomad@zomato.com</p>
        </footer>
      </div>
    );
  }
}

export default App;
