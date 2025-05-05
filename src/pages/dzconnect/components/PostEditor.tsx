import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Image as ImageIcon, Video, Link as LinkIcon, Hash, Plus, Trash2 } from "lucide-react";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface PostEditorProps {
  onClose: () => void;
  postToEdit?: {
    id: string;
    content: string;
    tags: string[];
    media?: string;
    type: 'text' | 'image' | 'video' | 'link' | 'poll' | 'question';
    poll?: {
      question: string;
      options: string[];
      votes: number[];
    };
  };
}

const PostEditor = ({ onClose, postToEdit }: PostEditorProps) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [content, setContent] = useState(postToEdit?.content || "");
  const [tags, setTags] = useState<string[]>(postToEdit?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState(postToEdit?.media || "");
  const [postType, setPostType] = useState<'text' | 'image' | 'video' | 'link' | 'poll' | 'question'>(postToEdit?.type || 'text');
  const [pollQuestion, setPollQuestion] = useState(postToEdit?.poll?.question || "");
  const [pollOptions, setPollOptions] = useState<string[]>(postToEdit?.poll?.options || []);
  const [newOption, setNewOption] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePollOptionAdd = () => {
    if (newOption.trim() && !pollOptions.includes(newOption.trim())) {
      setPollOptions([...pollOptions, newOption.trim()]);
      setNewOption("");
    }
  };

  const handlePollOptionRemove = (optionToRemove: string) => {
    setPollOptions(pollOptions.filter(option => option !== optionToRemove));
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to create posts",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Post content cannot be empty",
      });
      return;
    }

    if (postType === 'poll' && (!pollQuestion.trim() || pollOptions.length < 2)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Poll must have a question and at least 2 options",
      });
      return;
    }

    try {
      setLoading(true);
      let mediaUrl = mediaPreview;

      if (media) {
        const storageRef = ref(storage, `posts/${currentUser.uid}/${Date.now()}`);
        const snapshot = await uploadBytes(storageRef, media);
        mediaUrl = await getDownloadURL(snapshot.ref);
      }

      const postData = {
        content: content.trim(),
        author: currentUser.uid,
        authorName: currentUser.displayName,
        authorPhoto: currentUser.photoURL,
        createdAt: serverTimestamp(),
        likes: [],
        comments: [],
        shares: 0,
        tags,
        type: postType,
        media: mediaUrl || null,
        poll: postType === 'poll' ? {
          question: pollQuestion.trim(),
          options: pollOptions,
          votes: new Array(pollOptions.length).fill(0)
        } : null
      };

      if (postToEdit) {
        await updateDoc(doc(db, "posts", postToEdit.id), postData);
        toast({
          title: "Success",
          description: "Post updated successfully",
        });
      } else {
        await addDoc(collection(db, "posts"), postData);
        toast({
          title: "Success",
          description: "Post created successfully",
        });
      }

      onClose();
    } catch (error) {
      console.error("Error creating/updating post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create/update post",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{postToEdit ? "Edit Post" : "Create Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={postType} onValueChange={(value) => setPostType(value as any)}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="poll">Poll</TabsTrigger>
            <TabsTrigger value="question">Question</TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
            />
          </TabsContent>

          <TabsContent value="image" className="space-y-4">
            <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-8">
              {mediaPreview ? (
                <div className="relative">
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="max-h-[300px] rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setMedia(null);
                      setMediaPreview("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click to upload an image
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleMediaChange}
                  />
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Select Image
                  </Button>
                </div>
              )}
            </div>
            <Textarea
              placeholder="Add a caption..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
            />
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-8">
              {mediaPreview ? (
                <div className="relative">
                  <video
                    src={mediaPreview}
                    controls
                    className="max-h-[300px] rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setMedia(null);
                      setMediaPreview("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Video className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click to upload a video
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleMediaChange}
                  />
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Select Video
                  </Button>
                </div>
              )}
            </div>
            <Textarea
              placeholder="Add a description..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
            />
          </TabsContent>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-2">
              <Label>Link URL</Label>
              <Input
                type="url"
                placeholder="https://example.com"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Add a description..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
            />
          </TabsContent>

          <TabsContent value="poll" className="space-y-4">
            <div className="space-y-2">
              <Label>Poll Question</Label>
              <Input
                placeholder="Ask a question..."
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Options</Label>
              <div className="space-y-2">
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input value={option} readOnly />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handlePollOptionRemove(option)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add an option..."
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePollOptionAdd}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="question" className="space-y-4">
            <Textarea
              placeholder="Ask a question..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
            />
          </TabsContent>
        </Tabs>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1"
                    onClick={() => handleTagRemove(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleTagAdd();
                  }
                }}
              />
              <Button variant="outline" onClick={handleTagAdd}>
                Add
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : postToEdit ? "Update" : "Post"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostEditor; 