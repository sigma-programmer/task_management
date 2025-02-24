import React from 'react';
import './PricingFAQ.css'; // For additional custom styles

const PricingFAQ = () => {
  return (
    <section className="faqPricing">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-8 text-center d-flex align-items-center justify-content-center">
            <div className="section-title">
              <h1>FAQ</h1>
              <p>
              Can’t find the answer here? Contact support
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="accordion" id="accordionExample">
              <div className="row">
                {/* Left Column */}
                <div className="col-xl-6 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          What is Lorem Ipsum?
                        </button>
                      </h5>
                    </div>

                    <div
                      id="collapseOne"
                      className="collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="card-body">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s.
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Where does it come from?
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="card-body">
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin
                        literature from 45 BC.
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Why do we use it?
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseThree"
                      className="collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="card-body">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when looking
                        at its layout.
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          Where can I get some?
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseFour"
                      className="collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="card-body">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-xl-6 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive"
                        >
                          What is Lorem Ipsum?
                        </button>
                      </h5>
                    </div>

                    <div
                      id="collapseFive"
                      className="collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="card-body">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s.
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseSix"
                          aria-expanded="false"
                          aria-controls="collapseSix"
                        >
                          Where does it come from?
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseSix"
                      className="collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="card-body">
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin
                        literature from 45 BC.
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseSeven"
                          aria-expanded="false"
                          aria-controls="collapseSeven"
                        >
                          Why do we use it?
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseSeven"
                      className="collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="card-body">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when looking
                        at its layout.
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseEight"
                          aria-expanded="false"
                          aria-controls="collapseEight"
                        >
                          Where can I get some?
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseEight"
                      className="collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="card-body">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;
