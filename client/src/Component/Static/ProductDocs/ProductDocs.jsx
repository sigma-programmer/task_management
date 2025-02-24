import React from "react";
import "./ProductDocs.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { BsBoxSeam, BsListNested } from "react-icons/bs";
import { SlBookOpen } from "react-icons/sl";
import Image from "../../Images/IMG 15.png";
import Image1 from "../../Images/IMG 16.png";
import Image2 from "../../Images/IMG 17.png";
import Image3 from "../../Images/IMG 18.png";
import Image4 from "../../Images/IMG 21.png";
import Image5 from "../../Images/IMG 22.png";
import Image6 from "../../Images/IMG 23.png";
import Image7 from "../../Images/IMG 24.png";
import Image8 from "../../Images/IMG 25.png";
import Image9 from "../../Images/img 6.png";
import Image10 from "../../Images/img 5.png";
import Image11 from "../../Images/img 4.png";
import Image12 from "../../Images/img 3.png";
import Image13 from "../../Images/img 2.png";
import Image14 from "../../Images/img 1.png";
import WikiImage from "../../Images/IMG 26.png";
import { TbCodeDots } from "react-icons/tb";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaPlay } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";
import { GiBubbles } from "react-icons/gi";

const ProductDocs = () => {
  return (
    <>
      <Navbar />

      <div className="ProductDocs">
     
        {/* Main Content */}
        <Container className="main-content mt-5 mb-5">
          <Row className="align-items-center FirstRowProductDocs">
            <Col lg={5} md={6} sm={12} className="text-content">
              <h1 className="display-4 text-bold">
                The next gen <br /> of notes & docs
              </h1>
              <p>
                Simple. Powerful. Beautiful. Communicate more efficiently with
                Intaskr's flexible building blocks.
              </p>
              <Button className="getBtn">Get Intaskr free &rarr;</Button>
            </Col>

            <Col lg={7} md={6} sm={12} className="image-content mt-4 mt-md-0">
              <img src={Image} alt="Illustration" className="img-fluid" />
            </Col>
          </Row>

          {/* Section Cards */}
          <Row className="section-cards mt-5">
  <Col lg={3} md={6} sm={12} xs={12} className="mb-3">
    <Card className="text-left custom-card CustomCard">
      <Card.Body>
        <div className="icon-wrapper-left IconWrapperLeft">
          <BsBoxSeam size={20} className="custom-icon" />
        </div>
        <Card.Title>Meeting Notes</Card.Title>
        <Card.Text>
          Connect people & projects with updates & action items.
        </Card.Text>
        {/* <a href="/" className="link text-bold">
          Duplicate Template &rarr;
        </a> */}
      </Card.Body>
    </Card>
  </Col>

  <Col lg={3} md={6} sm={12} xs={12} className="mb-3">
    <Card className="text-left custom-card CustomCard">
      <Card.Body>
        <div className="icon-wrapper-left IconWrapperLeft">
          <BsBoxSeam size={20} className="custom-icon" />
        </div>
        <Card.Title>Design System</Card.Title>
        <Card.Text>
          All your company's design assets in one place.
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>

  <Col lg={3} md={6} sm={12} xs={12} className="mb-3">
    <Card className="text-left custom-card CustomCard">
      <Card.Body>
        <div className="icon-wrapper-left IconWrapperLeft">
          <BsBoxSeam size={20} className="custom-icon" />
        </div>
        <Card.Title>Project Requirements</Card.Title>
        <Card.Text>A customizable PRD for every project.</Card.Text>
      </Card.Body>
    </Card>
  </Col>

  <Col lg={3} md={6} sm={12} xs={12} className="mb-3">
    <Card className="text-left custom-card CustomCard">
      <Card.Body>
        <div className="icon-wrapper-left IconWrapperLeft">
          <BsBoxSeam size={20} className="custom-icon" />
        </div>
        <Card.Title>Pitch Deck</Card.Title>
        <Card.Text>
          Tell your company's story in a dynamic way.
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
</Row>








          {/* Info Section */}
    {/* Info Section */}
<Row className="info-section">
  {/* First Section */}
  <Col xs={12} md={8} sm={8} className="d-flex align-items-center">
    <h2 className="info-heading1">
      Never write a progress <br /> update again.
    </h2>
  </Col>
  <Col xs={12} md={4} sm={4} className="d-flex align-items-center justify-content-center">
    <img
      src={Image1}
      alt="Info 1"
      className="info-image"
      height="359"
      width="222"
    />
  </Col>

  {/* Second Section */}
  <Col xs={12} className="d-flex flex-wrap align-items-center">
  <Col 
    xs={{ order: 2 }} 
    md={{ order: 1, span: 4 }} 
    sm={{ order: 2, span: 4 }} 
    className="d-flex align-items-center justify-content-center"
  >
    <img
      src={Image2}
      alt="Info 2"
      className="info-image"
      height="359"
      width="222"
    />
  </Col>
  
  <Col 
    xs={{ order: 1 }} 
    md={{ order: 2, span: 8 }} 
    sm={{ order: 1, span: 8 }} 
    className="d-flex align-items-center"
  >
    <h2 className="info-heading2">Get the answer in seconds.</h2>
  </Col>
</Col>


  {/* Third Section */}
  <Col xs={12} md={8} sm={8} className="d-flex align-items-center">
    <h2 className="info-heading1">
      Start with a template. <br /> Build anything.
    </h2>
  </Col>
  <Col xs={12} md={4} sm={4} className="d-flex align-items-center justify-content-center">
    <img
      src={Image3}
      alt="Info 3"
      className="info-image"
      height="359"
      width="222"
    />
  </Col>
</Row>












          <Container className="go-beyond-section my-5 ">
          <div className="col-sm-12 d-flex align-items-center justify-content-center text-center">

            <h2 className="GoBeyoundText mb-4">
              Go way beyond text & bullet points
            </h2>
          </div>
            <Row className="section-cards2 justify-content-center">
              <Col lg={4} md={6} sm={12} className="mb-3">
                <Card className="text-left custom-card2">
                  <Card.Body>
                    <div className="icon-wrapper-left2">
                      <TbCodeDots size={30} className="custom-icon" />
                    </div>
                    <Card.Title>Code snippets</Card.Title>
                    <Card.Text>
                      Native syntax highlighting for dozens of languages.
                    </Card.Text>
                  </Card.Body>
                  <img
                    src={Image14}
                    alt="Comment interface"
                    className="img-fluid rounded imgs"
                  />
                </Card>
              </Col>

              <Col lg={4} md={6} sm={12} className="mb-3">
                <Card className="text-left custom-card2">
                  <Card.Body>
                    <div className="icon-wrapper-left2">
                      <FaPlay size={30} className="custom-icon" />
                    </div>
                    <Card.Title>Toggles</Card.Title>
                    <Card.Text>
                      Collapsible sections make your docs easy to read.
                    </Card.Text>
                  </Card.Body>
                  <img
                    src={Image13}
                    alt="Comment interface"
                    className="img-fluid rounded imgs"
                  />
                </Card>
              </Col>

              <Col lg={4} md={6} sm={12} className="mb-3">
                <Card className="text-left custom-card2">
                  <Card.Body>
                    <div className="icon-wrapper-left2">
                      <IoMdImages size={30} className="custom-icon" />
                    </div>
                    <Card.Title>Images & videos</Card.Title>
                    <Card.Text>
                      Embed directly from Loom & YouTube, or upload your own.
                    </Card.Text>
                  </Card.Body>
                  <img
                    src={Image12}
                    alt="Comment interface"
                    className="img-fluid rounded imgs"
                  />
                </Card>
              </Col>

              <Col lg={4} md={6} sm={12} className="mb-3">
                <Card className="text-left custom-card2">
                  <Card.Body>
                    <div className="icon-wrapper-left2">
                      <BsListNested size={30} className="custom-icon" />
                    </div>
                    <Card.Title>Table of contents</Card.Title>
                    <Card.Text>
                      Click to jump to a section. Updates automatically.
                    </Card.Text>
                  </Card.Body>
                  <img
                    src={Image11}
                    alt="Comment interface"
                    className="img-fluid rounded imgs"
                  />
                </Card>
              </Col>

              <Col lg={4} md={6} sm={12} className="mb-3">
                <Card className="text-left custom-card2">
                  <Card.Body>
                    <div className="icon-wrapper-left2">
                      <GiBubbles size={30} className="custom-icon" />
                    </div>
                    <Card.Title>Math equations</Card.Title>
                    <Card.Text>
                      You've never seen math look this beautiful.
                    </Card.Text>
                  </Card.Body>
                  <img
                    src={Image10}
                    alt="Comment interface"
                    className="img-fluid rounded imgs"
                  />
                </Card>
              </Col>

              <Col lg={4} md={6} sm={12} className="mb-3">
                <Card className="text-left custom-card2">
                  <Card.Body>
                    <div className="icon-wrapper-left2">
                      <TbCodeDots size={30} className="custom-icon" />
                    </div>
                    <Card.Title>And 50+ more content types</Card.Title>
                    <Card.Text>
                      Like a bottomless box of building blocks...
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>

          {/* Testimonial Section */}
          <Row className="testimonial-section justify-content-center">

          <div className="col-sm-12 d-flex align-items-center justify-content-center text-center">

<h2 className="GoBeyoundText mb-4">
  
              Store docs where people <br /> can easily find them
</h2>
</div>
           
           <Row className="mt-5">
  <Col lg={6} md={12} sm={12} className="mb-4 d-flex">
    <div className="testimonial-card d-flex flex-column">
      <h5>
        <strong>Every team's files, at a glance</strong>
      </h5>
      <p className="testimonial-text">
        Intaskr’s sidebar keeps your workspace organized no matter how fast you
        grow.
        <br />
        <br />
        Keep your documents at your fingertips with Intaskr's intuitive storage
        feature. Easily upload, organize, and categorize all your important
        files in one centralized location. With powerful search capabilities and
        customizable tags, finding the documents you need is quick and
        hassle-free. Intaskr ensures your files are always accessible, whether
        you're working solo or collaborating with a team, making it the perfect
        tool for seamless document management.
      </p>
    </div>
  </Col>

  <Col lg={6} md={12} sm={12} className="mb-4 d-flex">
    <div className="testimonial-card d-flex flex-column">
      <h2 className="highlighted">Intubeweb</h2>
      <p className="testimonial-text-l">
        Having clear, searchable documentation in Intaskr saves everyone a lot
        of time and prevents a lot of mistakes.
      </p>
      <div className="testimonial-author mt-auto">
        Amar Deep <br />
        <span className="testimonial-subtitle">
          Co-founder, Intubeweb
        </span>
      </div>
    </div>
  </Col>
</Row>

          </Row>

          {/* Team Collab Section */}
          <Row className="team-collaboration-section justify-content-center">
  <Col lg={10} md={12}>
    <Row className="align-items-center">
      <Col lg={9} md={12}>
        <h2 className="text-left mb-3 mb-lg-0">
          Get your team on the{" "}
          <br className="d-none d-lg-inline" />
          same page, literally
        </h2>
      </Col>
      <Col lg={3} md={12} className="text-center text-lg-right text-sm-right">
        <img
          src={Image4}
          alt="Team collaboration"
          className="img-fluid header-image"
        />
      </Col>
    </Row>
    <Row className="align-items-stretch">
      <Col lg={6} md={12} className="mb-4 mb-lg-0 d-flex">
        <div className="comment-section h-100 d-flex flex-column">
          <div className="icon-wrapper-left2">
            <BiSolidMessageRounded
              size={30}
              className="custom-icon"
            />
          </div>
          <h6>Comments keep the ball rolling async</h6>
          <p>
            A consolidated view of feedback makes it easy to iterate,
            even across offices and time zones.
          </p>
          <img
            src={Image9}
            alt="Comment interface"
            className="img-fluid rounded mt-auto"
          />
        </div>
      </Col>
      <Col lg={6} md={12} className="d-flex">
        <div className="startup-study h-100 d-flex flex-column">
          <h2 className="highlighted">Startupstudy</h2>
          <p className="testimonial-text-l">
            We can quickly build out a meeting agenda for a large group
            of people and still make it interactive and fun.
          </p>
          <div className="testimonial mt-auto">
            <p className="mb-0">
              <strong>Amar Deep</strong>
            </p>
            <p>Co-founder, Startupstudy</p>
          </div>
        </div>
      </Col>
    </Row>
  </Col>
</Row>


          {/* Roles Section */}
          <Row className="role-section justify-content-center mt-5">



          <div className="col-sm-12 d-flex align-items-center justify-content-center text-center">

<h2 className="GoBeyoundText mb-4">
              For Freelancer, PMs, designers, engineers, <br /> and everyone in
              between

</h2>
</div>
            
            <Col md={4} className="d-flex align-items-center justify-content-center">
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Product</Card.Title>
                  <Card.Text>
                    Connect the roadmap to goals, and keep folks aligned on
                    what's shipping and when.
                  </Card.Text>
                  <a href="/" className="role-link">
                    See how PMs use Intaskr →
                  </a>
                  <img src={Image5} alt="Illustration" className="img-fluid" />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="d-flex align-items-center justify-content-center">
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Design</Card.Title>
                  <Card.Text>
                    Move review rounds forward, prioritize requests, and hit all
                    your creative deadlines.
                  </Card.Text>
                  <a href="/" className="role-link">
                    See how designers use Intaskr →
                  </a>
                  <img src={Image6} alt="Illustration" className="img-fluid" />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="d-flex align-items-center justify-content-center">
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Engineering</Card.Title>
                  <Card.Text>
                    Ship features faster with sprints, code guidelines, bug
                    fixes & more, all in one place.
                  </Card.Text>
                  <a href="/" className="role-link">
                    See how engineers use Intaskr →
                  </a>
                  <img src={Image7} alt="Illustration" className="img-fluid" />
                </Card.Body>
              </Card>
            </Col>
          </Row>




          {/* Wiki Section */}
          <Row className="wiki-section align-items-center mt-5">
            <Col md={8} className="text-center">
              <h2 className="wiki-heading GoBeyoundText ">
                Wikis and Projects <br /> included, for the same price
              </h2>
            </Col>
            <Col md={4} className="figure-image-container text-right">
              <img src={Image8} alt="Illustration" className="figure-image" />
            </Col>
          </Row>

          
          <Row className="wiki-section-content mt-4">
            <Col md={6}>
              <div className="iki">
                <div className="wiki-wrapper-left">
                  <SlBookOpen size={30} className="custom-icon2" />
                </div>
                <h3 className="wiki-title">Wikis</h3>
                <p className="wiki-text">
                  It's hard to move fast with a clunky & disorganized workspace.
                  Centralize all your knowledge in Intaskr instead.
                </p>
              </div>
            </Col>
            <Col md={12}>
              <img
                src={WikiImage}
                alt="Wiki and Projects Illustration"
                className="img-fluid"
              />
            </Col>
          </Row>

          {/* WriteDoc Section */}
          <Row className="write-doc-section py-4 text-center">


          <div className="col-sm-12 d-flex align-items-center justify-content-center text-center">

<h2 className="GoBeyoundText mb-4">
              Write your next <br /> doc in Intaskr
            </h2>
            </div>
            {/* <h2>
            </h2> */}
            <p className="lead">
              Play around with it first. Pay and add your team later.
            </p>
            <div className="doc-buttons d-flex flex-column align-items-center  justify-content-center flex-sm-row">
  <Button className="getBtn mb-2 mb-sm-0">Get Intaskr free &rarr;</Button>
  <a className="link ml-sm-3">
    Request a demo &rarr;
  </a>
</div>


          </Row>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default ProductDocs;
