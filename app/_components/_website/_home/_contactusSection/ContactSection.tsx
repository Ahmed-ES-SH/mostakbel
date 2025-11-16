import React from "react";
import { ContactForm } from "../../_contactus/ContactForm";
import Img from "@/app/_components/_global/Img";

interface props {
  image: string;
}

export default function ContactSection({ image }: props) {
  return (
    <div className="flex items-center justify-between max-lg:flex-col max-lg:items-start c-container py-20 relative gap-4">
      {/* Contact Form */}
      <ContactForm />
      <div className="lg:w-[750px] self-start w-full">
        <Img
          src={image ?? "/website/contact-1.png"}
          errorSrc="/website/contact-1.png"
          className="lg:w-[900px] w-[420px]"
        />
      </div>
    </div>
  );
}
