import InfiniteTestimonialCarousel from "./InfiniteTestimonialCarousel";
import type { ContentTestimonial } from "@/lib/content-types";

const Testimonials = ({
  testimonials,
}: {
  testimonials: ContentTestimonial[];
}) => {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="depoimentos"
      aria-labelledby="testimonials-heading"
      className="bg-white"
    >
      <InfiniteTestimonialCarousel testimonials={testimonials} />
    </section>
  );
};

export default Testimonials;
