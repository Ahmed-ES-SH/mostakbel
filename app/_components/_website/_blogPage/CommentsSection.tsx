"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/app/_hooks/useLocale";
import { useTranslation } from "@/app/_hooks/useTranslation";

export function CommentsSection() {
  const locale = useLocale();
  const t = useTranslation("articlePage");

  const isRTL = locale === "ar";

  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Ahmed Hassan",
      email: "ahmed@example.com",
      text: "Great article! Very informative and well-written.",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Fatima Ali",
      email: "fatima@example.com",
      text: "Thanks for sharing this valuable content.",
      date: "1 day ago",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.comment) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          name: formData.name,
          email: formData.email,
          text: formData.comment,
          date: "just now",
        },
      ]);
      setFormData({ name: "", email: "", comment: "" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold text-foreground">
        {t.article.comments}
      </h2>

      {/* Comments List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            variants={itemVariants}
            className="rounded-lg border border-border bg-card p-4"
          >
            <div
              className={`flex items-start justify-between ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <div>
                <h4 className="font-semibold text-foreground">
                  {comment.name}
                </h4>
                <p className="text-sm text-muted-foreground">{comment.date}</p>
              </div>
            </div>
            <p
              className="mt-2 text-foreground"
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              {comment.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Comment Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg border border-border bg-card p-6"
      >
        <h3 className="text-lg font-semibold text-foreground">
          {t.article.leaveComment}
        </h3>

        <div
          className={`grid gap-4 md:grid-cols-2 ${
            isRTL ? "direction-rtl" : ""
          }`}
        >
          <Input
            type="text"
            placeholder={t.article.name}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-background"
            style={{ direction: isRTL ? "rtl" : "ltr" }}
          />
          <Input
            type="email"
            placeholder={t.article.email}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-background"
            style={{ direction: isRTL ? "rtl" : "ltr" }}
          />
        </div>

        <textarea
          placeholder={t.article.comment}
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
          className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground"
          style={{ direction: isRTL ? "rtl" : "ltr" }}
        />

        <Button type="submit" className="w-full">
          {t.article.submit}
        </Button>
      </motion.form>
    </motion.div>
  );
}
