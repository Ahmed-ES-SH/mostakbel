"use client";

import { useTranslation } from "@/app/_hooks/useTranslation";
import { motion } from "framer-motion";
import LocaleLink from "../../_global/LocaleLink";
import { formatTitle } from "@/app/_helpers/GlobalHelpers";
interface RelatedProjectsProps {
  project: any;
}

export default function RelatedProjects({ project }: RelatedProjectsProps) {
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
            className="text-3xl md:text-4xl font-bold mb-12 text-foreground"
          >
            {t.relatedProjects.title}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {project.relatedProjects.map((related: any) => {
              const relatedProgress = (related.raised / related.goal) * 100;

              return (
                <motion.div
                  key={related.id}
                  variants={itemVariants}
                  className="bg-card rounded-lg overflow-hidden border border-border group hover:border-primary-color group transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={related.thumbnail || "/placeholder.svg"}
                      alt={related.title.en}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-xs text-primary font-medium mb-2">
                      {related.category.en}
                    </p>
                    <LocaleLink
                      href={`/ourwork/${formatTitle(
                        related.title.en
                      )}?projectId=${related.id}`}
                    >
                      <h3 className="text-lg group-hover:text-light-primary-color hover:underline duration-300  font-bold text-card-foreground mb-4">
                        {related.title.en}
                      </h3>
                    </LocaleLink>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>${related.raised.toLocaleString()}</span>
                        <span>${related.goal.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${relatedProgress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="bg-linear-to-r from-primary to-secondary h-full rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
