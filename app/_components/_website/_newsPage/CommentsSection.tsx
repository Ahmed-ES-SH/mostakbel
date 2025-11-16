// components/comments/CommentsSection.tsx
"use client";

import { easeOut, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaHeart, FaReply, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Comment {
  id: number;
  user_name: string;
  user_avatar: string;
  content: string;
  created_at: string;
  likes: number;
  replies?: Comment[];
}

interface CommentsSectionProps {
  comments: Comment[];
  articleId: number;
}

export function CommentsSection({ comments, articleId }: CommentsSectionProps) {
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [newComment, setNewComment] = useState("");

  const toggleLike = (commentId: number) => {
    setLikedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Here you would typically send the comment to your API
    console.log("New comment:", newComment);
    setNewComment("");
  };

  const commentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: easeOut,
      },
    }),
  };

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            التعليقات ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add Comment Form */}
          <form onSubmit={handleSubmitComment} className="mb-6 space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="اكتب تعليقك هنا..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              إضافة تعليق
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                custom={index}
                variants={commentVariants}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage
                      src={comment.user_avatar}
                      alt={comment.user_name}
                    />
                    <AvatarFallback>
                      {comment.user_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {comment.user_name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString(
                            "ar-EG"
                          )}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {comment.content}
                    </p>

                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-gray-600 hover:text-red-500"
                        onClick={() => toggleLike(comment.id)}
                      >
                        {likedComments.has(comment.id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart />
                        )}
                        <span>
                          {comment.likes +
                            (likedComments.has(comment.id) ? 1 : 0)}
                        </span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                      >
                        <FaReply />
                        <span>رد</span>
                      </Button>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 space-y-4 border-r-2 border-gray-100 pr-4">
                        {comment.replies.map((reply) => (
                          <motion.div
                            key={reply.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-3"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={reply.user_avatar}
                                alt={reply.user_name}
                              />
                              <AvatarFallback className="text-xs">
                                {reply.user_name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-sm text-gray-900">
                                  {reply.user_name}
                                </h5>
                                <p className="text-xs text-gray-500">
                                  {new Date(
                                    reply.created_at
                                  ).toLocaleDateString("ar-EG")}
                                </p>
                              </div>

                              <p className="text-sm text-gray-600">
                                {reply.content}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
