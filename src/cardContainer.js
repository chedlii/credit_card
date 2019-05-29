import React from "react";
import CreditCard from "./credit-card";
import FormError from "./formError";

class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      name: "",
      date: "",
      formErrors: { number: "", name: "", date: "" },
      validNumber: false,
      validName: false,
      validDate: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateField = this.vadilateField.bind(this);
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(
      {
        [name]: this.cleanField(name, value)
      },
      () => {
        this.validateField(name, value);
      }
    );
  };

  cleanField = (name, dirtyField) => {
    let regex = "/^(2[0-9]|[0-1][1-2])/([2-9][0-5])$/gi";

    switch (name) {
      case "number":
        return dirtyField.replace(/[\D]/g, "");
      case "name":
        return dirtyField.replace(/[^a-z]/gi, "");

      case "date":
        return dirtyField.replace(/[^0-9]/gi, "");
    }
  };

  vadilateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let validNumber = this.state.validNumber;
    let validName = this.state.validName;
    let validDate = this.state.validDate;

    switch (fieldName) {
      case "number":
        validNumber = value.length === 16;

        fieldValidationErrors.number = validNumber
          ? ""
          : " must be 16 characters and contains no letters";
        break;

      case "name":
        validName = value.length < 20 && value.match(/^[a-zA-Z]*$/);
        fieldValidationErrors.number = validName
          ? ""
          : " must be less than 20 characters and letters only";

        break;

      case "date":
        ///^(\d{2})\/(\d{2})$/
        let regex = "/^[0-9]|[0-1][0-2]";
        validDate = value.match(/^(2[0-9]|[0-1][1-2])([2-9][0-5])$/g);
        fieldValidationErrors.date = validDate ? "" : "invalid ";
        break;

      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        validNumber: validNumber,
        validName: validName,
        validDate: validDate
      },
      this.validateForm
    );
  };

  render() {
    return (
      <div className="card-holder">
        <CreditCard
          number={this.state.number}
          name={this.state.name.toUpperCase()}
          date={this.state.date}
        />
        <form className="card-form">
          <label>
            Number
            <input
              onChange={this.handleChange}
              type="text"
              name="number"
              value={this.state.number}
              placeholder=" enter credit card number"
              maxlength="16"
            />
          </label>
          <label>
            Name:
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              value={this.state.name}
              placeholder=" put your name"
              maxlength="20"
            />
          </label>
          <label>
            Date:
            <input
              onChange={this.handleChange}
              type="text"
              name="date"
              value={this.state.date}
              placeholder="MM/YY"
              maxlength="4"
            />
          </label>
        </form>
        <FormError formErrors={this.state.formErrors} />
      </div>
    );
  }
}

export default CardContainer;
