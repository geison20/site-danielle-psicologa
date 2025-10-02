import React from "react";
import { GalleryHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    alt: "Fachada do consultório",
    caption: "Entrada do consultório",
    width: 800,
    height: 600,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    alt: "Sala de atendimento",
    caption: "Sala de terapia principal",
    width: 800,
    height: 600,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    alt: "Sala de espera",
    caption: "Recepção confortável",
    width: 800,
    height: 600,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    alt: "Ambiente para relaxamento",
    caption: "Espaço para relaxamento",
    width: 800,
    height: 600,
  },
];

const Gallery = () => {
  return (
    <section
      id="galeria"
      aria-labelledby="gallery-heading"
      className="bg-secondary"
    >
      <div className="section-container">
        <div className="flex items-center justify-center gap-2 mb-2">
          <GalleryHorizontal className="text-primary" aria-hidden="true" />
          <h2 id="gallery-heading" className="heading-lg text-center">
            Galeria do Consultório
          </h2>
        </div>
        <p className="text-center text-[#677e77] mb-10 max-w-lg mx-auto">
          Conheça nosso espaço físico projetado para proporcionar acolhimento e
          conforto durante suas sessões.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          role="group"
          aria-label="Imagens do consultório"
        >
          {galleryImages.map((image) => (
            <figure
              key={image.id}
              className="overflow-hidden hover-scale transition-all duration-300"
            >
              <Card>
                <AspectRatio ratio={4 / 3} className="bg-muted">
                  <Image
                    src={`${image.src}?auto=format&fit=crop&q=80&w=800`}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    loading="lazy"
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <CardContent className="p-3">
                  <figcaption className="text-sm text-center font-medium">
                    {image.caption}
                  </figcaption>
                </CardContent>
              </Card>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
