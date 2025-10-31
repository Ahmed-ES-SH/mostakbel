"use client";

import { useTranslation } from "@/app/_hooks/useTranslation";
import { motion } from "framer-motion";

interface TeamProps {
  project: any;
}

export default function Team({ project }: TeamProps) {
  const t = useTranslation("projectPage");

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
    <section className="bg-background">
      <div className="c-container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center"
          >
            {t.team.title}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {project.team.map((member: any) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                className="bg-card rounded-lg overflow-hidden border border-border group"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name.en}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-card-foreground mb-1">
                    {member.name.en}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {member.role.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
