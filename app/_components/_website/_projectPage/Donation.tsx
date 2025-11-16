"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { useTranslation } from "@/app/_hooks/useTranslation";
import { ProjectType } from "../../_dashboard/_projects/_projectCard/ProjectCard";

interface DonationProps {
  project: ProjectType;
}

export default function Donation({ project }: DonationProps) {
  const t = useTranslation("projectPage");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const progressPercentage =
    (Number(project.collected_amount) / Number(project.target_amount)) * 100;
  const remaining =
    Number(project.target_amount) - Number(project.collected_amount);

  const suggestedAmounts = [25, 50, 100, 250, 500];

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
      <div className="c-container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground text-center"
          >
            {t.donation.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-center text-muted-foreground mb-8 text-pretty"
          >
            {t.donation.description}
          </motion.p>

          {/* Progress Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-card-foreground">
                ${project.collected_amount.toLocaleString()} {t.donation.raised}
              </span>
              <span className="text-sm font-medium text-card-foreground">
                ${project.target_amount.toLocaleString()} {t.donation.goal}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-background rounded-full h-3 overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="bg-linear-to-r from-primary to-secondary h-full rounded-full"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              ${remaining.toLocaleString()} {t.donation.toReachGoal}
            </p>
          </motion.div>

          {/* Suggested Amounts */}
          <motion.div variants={itemVariants} className="mb-8">
            <label className="block text-sm font-medium text-card-foreground mb-4">
              {t.donation.selectAmount}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {suggestedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    selectedAmount === amount
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border hover:border-primary"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Custom Amount */}
          <motion.div variants={itemVariants} className="mb-8">
            <label className="block text-sm font-medium text-card-foreground mb-2">
              {t.donation.customAmount}
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-border bg-background text-card-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </motion.div>

          {/* Donate Button */}
          <motion.div variants={itemVariants}>
            <Button
              size="lg"
              className="w-full bg-primary-color hover:bg-light-primary-color duration-300 text-lg gap-2"
            >
              <FaHeart className="w-5 h-5" />
              {t.donation.donateNow}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
