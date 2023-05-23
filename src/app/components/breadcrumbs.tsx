import { useSelector } from "react-redux"
import "../assets/scss/breadcrumbs.scss"
import { selectBreadcrumbs } from "../reducers/breadcrumb-reducer"

export function BreadCrumbs() {
  const bc = useSelector(selectBreadcrumbs)
  return (
    <div className="breadcrumbs">
      {bc && bc.map((e, i) => (
        <span key={e}>
          {e} {i < bc.length - 1 ? " > " : ""}
        </span>
      ))}
    </div>
  )
}
