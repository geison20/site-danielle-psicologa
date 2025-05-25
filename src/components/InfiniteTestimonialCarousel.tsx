"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  name: string;
  date: string;
  text: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Karina Almeida",
    date: "21 de abr. de 2024",
    text: "Excelente profissional, indico sem medo. Mt qualificada, atualizada, trabalha com mt amor. Adoro o fato dela tb ser mãe, isso faz total diferença.",
    avatar: "/lovable-uploads/58634daa-c783-4b47-b22a-e05fffeed5bb.png",
  },
  {
    id: 2,
    name: "Rafael Santos",
    date: "15 de mar. de 2024",
    text: "A Dra. Danielle é uma profissional excepcional! Sua abordagem me ajudou a superar questões que eu carregava há anos. Recomendo de olhos fechados.",
  },
  {
    id: 3,
    name: "Juliana Costa",
    date: "02 de mai. de 2024",
    text: "Encontrei na Danielle o apoio que precisava em um momento muito difícil. Sua empatia e conhecimento fazem toda diferença nas sessões.",
  },
  {
    id: 4,
    name: "Pedro Oliveira",
    date: "18 de abr. de 2024",
    text: "Minha experiência tem sido transformadora! A forma como ela conduz as sessões me ajuda a ter insights valiosos sobre padrões que eu nem percebia.",
  },
  {
    id: 5,
    name: "Amanda Silva",
    date: "28 de mar. de 2024",
    text: "Agradeço todos os dias por ter encontrado a Danielle. Sua sensibilidade e profissionalismo me ajudaram a lidar com minha ansiedade de forma incrível.",
  },
  {
    id: 6,
    name: "Lucas Mendes",
    date: "10 de mai. de 2024",
    text: "Profissional atualizada e humana. Consigo me abrir e falar sobre assuntos difíceis com muita tranquilidade. Recomendo para todos!",
  },
  {
    id: 7,
    name: "Beatriz Lima",
    date: "05 de abr. de 2024",
    text: "As sessões com a Danielle têm sido um verdadeiro presente na minha vida. Ela me ajuda a enxergar soluções onde eu só via problemas.",
  },
  {
    id: 8,
    name: "Marcos Pereira",
    date: "22 de mar. de 2024",
    text: "Sou paciente há quase um ano e posso dizer que minha qualidade de vida melhorou significativamente. Obrigado por todo o suporte!",
  },
];

const InfiniteTestimonialCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Função otimizada para animar o carrossel usando requestAnimationFrame
  const animateCarousel = useCallback(() => {
    if (!carouselRef.current || !isVisible) return;

    const carousel = carouselRef.current;
    const scrollWidth = carousel.scrollWidth;
    const containerWidth = carousel.offsetWidth;
    const halfScrollWidth = scrollWidth / 2;

    // Aumentar o scroll suavemente
    if (carousel.scrollLeft >= halfScrollWidth) {
      // Reset para o início quando chegamos na metade
      carousel.scrollLeft = 0;
    } else {
      // Mover o scroll lentamente (0.5px por frame para melhor desempenho)
      carousel.scrollLeft += 0.5;
    }

    // Agendar o próximo frame de animação
    animationRef.current = requestAnimationFrame(animateCarousel);
  }, [isVisible]);

  // Observer de interseção para pausar a animação quando fora da tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  // Gerenciar animação baseado na visibilidade
  useEffect(() => {
    if (isVisible) {
      animationRef.current = requestAnimationFrame(animateCarousel);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, animateCarousel]);

  // Preparar itens do carrossel com memoização para evitar re-renderizações
  const carouselItems = React.useMemo(() => {
    // Duplicar depoimentos para efeito infinito
    const doubledTestimonials = [...testimonials, ...testimonials];

    return doubledTestimonials.map((testimonial, index) => (
      <article
        key={`${testimonial.id}-${index}`}
        className="inline-block w-[380px] bg-gray-800 rounded-lg p-6 text-white shadow-lg"
        style={{
          willChange: "transform",
          translate: "none",
        }}
        aria-label={`Depoimento de ${testimonial.name}`}
      >
        <div className="flex items-center gap-4 mb-3">
          <Avatar className="h-12 w-12 border-2 border-purple">
            {testimonial.avatar ? (
              <AvatarImage
                src={testimonial.avatar}
                alt={`Foto de ${testimonial.name}`}
                width={48}
                height={48}
                loading="lazy"
              />
            ) : (
              <AvatarFallback className="bg-purple-light text-purple-dark">
                {testimonial.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <blockquote className="text-gray-200 whitespace-normal mb-4">
          “{testimonial.text}”
        </blockquote>
        <footer className="flex flex-col">
          <cite className="not-italic text-blue-400 font-semibold text-lg">
            {testimonial.name}
          </cite>
          <span className="text-gray-300 text-sm">{testimonial.date}</span>
        </footer>
      </article>
    ));
  }, []);

  return (
    <div className="w-full bg-gray-900 py-16">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="heading-lg text-center text-white mb-10">
          O Que Nossos Clientes Dizem
        </h2>
      </div>

      <div
        ref={carouselRef}
        className="overflow-hidden whitespace-nowrap"
        aria-label="Carrossel de depoimentos de clientes"
        style={{
          scrollBehavior: "auto", // Auto em vez de smooth para melhor performance
          overscrollBehavior: "none", // Prevenir scroll indesejado
        }}
      >
        <div
          className="inline-flex gap-6 py-4"
          style={{ willChange: "transform" }} // Otimização para navegadores modernos
        >
          {carouselItems}
        </div>
      </div>
    </div>
  );
};

export default InfiniteTestimonialCarousel;
