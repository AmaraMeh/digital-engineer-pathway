import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  ThumbsUp, 
  Flag, 
  Trash2, 
  Edit2,
  Link as LinkIcon,
  Hash,
  Image as ImageIcon,
  Video,
  BarChart2
} from "lucide-react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: {
    id: string;
    content: string;
    author: string;
    authorName: string;
    authorPhoto: string;
    createdAt: Date;
    likes: string[];
    comments: any[];
    shares: number;
    tags: string[];
    type: 'text' | 'image' | 'video' | 'link' | 'poll' | 'question';
    media?: string;
    poll?: {
      question: string;
      options: string[];
      votes: number[];
    };
  };
  onDelete?: (postId: string) => void;
  onEdit?: (post: any) => void;
}

const PostCard = ({ post, onDelete, onEdit }: PostCardProps) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser?.uid || ""));
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = async () => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to like posts",
      });
      return;
    }

    try {
      const postRef = doc(db, "posts", post.id);
      if (isLiked) {
        await updateDoc(postRef, {
          likes: arrayRemove(currentUser.uid),
        });
        setIsLiked(false);
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(currentUser.uid),
        });
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to like post",
      });
    }
  };

  const handleComment = async () => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to comment",
      });
      return;
    }

    if (!newComment.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const postRef = doc(db, "posts", post.id);
      const comment = {
        id: Date.now().toString(),
        content: newComment.trim(),
        author: currentUser.uid,
        authorName: currentUser.displayName,
        authorPhoto: currentUser.photoURL,
        createdAt: new Date(),
        likes: [],
      };

      await updateDoc(postRef, {
        comments: arrayUnion(comment),
      });

      setNewComment("");
      setShowComments(true);
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add comment",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Success",
      description: "Link copied to clipboard",
    });
  };

  const handleReport = () => {
    toast({
      title: "Report",
      description: "Post reported successfully",
    });
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(post.id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(post);
    }
  };

  const handleVote = async (optionIndex: number) => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to vote",
      });
      return;
    }

    try {
      const postRef = doc(db, "posts", post.id);
      const updatedVotes = [...(post.poll?.votes || [])];
      updatedVotes[optionIndex] = (updatedVotes[optionIndex] || 0) + 1;

      await updateDoc(postRef, {
        "poll.votes": updatedVotes,
      });
    } catch (error) {
      console.error("Error voting:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to vote",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={post.authorPhoto} alt={post.authorName} />
              <AvatarFallback>{post.authorName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.authorName}</p>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {post.author === currentUser?.uid && (
              <>
                <Button variant="ghost" size="icon" onClick={handleEdit}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" onClick={handleReport}>
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Post Type Indicator */}
          <div className="flex items-center gap-2">
            {post.type === 'text' && <FileText className="h-4 w-4 text-muted-foreground" />}
            {post.type === 'image' && <ImageIcon className="h-4 w-4 text-muted-foreground" />}
            {post.type === 'video' && <Video className="h-4 w-4 text-muted-foreground" />}
            {post.type === 'link' && <LinkIcon className="h-4 w-4 text-muted-foreground" />}
            {post.type === 'poll' && <BarChart2 className="h-4 w-4 text-muted-foreground" />}
            {post.type === 'question' && <Hash className="h-4 w-4 text-muted-foreground" />}
            <span className="text-sm text-muted-foreground capitalize">{post.type}</span>
          </div>

          {/* Post Content */}
          <p className="whitespace-pre-wrap">{post.content}</p>

          {/* Media */}
          {post.media && (
            <div className="rounded-lg overflow-hidden">
              {post.type === 'image' && (
                <img
                  src={post.media}
                  alt="Post media"
                  className="w-full max-h-[500px] object-cover"
                />
              )}
              {post.type === 'video' && (
                <video
                  src={post.media}
                  controls
                  className="w-full max-h-[500px]"
                />
              )}
            </div>
          )}

          {/* Poll */}
          {post.type === 'poll' && post.poll && (
            <div className="space-y-4">
              <p className="font-medium">{post.poll.question}</p>
              <div className="space-y-2">
                {post.poll.options.map((option, index) => (
                  <div key={index} className="space-y-1">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleVote(index)}
                    >
                      {option}
                    </Button>
                    {post.poll?.votes[index] > 0 && (
                      <div className="h-2 bg-primary/10 rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${(post.poll.votes[index] / Math.max(...post.poll.votes)) * 100}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={isLiked ? "text-primary" : ""}
              >
                <Heart className="h-4 w-4 mr-2" />
                {post.likes.length}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                {post.comments.length}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                {post.shares}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSaved(!isSaved)}
              className={isSaved ? "text-primary" : ""}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>

          {/* Comments */}
          {showComments && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.authorPhoto} alt={comment.authorName} />
                      <AvatarFallback>{comment.authorName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-2">
                        <p className="font-medium">{comment.authorName}</p>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleComment}
                  disabled={isSubmitting || !newComment.trim()}
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard; 