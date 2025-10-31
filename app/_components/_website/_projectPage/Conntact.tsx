"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "@/app/_hooks/useTranslation";

interface ContactProps {
  project: any;
}

export default function Contact({ project }: ContactProps) {
  const t = useTranslation("projectPage");
  const tProject = (key: string) => project[key]?.en || project[key]?.ar || "";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground text-center"
          >
            {t.contact.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty"
          >
            {t.contact.description}
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <FaPhone className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-card-foreground mb-1">
                  {t.contact.phone}
                </h3>
                <p className="text-sm text-muted-foreground">
                  +963 123 456 789
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                <FaEnvelope className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-card-foreground mb-1">
                  {t.contact.email}
                </h3>
                <p className="text-sm text-muted-foreground">
                  info@charity-platform.org
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-card-foreground mb-1">
                  {t.contact.location}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.contact.location}
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              {t.contact.volunteer}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              {t.contact.contactUs}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
