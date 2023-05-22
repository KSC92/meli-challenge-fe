import React, { useEffect } from "react"
import "../assets/scss/product-item.scss"
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../reducers/product-reducer"
import { AppDispatch } from "../store"
import { Loading } from "./s-components/loading-icon"
import { ProductItem } from "./product-item"

export function ProductSearchList() {
  const dispatch = useDispatch<AppDispatch>()
  const [searchParams] = useSearchParams()
  const param = searchParams.get("search")
  const { data, loading, error } = useSelector((state: any) => state.products)
  if (param)
    useEffect(() => {
      dispatch(getProducts(param))
    }, [dispatch])
  let content
  switch (loading) {
    case "pendiente":
      content = <Loading />
      break
    case "inactivo":
      if (data.items)
        content = data.items.map((item_: any) => (
          <ProductItem key={item_.id} item={item_}></ProductItem>
        ))
      else content = <div></div>
      break
    default:
      break
  }
  return <React.Fragment>{content}</React.Fragment>
}
