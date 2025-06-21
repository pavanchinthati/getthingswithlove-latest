import React, { useState, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import EmptyData from "./EmptyRecentOrder";
import Subtotal from "./Subtotal";
import defaultImage from "@assets/Images/tenant-site/default-image.png";
import { useDispatch, useSelector } from "react-redux";
import defaultStyles from "./index.module.scss";
import CountDown from "./CountDown";
import { checkIsLoggedIn } from "@utils/tenant-site-utils";
import { useHistory } from "react-router-dom";
import Loader from "@components/Loader";

const Layout1 = () => {
    const [orderID, setOrderID] = useState(null);
    const [items, setItems] = useState(null);
    const [checkoutTime, setCheckoutTime] = useState("");
    const [total, settotal] = useState(0);
    const [costs, setCosts] = useState(null);
    const [quantity, setquantity] = useState(0);
    const [delivered, setdelivered] = useState(true);
    const [deliveryCharge, setDeliveryCharge] = useState(10)
    const [orderType, setisExpress] = useState("");
    const [promotionalDiscountCode, setPromotionalDiscountCode] = useState("");
    const [discount, setDiscount] = useState("")
    const [paymentmode, setpaymentMode] = useState("")
    const [page, setPage] = useState(1)
    const [totalpage, setTotalpage] = useState(0)
    const dispatch = useDispatch();6778
    const date = new Date();
    const history = useHistory();

    const { orders, isLoading } = useSelector(state => state.tenantSiteRecentOrders);
    const tenantId = useSelector(state => state.tenantDetails.tenantId);


    useEffect(() => {
        let isLoggedIn = checkIsLoggedIn(tenantId);
        if (!isLoggedIn) {
            // history.push("/");
        } else {
            if (orders === null) {
                dispatch({ type: 'FETCH_TENANT_SITE_RECENT_ORDERS' });
            }
        }
    }, []);


    useEffect(() => {
        if (orders && orders.length > 0) {
            setOrderID(orders[0].id);
            setItems(orders[0].items);
            setCheckoutTime(orders[0].created_on);
            setdelivered(orders[0].delivered);
            setDeliveryCharge(orders[0].delivery_charge)
            setisExpress(orders[0].delivery_type);
            setCosts(orders[0].total_price);
            setpaymentMode(orders[0].mode_of_payment)
        }
    }, [orders]);

    useEffect(() => {
        let sum = 0;
        let totalQuantity = 0;
        if (items) {
            items.map((item) => {
                sum += parseFloat(item.final_price);
                totalQuantity += parseInt(item.quantity);
                // console.log(sum);
            });
            settotal(sum.toFixed(2));
            setquantity(totalQuantity);
        }
        setDiscount(items && items.length > 0 ? items[0].discount_code ? items[0].discount_code.code : "" : "")
    }, [items]);
    const handlepreviousOrder = () => {
        if (page < totalpage) {
            setPage(page + 1)
        }
    }
    // console.log(orders)

    return (
        <div className={defaultStyles.activeOrderWrapper}>
            {
                isLoading
                    ?
                    <div className={defaultStyles.recentOrdersLoader}>
                        <Loader />
                        <p>Loading Recent Orders...</p>
                    </div>
                    :
                    <>
                        {orders && orders?.length > 0 ? (
                            <>
                                <div className={defaultStyles.activeOrders}>
                                    <h2>Order Details </h2>
                                    <p>Order ID: #{orderID}</p>
                                    {promotionalDiscountCode?.code && 
                                    promotionalDiscountCode?.value && (
                                        <div className={defaultStyles.discountCardActiveOrders}>
                                            <React.Fragment>
                                                {promotionalDiscountCode.discount_code_type === "A" ? (
                                                    <div>
                                                        <div>
                                                            Thanks For Purchasing! Use code{" "}
                                                            <span className={defaultStyles.highlightMessage}>
                                                                {promotionalDiscountCode.code}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            and get flat <span className={defaultStyles.rupee}>₹</span>{promotionalDiscountCode?.value} off on minimum
                                                            order value of <span className={defaultStyles.rupee}>₹</span>{promotionalDiscountCode?.minimum_order_value} on your next order !!
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div>
                                                            Thanks For Purchasing, Use code{" "}
                                                            <span className={defaultStyles.highlightMessage}>
                                                                {promotionalDiscountCode.code}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            and get {promotionalDiscountCode.value} % off upto{" "}
                                                            <span className={defaultStyles.rupee}>₹</span>{promotionalDiscountCode.maximum_discount} for minimum order
                                                            value of <span className={defaultStyles.rupee}>₹</span>{promotionalDiscountCode.minimum_order_value} on
                                                            your next order !!
                                                        </div>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        </div>
                                    )}
                                    <div className={defaultStyles.activeOrderContainer}>
                                        {orders && orders.length > 1 && (
                                            <div className={defaultStyles.activeOrderCardContainer}>
                                                {orders.map((item, index) => {
                                                    return (
                                                        <div
                                                            className={
                                                                item.id === orderID
                                                                    ? `${defaultStyles.activeOrderCard} ${defaultStyles.highlightOrder}`
                                                                    : `${defaultStyles.activeOrderCard}`
                                                            }
                                                            onClick={() => {
                                                                setOrderID(item.id);
                                                                setItems(item.items);
                                                                setCheckoutTime(item.created_on);
                                                                setdelivered(item.delivered);
                                                                setisExpress(item.delivery_type);
                                                                setCosts(item.total_price);
                                                                setDeliveryCharge(item.delivery_charge)
                                                                setpaymentMode(item.mode_of_payment)
                                                                console.log(item, item.mode_of_payment)

                                                            }}
                                                        >
                                                            <img src={defaultImage} alt="deliveryicon" />
                                                            <p>Order ID: {item.id}</p>
                                                            <p>
                                                                Placed at: {date.toDateString(item.created_on)}
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                                {totalpage !== page ?
                                                    <center>
                                                        <button
                                                            onClick={handlepreviousOrder}
                                                            className="btn load-more"
                                                        >
                                                            Load More
                                                        </button>
                                                    </center> : null
                                                }


                                                <div className={defaultStyles.spacer}>
                                                    {" "}
                                                </div>
                                            </div>
                                        )}
                                        <div className={defaultStyles.activeOrderDetails}>
                                            <div className={defaultStyles.checkoutProductList}>
                                                {items
                                                    ? items.map((item, index) => {
                                                        return (
                                                            <CheckoutProduct
                                                                product={item.title}
                                                                photo={item.photo ? item.photo : defaultImage}
                                                                price={item.price / item.quantity}
                                                                final_price={item.final_price}
                                                                description={item.description}
                                                                quantity={item.quantity}
                                                                key={index}
                                                                removeItem={() => { }}
                                                                id={item.id}
                                                                readyOnly={true}
                                                                showStrikeThrough={true}
                                                                discount={item.discount_code.code}
                                                            />
                                                        );
                                                    })
                                                    : null}
                                            </div>
                                            <div className={defaultStyles.activeOrderTotal}>
                                                <Subtotal final_price={total} final_item={quantity} deliveryCharge={deliveryCharge} total_final_cost={costs} discount_code={discount} paymentmode={paymentmode} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={defaultStyles.activeTimer} key={checkoutTime}>
                                    <CountDown
                                        orderID={orderID}
                                        checkoutTime={checkoutTime}
                                        delivered={delivered}
                                        key={delivered}
                                        isExpress={false}
                                    />
                                </div>
                            </>
                        ) : (
                            <EmptyData text={"No Order Found"} />
                        )}
                    </>
            }
        </div>
    );
};

export default Layout1;
