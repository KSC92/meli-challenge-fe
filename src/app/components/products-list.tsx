import React, { useEffect } from "react"
import "../assets/scss/product-item.scss"
import { useLocation, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../reducers/product-reducer"
import { AppDispatch } from "../store"
import { Loading } from "./s-components/loading-icon"
import { ProductItem } from "./product-item"
import { update_breadcrums } from "../reducers/breadcrumb-reducer"

export function ProductSearchList() {
  const dispatch = useDispatch<AppDispatch>()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const param = searchParams.get("search")
  const { data, loading, error } = useSelector((state: any) => state.products)
  useEffect(() => {
    if (param)
      dispatch(getProducts(param || "x")).then((d_) => {
        dispatch(update_breadcrums(d_.payload.categories))
      })
  }, [location, dispatch])
  let content
  switch (loading) {
    case "pendiente":
      content = <Loading />
      break
    case "inactivo":
      if (data.items && data.items.length) {
        content = data.items.map((item_: any) => (
          <ProductItem key={item_.id} item={item_}></ProductItem>
        ))
      } else
        content = (
          <React.Fragment>
            <div className="product-list-empty-response">
              <div className="product-list-empty-response-image"></div>
              <div className="product-list-empty-response-text">
                No existen resultados para mostrar
              </div>
            </div>
          </React.Fragment>
        )
      break
    default:
      break
  }
  return <React.Fragment>{content}</React.Fragment>
}
