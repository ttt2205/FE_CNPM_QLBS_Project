import banner1 from "assets/images/banner1.png";
import banner2 from "assets/images/banner2.png";
import banner3 from "assets/images/banner3.png";
import banner4 from "assets/images/banner4.png";
import boardgameImg from "assets/images/boardgame.png";
import sgkImg from "assets/images/anh1.webp";
import vanhocImg from "assets/images/vanhoc.png";
import thieunhiImg from "assets/images/thieunhi.png";
import ngoaivanImg from "assets/images/ngoaivan.png";
import banner6 from "assets/images/book26_v1.jpg";
import banner7 from "assets/images/book26_v2.jpg";
import "assets/scss/homePageUser.scss";
import { Carousel } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import "assets/scss/homePageUser.scss";
import RenderContent from "context/RenderContent";
import { useFetchBooks } from "config/useFetchBook";
import ScrollToTopButton from "components/ScrollToTopButton";
export default function HomePage() {
  const navigate = useNavigate();
  const { books } = useFetchBooks(1, 8);
  console.log(books);
  const handleNavigate = () => {
    navigate("/shopping-trends");
  };
  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`);
  };

  return (
    <main className="flex-fill container">
      <Carousel className=" mb-4 ">
        <Carousel.Item interval={1500}>
          <img src={banner1} alt="banner1" className="main-banner img-fluid" />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img src={banner6} alt="banner6" className="main-banner img-fluid" />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img src={banner7} alt="banner7" className="main-banner img-fluid" />
        </Carousel.Item>
      </Carousel>
      <div className="container d-flex ">
        <img src={banner2} alt="banner2" className="small-banner img-fluid" />
        <img src={banner3} alt="banner3" className="small-banner img-fluid" />
        <img src={banner4} alt="banner4" className="small-banner img-fluid" />
      </div>
      <div className="container mt-4">
        <h3>Danh mục sản phẩm</h3>
        <div className="row text-center product-category">
          <div className="col" onClick={() => handleCategoryClick("Văn học")}>
            <img src={boardgameImg} alt="Văn học" className="img-fluid" style={{ cursor: "pointer" }} />
            <p>Văn học</p>
          </div>
          <div
            className="col"
            onClick={() => handleCategoryClick("Tâm lí-Kĩ năng sống")}
          >
            <img src={sgkImg} alt="Tâm lí-Kĩ năng sống" className="img-fluid" style={{ cursor: "pointer" }} />
            <p>Tâm lí-Kĩ năng sống</p>
          </div>
          <div className="col" onClick={() => handleCategoryClick("Kinh tế")}>
            <img src={vanhocImg} alt="Kinh tế" className="img-fluid" style={{ cursor: "pointer" }} />
            <p>Kinh tế</p>
          </div>
          <div className="col" onClick={() => handleCategoryClick("Sách thiếu nhi")}>
            <img src={thieunhiImg} alt="Sách thiếu nhi" className="img-fluid" style={{ cursor: "pointer" }} />
            <p>Sách thiếu nhi</p>
          </div>
          <div className="col" onClick={() => handleCategoryClick("FICTION")}>
            <img src={ngoaivanImg} alt="FICTION" className="img-fluid" style={{ cursor: "pointer" }} />
            <p>FICTION</p>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <h3 className="section-title">Xu hướng mua sắm</h3>

        <div className="row text-center d-flex">
          <RenderContent books={books} />
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-danger" onClick={handleNavigate}>
            Xem thêm
          </button>
        </div>
      </div>
      <div className="container-fluid mt-4">
        <div className="border-footer"></div>
        
      </div>
    </main>
    
  );
}
