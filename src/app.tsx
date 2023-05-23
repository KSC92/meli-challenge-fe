import { Provider } from "react-redux"
import "./app/assets/scss/app.scss"
import { BreadCrumbs } from "./app/components/breadcrumbs"
import { Navbar } from "./app/components/navbar"
import { store } from "./app/store"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ProductSearchList } from "./app/components/products-list"
import { ProductDescription } from "./app/components/product-description"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="main">
          <Navbar />
          <div className="content">
            <BreadCrumbs />
            <div className="view-container">
              <Routes>
                <Route path="/items/:id" element={<ProductDescription />} />
                <Route path="/items" element={<ProductSearchList />} />
                <Route path="/" element={<ProductSearchList />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  )
}



export default App
