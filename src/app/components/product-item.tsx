import "../assets/scss/product-item.scss"

export function ProductItem(props: any) {
  const { item } = props
  return (
    <div className="product-item">
      <img src={item.thumbnail} className="product-img" />
    </div>
  )
}
