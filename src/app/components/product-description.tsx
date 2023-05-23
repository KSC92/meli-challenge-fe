import React, { useEffect } from "react"
import "../assets/scss/product-description.scss"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store"
import { useParams, useSearchParams } from "react-router-dom"
import { getProduct } from "../reducers/product-item-reducer"
import { Loading } from "./s-components/loading-icon"
import { reformat_price } from "../commons/common"

export function ProductDescription() {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()
  const { data, loading, error } = useSelector((state: any) => state.product)
  console.log(id)
  const getState = (s_: string) => {
    switch (s_) {
      case "new":
        return "Nuevo"
      case "used":
        return "Usado"
      default:
        return ""
    }
  }
  useEffect(() => {
    if (id) dispatch(getProduct(id))
  }, [location, dispatch])
  let content
  switch (loading) {
    case "pendiente":
      content = <Loading />
      break
    case "inactivo":
      if (data.item) {
        content = (
          <div className="product-description">
            <div className="product-description-top-panel">
              <div
                className="product-description-left-panel"
                style={{ backgroundImage: `url(${data.item.picture})` }}
              ></div>
              <div className="product-description-right-panel">
                <div className="product-description-state-and-sell">
                  {getState(data.item.condition) +
                    " - " +
                    data.item.sold_quantity +
                    " " +
                    (data.item.sold_quantity <= 1 ? "vendido" : "vendidos")}
                </div>
                <div className="product-description-title">
                  {data.item.title}
                </div>
                <div className="product-description-price">
                  {data.item.price.currency +
                    " " +
                    reformat_price(data.item.price.amount)}
                </div>
                <div className="product-description-buy-button">
                  <button>Comprar</button>
                </div>
              </div>
            </div>
            <div className="product-description-bottom-panel">
              <div className="product-description-des-title">
                Descripción del producto
              </div>
              <div className="product-description-text">
                {data.item.description}
              </div>
            </div>
          </div>
        )
      } else content = <div></div>
      break
    default:
      break
  }
  return <React.Fragment>{content}</React.Fragment>
}
