import React, { useState } from "react";
import styles from "./styles.module.css";
import Input from "../Input";
import NavBar from "../NavBar";



const PersonalDetailsForm = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div class={styles.form_personal}>
        <form>
          <h3>
            Personal Details
          </h3>
          <div class={styles.row}>
            <label>
              Title<br></br>
              <select>
                <option selected value="mr">
                  Mr.
                </option>
                <option value="mrs">Mrs.</option>
                <option value="ms">Ms.</option>
              </select>
            </label>
            <Input
              label="First Name"
              type="text"
              name="First Name"
              placeholder="Eg: John"
            ></Input>
            <Input
              label="Last Name"
              type="text"
              name="Last Name"
              placeholder="Eg: Wick"
            ></Input>
          </div>
          <div class={styles.row}>
          <label>
              Gender<br></br>
              <select>
                <option selected value="male">
                  Male
                </option>
                <option value="female">Female</option>
              </select>
            </label>
          <Input
              label="Date of Birth"
              type="date"
              name="Date of Birth"
            ></Input>           
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
