import "./index.scss";
import React, { useEffect, useState } from "react";
import InputField from "../InputField"
import { toast } from "react-toastify";
import { tenantAppAPI } from "@api";
import { useDispatch } from "react-redux";
import { actionsCreator } from '@redux/actions/actionsCreator';
import useGeoLocation from "@hooks/useGeoLocation";
import LocationPopUp from "../LocationPopUp";

const AddressForm = (props) => {
  const {fetchAddressesfunc} = props;

  const [addressLine1, setaddressLine1] = useState("");
  const [addressLine2, setaddressLine2] = useState("");
  const [pinCode, setpinCode] = useState("");
  const [area, setArea] = useState("");

  const location = useGeoLocation();
  const [completeAddress, setcompleteAddress] = useState(null);
  const [coordinates, setcoordinates] = useState({ lat: "", lng: "", link: "" })
  useEffect(() => {
    let temp = {
      lat: "",
      lng: ""
    }
    // if (props.isSignup) {
    if (location.loaded && location.coordinates)
      temp = {
        lat: JSON.stringify(location.coordinates.lat),
        lng: JSON.stringify(location.coordinates.lng),
        link: 'https://www.google.com/maps/search/?api=1&query=' + JSON.stringify(location.coordinates.lat) + '%2C' + JSON.stringify(location.coordinates.lng) + ''
      }
    setcoordinates(temp)
    // console.log(temp)
    // }
  }, [location])

  const dispatch = useDispatch();

  const addressToString = (input) => {
    if (input) return input.replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g, " ");
  };

  const resetForm = () => {
    setaddressLine1("");
    setaddressLine2("");
    setpinCode("");
  }
  const addAddress = async (address, x = 3) => {
    try {
      const payload = {
        value: address,
        value_type: x,
        pk: "",
      };
      const res = await tenantAppAPI.addAddresses(payload);
      fetchAddressesfunc();
      resetForm();
      if (res) {
        toast.success("Address is added successfully");
      }
    } catch (error) {
      toast.error("Error while adding address");
    }
  };

  useEffect(() => {
    if (props.isSignup !== true) {
      if (addressLine1 !== "") {
        setcompleteAddress(addressLine1 + "\n" + addressLine2 + "\n" + pinCode + "coordinates{'lat':" + coordinates.lat + ",'long':" + coordinates.lng + ",'link':" + coordinates.link + "}");
        props.valueTransfer("new", addressToString(completeAddress));
      }
    } else {
      props.addressSetter(" ", area, coordinates);
    }
  }, [area, addressLine1, addressLine2, pinCode, coordinates]);




  useEffect(() => {
    let submitBtn = document.querySelector(".address-submit-button");
    if (submitBtn) {
      if (completeAddress === null) {
        submitBtn.disabled = true;
      }
      else {
        submitBtn.disabled = false;
      }
    }
  }, [completeAddress]);

  useEffect(() => {
    if (!props.isSignup)
      if (addressLine1 === "") setcompleteAddress(null);
  }, [area, addressLine1]);


  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (completeAddress)
      addAddress(completeAddress);
    else if (coordinates) {
      addAddress(coordinates, 4);
    }
    else toast.error("Empty Fields");
  }

  const [modal, setmodal] = useState(true)
  return (
    <form className="address-form-wrapper" onSubmit={handleSubmitForm}>
      {location.error ? <LocationPopUp show={modal} onClose={setmodal} /> : null}
      {!props.isSignup && <>
        <InputField
          onChange={(e) => setaddressLine1(e.target.value)}
          placeholder={!props.labels ? "Address Line 1" : ""}
          label={props.labels ? "Address Line 1" : ""}
        />
        <InputField
          onChange={(e) => setaddressLine2(e.target.value)}
          placeholder={!props.labels ? "Address Line 2" : ""}
          label={props.labels ? "Address Line 2" : ""}
        />
        <InputField
          onChange={(e) => {
            if (pinCode < 9999999) setpinCode(e.target.value);
          }}
          placeholder={!props.labels ? "Address Line Pin Code" : ""}
          label={props.labels ? "Pin Code" : ""}
          type="number"
          max="999999"
          value={pinCode >= 9999999 ? pinCode : null}
        />
        {props.showButton && <br />}

        {props.showButton ? (
          <button
            type="submit"
            classname="address-submit-button"
          >
            Save Address
          </button>
        ) : null}
      </>}
    </form>
  );
};

export default AddressForm;
