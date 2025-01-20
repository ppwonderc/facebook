import React, { useState } from 'react';
    import { 
      Home, 
      Search, 
      MessageCircle, 
      Plus, 
      Video, 
      Store, 
      Bell, 
      Menu,
      MoreHorizontal,
      ThumbsUp,
      MessageCircleMore,
      Share2,
      Globe,
      Image,
      UserCircle,
      MapPin,
      Smile,
      X,
      Send,
      Trash2
    } from 'lucide-react';

    function App() {
      const [activeTab, setActiveTab] = useState('home');
      const [showPostModal, setShowPostModal] = useState(false);
      const [postContent, setPostContent] = useState('');
      const [commentInputs, setCommentInputs] = useState({});
      const [posts, setPosts] = useState([
        {
          id: 1,
          user: "คอหนังไทย",
          verified: true,
          userImage: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500&auto=format",
          time: "34 นาที",
          content: "แบบไหน... แบบชั้นดีกันล่ะ?\nชั้นนี้สนุกค่ะ 555555555 😂... ดูเพิ่มเติม",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format",
          likes: "2.5พัน",
          comments: [],
          commentCount: "428",
          shares: "129",
          isLiked: false,
          showComments: false,
          showOptions: false
        },
        {
          id: 2,
          user: "Nature Photography",
          userImage: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=500&auto=format",
          time: "5 ชั่วโมง",
          content: "พระอาทิตย์ตกที่แกรนด์แคนยอน 🌅",
          image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500&auto=format",
          likes: "5.2พัน",
          comments: [],
          commentCount: "831",
          shares: "342",
          isLiked: false,
          showComments: false,
          showOptions: false
        }
      ]);
      const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        postId: null
      });

      const handleCreatePost = () => {
        if (postContent.trim()) {
          const newPost = {
            id: Date.now(),
            user: "Tanapon Sermsuteeanuwat",
            userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format",
            time: "เมื่อสักครู่",
            content: postContent,
            likes: "0",
            comments: [],
            commentCount: "0",
            shares: "0",
            isLiked: false,
            showComments: false,
            showOptions: false
          };
          setPosts([newPost, ...posts]);
          setPostContent('');
          setShowPostModal(false);
        }
      };

      const handleLike = (postId) => {
        setPosts(posts.map(post => {
          if (post.id === postId) {
            const currentLikes = parseInt(post.likes.replace(/[^\d]/g, ''));
            const newLikes = post.isLiked ? currentLikes - 1 : currentLikes + 1;
            return {
              ...post,
              isLiked: !post.isLiked,
              likes: newLikes + (newLikes >= 1000 ? 'พัน' : '')
            };
          }
          return post;
        }));
      };

      const handleComment = (postId) => {
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return { ...post, showComments: !post.showComments };
          }
          return post;
        }));
      };

      const handleCommentSubmit = (postId) => {
        const commentText = commentInputs[postId];
        if (commentText?.trim()) {
          setPosts(posts.map(post => {
            if (post.id === postId) {
              const newComment = {
                id: Date.now(),
                user: "Tanapon Sermsuteeanuwat",
                userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format",
                content: commentText,
                time: "เมื่อสักครู่",
                likes: 0
              };
              const currentCount = parseInt(post.commentCount.replace(/[^\d]/g, ''));
              return {
                ...post,
                comments: [...post.comments, newComment],
                commentCount: (currentCount + 1).toString()
              };
            }
            return post;
          }));
          setCommentInputs({ ...commentInputs, [postId]: '' });
        }
      };

      const handlePostOptions = (postId) => {
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return { ...post, showOptions: !post.showOptions };
          }
          return { ...post, showOptions: false };
        }));
      };

      const handleDeletePost = (postId) => {
        setDeleteConfirmation({ show: true, postId: postId });
      };

      const confirmDeletePost = () => {
        if (deleteConfirmation.postId) {
          setPosts(posts.filter(post => post.id !== deleteConfirmation.postId));
          setDeleteConfirmation({ show: false, postId: null });
        }
      };

      const cancelDeletePost = () => {
        setDeleteConfirmation({ show: false, postId: null });
      };

      const storyData = [
        {
          id: 1,
          user: "สร้างสตอรี่",
          userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format",
          isCreate: true
        }
      ];

      return (
        <div className="min-h-screen bg-gray-100">
          {/* Delete Confirmation Modal */}
          {deleteConfirmation.show && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
              <div className="bg-[#242526] w-full max-w-lg rounded-xl p-4">
                <h2 className="text-white text-xl font-semibold mb-4">ยืนยันการลบโพสต์</h2>
                <p className="text-gray-300 mb-4">คุณต้องการลบโพสต์นี้หรือไม่?</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={cancelDeletePost}
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={confirmDeletePost}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Post Creation Modal */}
          {showPostModal && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
              <div className="bg-[#242526] w-full max-w-lg rounded-xl">
                <div className="border-b border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white text-xl font-semibold">สร้างโพสต์</h2>
                    <button 
                      onClick={() => setShowPostModal(false)}
                      className="p-2 hover:bg-gray-700 rounded-full"
                    >
                      <X className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format"
                      alt="Profile" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-white font-semibold">Tanapon Sermsuteeanuwat</p>
                      <button className="flex items-center gap-1 bg-[#3A3B3C] px-2 py-1 rounded-md" disabled>
                        <Globe className="w-4 h-4 text-gray-300" />
                        <span className="text-sm text-gray-300">เพื่อน</span>
                      </button>
                    </div>
                  </div>
                  
                  <textarea
                    placeholder="คุณกำลังคิดอะไรอยู่"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="w-full bg-transparent text-white text-lg resize-none outline-none min-h-[150px]"
                  />
                  
                  <div className="border border-gray-700 rounded-lg p-3 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">เพิ่มลงในโพสต์ของคุณ</span>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-700 rounded-full">
                          <Image className="w-6 h-6 text-green-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-full">
                          <UserCircle className="w-6 h-6 text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-full">
                          <Smile className="w-6 h-6 text-yellow-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-full">
                          <MapPin className="w-6 h-6 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCreatePost}
                    disabled={!postContent.trim()}
                    className={`w-full mt-4 py-2 rounded-lg font-semibold ${
                      postContent.trim() 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-600 text-gray-400'
                    }`}
                  >
                    โพสต์
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Rest of the UI */}
          <div className="fixed top-0 w-full bg-white shadow-sm z-40">
            <div className="flex justify-between items-center p-4">
              <h1 className="text-[#1877F2] text-3xl font-bold">facebook</h1>
              <div className="flex gap-2">
                <button className="p-2 bg-gray-100 rounded-full">
                  <Plus className="w-6 h-6" />
                </button>
                <button className="p-2 bg-gray-100 rounded-full">
                  <Search className="w-6 h-6" />
                </button>
                <button className="p-2 bg-gray-100 rounded-full relative">
                  <MessageCircle className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-16">
            {/* Stories */}
            <div className="bg-white p-4 mb-4 overflow-x-auto whitespace-nowrap">
              <div className="flex gap-2">
                {storyData.map((story) => (
                  <div key={story.id} className="relative">
                    <div className="relative w-20 h-28 rounded-xl overflow-hidden border border-gray-200">
                      <img src={story.userImage} alt="" className="w-full h-full object-cover" />
                      {story.isCreate && (
                        <div className="absolute bottom-2 left-2 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                          <Plus className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-center mt-1">{story.user}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Post */}
            <div className="bg-white p-4 mb-4">
              <div className="flex items-center gap-2">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format" 
                  alt="User" 
                  className="w-10 h-10 rounded-full"
                />
                <button 
                  onClick={() => setShowPostModal(true)}
                  className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-left"
                >
                  <p className="text-gray-500">คุณกำลังคิดอะไรอยู่</p>
                </button>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white mb-4">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={post.userImage} alt="" className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="font-semibold">{post.user}</p>
                          {post.verified && (
                            <span className="text-blue-500">✓</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <span>{post.time}</span>
                          <span>•</span>
                          <Globe className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <button onClick={() => handlePostOptions(post.id)} className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreHorizontal className="text-gray-500" />
                      </button>
                      {post.showOptions && (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            <Trash2 className="w-4 h-4 text-gray-500" />
                            ลบโพสต์
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 whitespace-pre-line">{post.content}</p>
                </div>
                {post.image && <img src={post.image} alt="" className="w-full" />}
                <div className="p-4">
                  <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                    <span>❤️ {post.likes}</span>
                    <div className="flex gap-2">
                      <span>{post.commentCount} ความคิดเห็น</span>
                      <span>{post.shares} แชร์</span>
                    </div>
                  </div>
                  <div className="flex border-t border-gray-200 pt-2">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-50 rounded-lg ${
                        post.isLiked ? 'text-blue-500' : ''
                      }`}
                    >
                      <ThumbsUp className="w-5 h-5" />
                      <span>ถูกใจ</span>
                    </button>
                    <button 
                      onClick={() => handleComment(post.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-50 rounded-lg"
                    >
                      <MessageCircleMore className="w-5 h-5" />
                      <span>แสดงความคิดเห็น</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-50 rounded-lg">
                      <Share2 className="w-5 h-5" />
                      <span>แชร์</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {post.showComments && (
                    <div className="mt-4">
                      {/* Comment List */}
                      <div className="space-y-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-2">
                            <img 
                              src={comment.userImage} 
                              alt="" 
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="bg-gray-100 rounded-2xl px-3 py-2">
                                <p className="font-semibold text-sm">{comment.user}</p>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                              <div className="flex gap-4 mt-1 text-xs text-gray-500">
                                <button className="font-semibold hover:underline">
                                  ถูกใจ
                                </button>
                                <button className="font-semibold hover:underline">
                                  ตอบกลับ
                                </button>
                                <span>{comment.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Comment Input */}
                      <div className="flex items-center gap-2 mt-4">
                        <img 
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format"
                          alt="" 
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs({
                              ...commentInputs,
                              [post.id]: e.target.value
                            })}
                            placeholder="เขียนความคิดเห็น..."
                            className="w-full bg-gray-100 rounded-full py-2 pl-4 pr-12 text-sm"
                          />
                          <button 
                            onClick={() => handleCommentSubmit(post.id)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-blue-500 hover:bg-gray-200 rounded-full"
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 w-full bg-white border-t border-gray-200">
            <div className="flex justify-between px-4 py-2">
              <button 
                className={`p-2 ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('home')}
              >
                <Home className="w-6 h-6" />
              </button>
              <button 
                className={`p-2 ${activeTab === 'video' ? 'text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('video')}
              >
                <Video className="w-6 h-6" />
              </button>
              <button 
                className={`p-2 ${activeTab === 'marketplace' ? 'text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('marketplace')}
              >
                <Store className="w-6 h-6" />
              </button>
              <button 
                className={`p-2 ${activeTab === 'notifications' ? 'text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="w-6 h-6" />
              </button>
              <button 
                className={`p-2 ${activeTab === 'menu' ? 'text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('menu')}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    export default App;
