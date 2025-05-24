import React from "react";
import InfiniteTestimonialCarousel from "./InfiniteTestimonialCarousel";

const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-16">
      <div className="section-container">
        <h2 className="heading-lg text-center mb-10">
          O que dizem nossos pacientes
        </h2>
        <InfiniteTestimonialCarousel />
      </div>
    </section>
  );
};

export default Testimonials;
