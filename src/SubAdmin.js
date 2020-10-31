import React, { Component, Fragment } from "react";
import _ from "lodash";
import { Label, FormGroup, Row, Input, Col, Button } from "reactstrap";
import { InitialState } from "./InitialState";
export default class SubAdmin extends Component {
  state = {
    details: InitialState.details
  };
  multiCheck = (e, index) => {
    let details = [...this.state.details],
      checked = e.target.checked; // here checked is 1 only if the parent checkbox is selected
    details.forEach((value, i) => {
      if (index === i) {
        _.set(value, "key", checked ? 1 : 0);
        value.submenu &&
          value.submenu.length > 0 &&
          value.submenu.forEach((item) => {
            _.set(item, "key", checked ? 1 : 0);
            _.set(item.submenu2[0], "key", checked ? 1 : 0);
            _.set(item.submenu2[1], "key", checked ? 1 : 0);
            _.set(item.submenu2[2], "key", checked ? 1 : 0);
          });
      }
    });
    this.setState({ details: details });
  };
  SingleCheck = (e, item, childIndex, ParentIndex) => {
    let details = [...this.state.details],
      checked = e.target.checked,
      checkTotal = 0;
    if (details[ParentIndex]) {
      let parentData = details[ParentIndex];
      _.set(parentData.submenu[childIndex], "key", checked ? 1 : 0);
      parentData.submenu.length > 0 &&
        parentData.submenu.forEach((list) => {
          if (list.key === 1) checkTotal++;
          _.set(
            parentData.submenu[childIndex].submenu2[0],
            "key",
            checked ? 1 : 0
          );
          _.set(
            parentData.submenu[childIndex].submenu2[1],
            "key",
            checked ? 1 : 0
          );
          _.set(
            parentData.submenu[childIndex].submenu2[2],
            "key",
            checked ? 1 : 0
          );
        });
      _.set(parentData, "key", checkTotal <= parentData.submenu.length ? 1 : 0);
      if (checkTotal === 0) _.set(parentData, "key", checkTotal === 0 ? 0 : 1);
    }
    this.setState({ details: details });
  };

  SubmenuCheck = (e, item2, index, j, index2, item) => {
    // here j is the first submenu index
    let details = [...this.state.details],
      checked = e.target.checked,
      checkTotal = 0;
    _.set(details[index].submenu[j].submenu2[index2], "key", checked ? 1 : 0);
    details[index].submenu[j].submenu2.length > 0 &&
      details[index].submenu[j].submenu2.forEach((list) => {
        if (list.key === 1) checkTotal++;
      });
    if (checkTotal <= details[index].submenu[j].submenu2.length) {
      _.set(details[index].submenu[j], "key", 1);
      _.set(details[index], "key", 1);
    }
    console.log(checkTotal, "checkTotal");
    if (checkTotal === 0) {
      if (details[index].submenu.length <= 1) _.set(details[index], "key", 0);
      _.set(details[index].submenu[j], "key", 0);
    }
    let checkChildKey = details[index].submenu.some((check) => check.key === 1);
    if (!checkChildKey) _.set(details[index], "key", 0);
    this.setState({ details });
  };
  onSubmenuCheck = (e, item, j, index, parentChildIndex) => {
    this.setState({ submenuValue: parentChildIndex });
    if (this.state.submenuValue === parentChildIndex)
      this.setState({ submenuValue: false });
    else this.setState({ submenuValue: parentChildIndex });
  };
  sendDetails = () => {
    const { details } = this.state;
    console.log("details array", details);
  };
  render() {
    const { details, submenuValue } = this.state;
    return (
      <div>
        <Row>
          {details &&
            details.length > 0 &&
            details.map((value, index) => {
              return (
                <Col lg={2}>
                  <FormGroup key={index}>
                    <FormGroup check inline>
                      <Input
                        className="ml-1"
                        style={{ cursor: "pointer" }}
                        type="checkbox"
                        name="check"
                        checked={value.key === 1}
                        onChange={(e) => this.multiCheck(e, index)}
                      />
                      <Label
                        className="ml-2"
                        style={{ color: "#922c88", fontWeight: "bold" }}
                        check
                      >
                        {value.name === "Web Series" ? (
                          <span style={{ color: "#E50914" }}>{value.name}</span>
                        ) : (
                          <span style={{ color: "blue" }}>{value.name}</span>
                        )}
                      </Label>
                    </FormGroup>
                    {value &&
                      value.submenu &&
                      value.submenu.length > 0 &&
                      value.submenu.map((item, j) => {
                        return (
                          <Fragment key={j}>
                            <FormGroup check>
                              <Input
                                className="ml-0 mt-4"
                                style={{ cursor: "pointer" }}
                                type="checkbox"
                                name="check"
                                checked={item.key === 1}
                                onChange={(e) =>
                                  this.SingleCheck(e, item, j, index)
                                }
                              />
                              <div className="plusMinus">
                                <Label
                                  check
                                  style={{ color: "black" }}
                                  className="ml-4 mt-3"
                                >
                                  {item.name}
                                </Label>
                                <span
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                    fontSize: "15px"
                                  }}
                                  onClick={(e) =>
                                    this.onSubmenuCheck(
                                      e,
                                      item,
                                      j,
                                      index,
                                      "sub" + j + index
                                    )
                                  }
                                >
                                  {submenuValue === "sub" + j + index ? (
                                    <i
                                      className="fas fa-minus-circle"
                                      style={{ color: "red" }}
                                    />
                                  ) : (
                                    <i
                                      className="fas fa-plus-circle"
                                      style={{ color: "green" }}
                                    />
                                  )}
                                </span>
                              </div>
                            </FormGroup>
                            {submenuValue === "sub" + j + index ? (
                              <div>
                                {item.submenu2 &&
                                  item.submenu2.length > 0 &&
                                  item.submenu2.map((item2, index2) => {
                                    return (
                                      <div>
                                        <FormGroup
                                          style={{
                                            marginLeft: "25px",
                                            marginBottom: "0px",
                                            cursor: "pointer"
                                          }}
                                        >
                                          <Input
                                            style={{ cursor: "pointer" }}
                                            type="checkbox"
                                            name="check"
                                            checked={item2.key === 1}
                                            className="ml-4 mt-3"
                                            onChange={(e) =>
                                              this.SubmenuCheck(
                                                e,
                                                item2,
                                                index,
                                                j,
                                                index2,
                                                item
                                              )
                                            }
                                          />
                                          <Label check>
                                            {item2.name === "View" ? (
                                              <span
                                                className="fa fa-eye ml-5 mt-3"
                                                style={{ color: "#e3a852" }}
                                              />
                                            ) : item2.name === "Add/Edit" ? (
                                              <span
                                                className="far fa-edit ml-5 mt-3"
                                                style={{ color: "#5bc0de" }}
                                              />
                                            ) : item2.name === "Delete" ? (
                                              <span
                                                className="far fa-trash-alt ml-5 mt-3"
                                                style={{ color: "red" }}
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </Label>
                                        </FormGroup>
                                      </div>
                                    );
                                  })}
                              </div>
                            ) : (
                              ""
                            )}
                          </Fragment>
                        );
                      })}
                  </FormGroup>
                </Col>
              );
            })}
        </Row>
        <Row className="text-center">
          <Col>
            <Button
              className="btn btn-outline-success"
              onClick={this.sendDetails}
            >
              Send
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
