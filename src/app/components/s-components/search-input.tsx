import { useNavigate, useSearchParams } from "react-router-dom"
import "../../assets/scss/search-input.scss"

export function SearchInput() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const onkeyup = (event: any) => {
    event.preventDefault()
    if (event.key == "Enter") {
      navigate(`/items?search=${event.target.value}`)
    }
  }
  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Nunca dejes de buscar"
        onKeyUp={onkeyup}
      />
      <div className="suffix"></div>
    </div>
  )
}
