import React from "react"
import logo from "@assets/Images/tenant-site/Group6971.png"
import styles from "./index.module.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function EmptyCart({ text }) {
	const history = useHistory();

	const handleRedirect = () => {
		history.push("/categories");
	}
	return (
		<div >
			<div className={styles.bgWrapper}>
				<img src={logo} alt="logo" />
				<div className={styles.someText}>
					<center>
						{text}
					</center>
				</div>
				<button
					className={styles.shoppingBtn}
					onClick = {handleRedirect}
				>
					Continue Shopping
				</button>
			</div>
		</div>
	)
}

export default EmptyCart;
