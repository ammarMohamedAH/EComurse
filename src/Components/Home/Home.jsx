import { Helmet } from "react-helmet";
import CategorySlider from "../CategorySlider/CategorySlider";
import Header from "../Header/Header";
import ProductItem from "../ProductItem/ProductItem";

export default function Home() {
  return (
    <>
    <Helmet>
                  <title>Home</title>
                </Helmet>
      <Header></Header>
      <CategorySlider></CategorySlider>
      <ProductItem></ProductItem>
    </>
  )
}
