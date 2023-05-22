import "../../assets/scss/search-input.scss"

export function SearchInput() {
  return (
    <div className="search-input">
      <input type="text" placeholder="Nunca dejes de buscar"/>
      <div className="suffix"></div>
    </div>
  )
}
