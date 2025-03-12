import { motion } from 'framer-motion';
import {
  Bell,
  Bookmark,
  ImageIcon,
  LinkIcon,
  MessageCircle,
  PenTool,
  Send,
  Share2,
  Smile,
  ThumbsUp,
  Users,
  Heart,
  Image,
  Paperclip,
  Mic,
  X
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Post, loadPosts, savePost, convertImageToBase64, addComment } from '../utils/posts';

interface Article {
  id: number;
  title: string;
  author: string;
  avatar: string;
  summary: string;
  coverImage: string;
  likes: number;
  comments: number;
  readTime: string;
  publishedAt: string;
}

const Community = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'articles' | 'chat'>('feed');
  const [postContent, setPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [posts, setPosts] = useState<Post[]>(loadPosts);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [posts]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      user: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        online: true
      },
      content: message,
      timestamp: 'Just now',
      reactions: [],
      reactionCount: 0
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  // Sample articles data
  const articles: Article[] = [
    {
      id: 1,
      title: 'The Science Behind Mindfulness Meditation',
      author: 'Dr. Emily Wong',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      summary: 'Discover how mindfulness meditation can rewire your brain for better focus, reduced anxiety, and improved emotional regulation.',
      coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      likes: 156,
      comments: 42,
      readTime: '8 min',
      publishedAt: '1 day ago'
    },
    {
      id: 2,
      title: 'Building Resilience Through Daily Habits',
      author: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      summary: 'Learn how small, consistent actions can build extraordinary mental strength.',
      coverImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      likes: 98,
      comments: 27,
      readTime: '6 min',
      publishedAt: '2 days ago'
    }
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        online: true
      },
      content: 'Just completed my morning workout! 💪 Anyone else feeling energized?',
      timestamp: '2 min ago',
      reactions: ['❤️', '👏'],
      reactionCount: 3
    },
    {
      id: 2,
      user: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        online: true
      },
      content: 'The meditation session was amazing! Really helped clear my mind.',
      timestamp: '5 min ago',
      reactions: ['🧘‍♀️', '✨'],
      reactionCount: 5
    }
  ]);

  const [message, setMessage] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 border-b border-gray-200 dark:border-gray-700">
          {(['feed', 'articles', 'chat'] as const).map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 relative ${
                activeTab === tab
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="capitalize font-medium">{tab}</span>
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Content Section */}
        <div className="mt-8">
          {activeTab === 'feed' && (
            <>
              {/* Post Creation Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-indigo-500/5 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                        JD
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share Your Journey</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Inspire others with your wellness story</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative p-3 rounded-xl bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors"
                        onClick={() => setNotifications(!notifications)}
                      >
                        <Bell className="h-6 w-6" />
                        {notifications && (
                          <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full">
                            <span className="absolute inset-0 rounded-full animate-ping bg-red-500 opacity-75"></span>
                          </span>
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors flex items-center space-x-2"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <PenTool className="h-5 w-5" />
                        <span>Create Post</span>
                      </motion.button>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      placeholder="What's on your mind?"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="w-full min-h-[120px] px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                    />
                    
                    <div className="absolute bottom-3 right-3 flex items-center space-x-1">
                      <span className="text-sm text-gray-400">
                        {postContent.length}/500
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center -space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        ref={fileInputRef}
                        onChange={async (e) => {
                          const files = Array.from(e.target.files || []);
                          const imagePromises = files.map(convertImageToBase64);
                          const base64Images = await Promise.all(imagePromises);
                          setSelectedImages(prev => [...prev, ...base64Images]);
                        }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-30"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImageIcon className="h-6 w-6 text-indigo-500" />
                        <span className="sr-only">Add Image</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-20"
                      >
                        <LinkIcon className="h-6 w-6 text-indigo-500" />
                        <span className="sr-only">Add Link</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
                      >
                        <Smile className="h-6 w-6 text-indigo-500" />
                        <span className="sr-only">Add Emoji</span>
                      </motion.button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowFilters(!showFilters)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          Add Tags
                        </motion.button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (!postContent.trim()) return;
                          setIsPosting(true);
                          const newPost = savePost(postContent, selectedImages);
                          setPosts(prevPosts => [newPost, ...prevPosts]);
                          setSelectedImages([]);
                          setTimeout(() => {
                            setIsPosting(false);
                            setPostContent('');
                          }, 1000);
                        }}
                        disabled={isPosting || !postContent.trim()}
                        className={`px-6 py-2 rounded-xl font-medium transition-all ${
                          isPosting || !postContent.trim()
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5'
                        }`}
                      >
                        {isPosting ? (
                          <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            <span>Posting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Send className="h-4 w-4" />
                            <span>Share Post</span>
                          </div>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Image Preview Section */}
                  {selectedImages.length > 0 && (
                    <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Selected ${index + 1}`}
                              className="h-20 w-20 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => setSelectedImages(images => images.filter((_, i) => i !== index))}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Preview Section */}
                {postContent.trim() && (
                  <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Preview</h4>
                      <button className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {postContent}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Posts Feed */}
              <div className="mt-8 space-y-6">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-indigo-500/5 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
                  >
                    {/* Post Header */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <img 
                              src={post.avatar} 
                              alt={post.author} 
                              className="h-12 w-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-700" 
                            />
                            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-700"></span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors">
                              {post.author}
                            </h3>
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="text-gray-500 dark:text-gray-400">{post.time}</span>
                              <span className="text-gray-300 dark:text-gray-600">•</span>
                              <span className="text-indigo-600 dark:text-indigo-400 font-medium">Following</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => {
                              // Toggle bookmark
                            }}
                          >
                            <Bookmark className={`h-5 w-5 ${post.bookmarked ? 'fill-current text-indigo-600' : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-400'}`} />
                          </motion.button>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {post.content}
                        </p>

                        {/* Post Images */}
                        {post.images.length > 0 && (
                          <div className={`grid gap-2 ${
                            post.images.length === 1 ? 'grid-cols-1' : 
                            post.images.length === 2 ? 'grid-cols-2' :
                            post.images.length === 3 ? 'grid-cols-2' :
                            'grid-cols-2'
                          }`}>
                            {post.images.map((image, index) => (
                              <motion.div
                                key={index}
                                className={`relative rounded-xl overflow-hidden ${
                                  post.images.length === 3 && index === 0 ? 'row-span-2' : ''
                                }`}
                                whileHover={{ scale: 1.02 }}
                              >
                                <img
                                  src={image}
                                  alt={`Post image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors cursor-pointer"></div>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Post Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
                            >
                              #{tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Post Actions */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                            <ThumbsUp className="h-5 w-5" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                            <MessageCircle className="h-5 w-5" />
                            <span>{post.comments?.length || 0}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                            <Share2 className="h-5 w-5" />
                            <span>{post.shares}</span>
                          </button>
                        </div>
                        <button 
                          className={`text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 ${post.bookmarked ? 'text-indigo-600 dark:text-indigo-400' : ''}`}
                        >
                          <Bookmark className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Comments Section */}
                      <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                        {/* Existing Comments */}
                        <div className="space-y-4">
                          {post.comments?.map((comment) => (
                            <div key={comment.id} className="flex space-x-3">
                              <img
                                src={comment.avatar}
                                alt={comment.author}
                                className="h-8 w-8 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                      {comment.author}
                                    </h4>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {comment.time}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                    {comment.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add Comment Form */}
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const input = form.elements.namedItem('comment') as HTMLInputElement;
                            const content = input.value.trim();
                            if (!content) return;
                            
                            const updatedPosts = addComment(post.id, content);
                            setPosts(updatedPosts);
                            input.value = '';
                          }}
                          className="mt-4 flex items-start space-x-3"
                        >
                          <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Your avatar"
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              name="comment"
                              placeholder="Write a comment..."
                              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
                            />
                            <button
                              type="submit"
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                              <Send className="h-5 w-5" />
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Quick Comment Input */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm font-medium">
                          JD
                        </div>
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            className="w-full px-4 py-2 bg-white dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                          />
                          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <Send className="h-4 w-4 text-indigo-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'articles' && (
            <>
              <div className="flex justify-end mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowArticleForm(true)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-xl font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all flex items-center space-x-2"
                >
                  <PenTool className="h-4 w-4" />
                  <span>Write Article</span>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {articles.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-indigo-500/5 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
                  >
                    <div className="md:flex">
                      <div className="md:flex-shrink-0">
                        <img
                          className="h-48 w-full object-cover md:h-full md:w-48"
                          src={article.coverImage}
                          alt={article.title}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={article.avatar}
                            alt={article.author}
                            className="h-10 w-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {article.author}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {article.publishedAt} · {article.readTime} read
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors">
                            {article.title}
                          </h3>
                          <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {article.summary}
                          </p>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="group flex items-center space-x-2"
                            >
                              <div className="p-2 rounded-xl group-hover:bg-rose-50 dark:group-hover:bg-rose-500/10 transition-colors">
                                <ThumbsUp className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-rose-500 dark:group-hover:text-rose-400" />
                              </div>
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-rose-500 dark:group-hover:text-rose-400">
                                {article.likes}
                              </span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="group flex items-center space-x-2"
                            >
                              <div className="p-2 rounded-xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-colors">
                                <MessageCircle className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
                              </div>
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                                {article.comments}
                              </span>
                            </motion.button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Bookmark className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'chat' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg shadow-indigo-500/5 overflow-hidden h-[600px] flex flex-col"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-indigo-50 rounded-xl">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Community Chat</h3>
                    <p className="text-sm text-gray-500">12 members active</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <Heart className="h-5 w-5 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <Bell className="h-5 w-5 text-gray-600" />
                  </motion.button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start space-x-3 ${
                      msg.user.name === 'You' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={msg.user.avatar}
                        alt={msg.user.name}
                        className="h-10 w-10 rounded-full"
                      />
                      {msg.user.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white"></span>
                      )}
                    </div>
                    <div className={`flex flex-col ${msg.user.name === 'You' ? 'items-end' : ''}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">{msg.user.name}</span>
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                      </div>
                      <div className={`rounded-2xl px-4 py-2 max-w-md ${
                        msg.user.name === 'You'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p>{msg.content}</p>
                      </div>
                      {msg.reactions.length > 0 && (
                        <div className="flex items-center space-x-1 mt-1">
                          <div className="flex -space-x-1">
                            {msg.reactions.map((reaction, index) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 bg-white rounded-full text-sm shadow-sm"
                              >
                                {reaction}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{msg.reactionCount}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-100 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-end space-x-4">
                  <div className="flex-1 relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full px-4 py-2 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500 min-h-[80px]"
                    />
                    <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Image className="h-5 w-5 text-gray-600" />
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Paperclip className="h-5 w-5 text-gray-600" />
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Smile className="h-5 w-5 text-gray-600" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <Mic className="h-5 w-5 text-gray-600" />
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Community;