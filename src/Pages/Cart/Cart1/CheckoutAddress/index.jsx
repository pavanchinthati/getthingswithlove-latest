import React, { useEffect, useState } from "react";
import "./index.scss";
import get from "lodash/get";
import edit_icon from "@assets/Images/tenant-site/edit.svg";
import AddressForm from "../AddressForm";
import { tenantAppAPI } from "@api";


export default function CheckoutAddress({
  updateAddress,
  selectedAddress,
  newAddress,
}) {
  const [addresses, setAddresses] = useState([]);
  const [modal, setmodal] = useState(false);
  const [option, setOption] = useState();

  
  function sliceCoordinates(str, word = "coordinates{'lat'", option = -1) {
    if (option == -1)
      return str.substring(0, str.indexOf(word));
    else
      return str.substring(str.indexOf(word), str.length);
  }

  function findWord(str, word) {
    // console.log(str);
    if (str == null || str == '') return false
    return str.indexOf(word) > -1;
  }

  useEffect(() => {
    if (document.querySelector(".edit_address")) {
      if (findWord(selectedAddress, "coordinates{'lat'"))
        document.querySelector(".edit_address").value = sliceCoordinates(selectedAddress, "coordinates{'lat'")
      else
        document.querySelector(".edit_address").value = selectedAddress
    }
  }, [selectedAddress, modal])


  function sliceCoordinates(str, word) {
    return str.substring(0, str.indexOf(word));
  }


  const [edittedAddress, setedittedAddress] = useState("");
  const [edittingpk, setedittingpk] = useState(0);


  useEffect(() => {
    fetchAddressesfunc();
  }, []);

  useEffect(() => {
  }, [edittedAddress]);

  const fetchAddressesfunc = async () => {
    try {
      const res = await tenantAppAPI.fetchAddresses();
      const addresses = get(res, "data.data");
      setAddresses(addresses);

    } catch (error) {
      console.error("Error while fetching saved addresses", error);
    }
  };

  return (
    <div className="checkout-address-wrapper">
      <h5>Delivery Address</h5>
      {addresses && addresses.length > 0 ? (
        <div className="addresses-list">
          {addresses.map((address, ind) => {
            if (ind === 0 || address["value_type"] !== 3) return;

            return (
              <div
                key={address.pk}
                className={`address-card ${address.value === selectedAddress ? "selected" : ""
                  }`}
                onClick={() => updateAddress("selected", address.value)}
              >
                <div className={`circle`}></div>
                {findWord(address.value, "coordinates{'lat'") ? sliceCoordinates(address.value, "coordinates{'lat'") : address.value}
                {address.pk && (
                  <div className="address-icon-wrapper">
                    <img
                      onClick={() => {
                        setOption("edit");
                        setmodal(true);
                        setedittingpk(address.pk);
                      }}
                      className="address-icon-image"
                      src={edit_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            );
          }).reverse()}
        </div>
      ) : null}
      {addresses && addresses.length > 0 && addresses["address"] ? (
        <div className="or">
          <h6>
            <span>or</span>
          </h6>
        </div>
      ) : null}
      <div className="address-form">
        <h5>Add New Address</h5>
        <AddressForm
          labels="true"
          valueTransfer={updateAddress}
          showButton={true}
          fetchAddressesfunc = {fetchAddressesfunc}
        />
      </div>
    </div>
  );
}
