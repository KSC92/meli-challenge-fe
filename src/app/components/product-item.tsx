import React from "react"
import "../assets/scss/product-item.scss"
import { Link } from "react-router-dom"
import { reformat_price } from "../commons/common"

export function ProductItem(props: any) {
  const { item } = props
  return (
    <React.Fragment>
      <Link to={`/items/${item.id}`} className="product-item">
        <div
          className="product-img"
          style={{ backgroundImage: "url(" + item.thumbnail + ")" }}
        />
        <div className="product-description">
          <div className="product-price">
            {item.currency_id.symbol + " " + reformat_price(item.price)}
            {item.shipping.free_shipping ? (
              <span className="product-item-free-shipping"></span>
            ) : (
              ""
            )}
          </div>
          <div className="product-item-name">{item.title}</div>
        </div>
        <div className="product-location">
          {item.seller_address.city.name.toLowerCase()}
        </div>
      </Link>
      <hr className="product-item-divider"></hr>
    </React.Fragment>
  )
}
