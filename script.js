// Sample posts data
const posts = [
    {
        id: 1,
        username: "Alex Johnson",
        content: "Just finished my morning hike! The view was absolutely breathtaking. Nature always has a way of refreshing the soul. 🌄 #Hiking #NatureLover",
        time: "2 hours ago",
        likes: 24,
        comments: 5,
        shares: 2,
        liked: false
    },
    {
        id: 2,
        username: "Sarah Miller",
        content: "Working on a new project that I'm really excited about! Can't wait to share more details soon. Stay tuned! 💻 #WorkInProgress #Excited",
        time: "5 hours ago",
        likes: 42,
        comments: 8,
        shares: 3,
        liked: true
    },
    {
        id: 3,
        username: "Mike Chen",
        content: "Just tried this amazing new coffee shop downtown. Their latte art is on point! ☕",
        time: "1 day ago",
        likes: 18,
        comments: 3,
        shares: 1,
        liked: false
    }
];

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeLogin = document.getElementById('closeLogin');
const closeSignup = document.getElementById('closeSignup');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const postsContainer = document.getElementById('postsContainer');
const postInput = document.querySelector('.post-input');
const postBtn = document.querySelector('.post-btn');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Modal Controls
loginBtn.addEventListener('click', () => {
    loginModal.classList.add('show');
});

signupBtn.addEventListener('click', () => {
    signupModal.classList.add('show');
});

closeLogin.addEventListener('click', () => {
    loginModal.classList.remove('show');
});

closeSignup.addEventListener('click', () => {
    signupModal.classList.remove('show');
});

showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('show');
    signupModal.classList.add('show');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.classList.remove('show');
    loginModal.classList.add('show');
});

// Form Submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (email && password) {
        alert('Login successful! Welcome back to VibeNest!');
        loginModal.classList.remove('show');
        // In a real app, you would handle authentication here
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Simple validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (name && email && password) {
        alert(`Welcome to VibeNest, ${name}! Your account has been created successfully.`);
        signupModal.classList.remove('show');
        // In a real app, you would handle user registration here
    }
});

// Create Post
postBtn.addEventListener('click', () => {
    const content = postInput.value.trim();
    if (content) {
        const newPost = {
            id: posts.length + 1,
            username: "You",
            content: content,
            time: "Just now",
            likes: 0,
            comments: 0,
            shares: 0,
            liked: false
        };
        
        posts.unshift(newPost);
        renderPosts();
        postInput.value = '';
        
        // Show success message with animation
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Post published successfully!';
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow);
            z-index: 1000;
            animation: slideUp 0.3s ease;
        `;
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    } else {
        alert('Please write something to post!');
    }
});

// Render Posts
function renderPosts() {
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <div class="user-avatar">${post.username.charAt(0)}</div>
                <div class="user-info">
                    <div class="username">${post.username}</div>
                    <div class="post-time">${post.time}</div>
                </div>
                <div class="post-options">
                    <button class="options-btn"><i class="fas fa-ellipsis-h"></i></button>
                    <div class="options-menu">
                        <button class="save-btn"><i class="far fa-bookmark"></i> Save Post</button>
                        ${post.username === "You" ? '<button class="delete-btn" data-id="' + post.id + '"><i class="far fa-trash-alt"></i> Delete</button>' : ''}
                    </div>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
            </div>
            <div class="post-stats">
                <div class="likes-count">${post.likes} likes</div>
                <div class="comments-count">${post.comments} comments</div>
            </div>
            <div class="post-actions-bottom">
                <button class="action-bottom like-btn ${post.liked ? 'liked' : ''}" data-id="${post.id}">
                    <i class="${post.liked ? 'fas' : 'far'} fa-heart"></i> Like
                </button>
                <button class="action-bottom comment-btn" data-id="${post.id}">
                    <i class="far fa-comment"></i> Comment
                </button>
                <button class="action-bottom share-btn" data-id="${post.id}">
                    <i class="far fa-share-square"></i> Share
                </button>
            </div>
        `;
        
        postsContainer.appendChild(postElement);
    });
    
    // Add event listeners for like buttons
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const postId = parseInt(e.currentTarget.getAttribute('data-id'));
            const post = posts.find(p => p.id === postId);
            
            if (post) {
                if (post.liked) {
                    post.likes--;
                    post.liked = false;
                } else {
                    post.likes++;
                    post.liked = true;
                    
                    // Add animation
                    e.currentTarget.classList.add('like-animation');
                    setTimeout(() => {
                        e.currentTarget.classList.remove('like-animation');
                    }, 300);
                }
                
                renderPosts();
            }
        });
    });
    
    // Add event listeners for options buttons
    document.querySelectorAll('.options-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const menu = e.currentTarget.nextElementSibling;
            menu.classList.toggle('show');
            
            // Close other open menus
            document.querySelectorAll('.options-menu').forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove('show');
                }
            });
        });
    });
    
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const postId = parseInt(e.currentTarget.getAttribute('data-id'));
            if (confirm('Are you sure you want to delete this post?')) {
                const index = posts.findIndex(p => p.id === postId);
                if (index !== -1) {
                    posts.splice(index, 1);
                    renderPosts();
                    
                    // Show delete confirmation
                    const deleteMsg = document.createElement('div');
                    deleteMsg.textContent = 'Post deleted successfully!';
                    deleteMsg.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: var(--danger-color);
                        color: white;
                        padding: 15px 20px;
                        border-radius: 8px;
                        box-shadow: var(--shadow);
                        z-index: 1000;
                        animation: slideUp 0.3s ease;
                    `;
                    document.body.appendChild(deleteMsg);
                    
                    setTimeout(() => {
                        deleteMsg.remove();
                    }, 3000);
                }
            }
        });
    });
    
    // Add event listeners for comment buttons
    document.querySelectorAll('.comment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const postId = parseInt(e.currentTarget.getAttribute('data-id'));
            alert(`Comment functionality for post ${postId} would be implemented here!`);
        });
    });
    
    // Add event listeners for share buttons
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const postId = parseInt(e.currentTarget.getAttribute('data-id'));
            alert(`Share functionality for post ${postId} would be implemented here!`);
        });
    });
}

// Close options menus when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.post-options')) {
        document.querySelectorAll('.options-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    }
});

// Sort buttons
document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        const sortType = e.currentTarget.textContent;
        let sortedPosts = [...posts];
        
        if (sortType === 'Popular') {
            sortedPosts.sort((a, b) => b.likes - a.likes);
        } else if (sortType === 'Latest') {
            sortedPosts.sort((a, b) => b.id - a.id);
        }
        // Following would require additional logic for actual following system
        
        posts.length = 0;
        posts.push(...sortedPosts);
        renderPosts();
    });
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm) {
        const filteredPosts = posts.filter(post => 
            post.content.toLowerCase().includes(searchTerm) || 
            post.username.toLowerCase().includes(searchTerm)
        );
        
        // Temporary render filtered posts
        const tempPosts = [...posts];
        posts.length = 0;
        posts.push(...filteredPosts);
        renderPosts();
        posts.length = 0;
        posts.push(...tempPosts);
    } else {
        renderPosts();
    }
});

// Allow Enter key to create post
postInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        postBtn.click();
    }
});

// Initial render
renderPosts();
// Add this to your existing script.js file

// Media Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get media action buttons
    const photoBtn = document.querySelector('.action-btn:nth-child(1)');
    const videoBtn = document.querySelector('.action-btn:nth-child(2)');
    
    // Create hidden file input elements
    const photoInput = document.createElement('input');
    photoInput.type = 'file';
    photoInput.accept = 'image/*';
    photoInput.style.display = 'none';
    photoInput.id = 'photoInput';
    
    const videoInput = document.createElement('input');
    videoInput.type = 'file';
    videoInput.accept = 'video/*';
    videoInput.style.display = 'none';
    videoInput.id = 'videoInput';
    
    // Add file inputs to DOM
    document.body.appendChild(photoInput);
    document.body.appendChild(videoInput);
    
    // Event listeners for media buttons
    photoBtn.addEventListener('click', function() {
        photoInput.click();
    });
    
    videoBtn.addEventListener('click', function() {
        videoInput.click();
    });
    
    // Handle photo selection
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                handleMediaUpload(file, 'image');
            } else {
                alert('Please select a valid image file (JPEG, PNG, GIF, etc.)');
            }
        }
    });
    
    // Handle video selection
    videoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('video/')) {
                handleMediaUpload(file, 'video');
            } else {
                alert('Please select a valid video file (MP4, AVI, MOV, etc.)');
            }
        }
    });
    
    // Function to handle media upload and preview
    function handleMediaUpload(file, type) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const mediaUrl = e.target.result;
            
            // Create preview container
            const previewContainer = document.createElement('div');
            previewContainer.className = 'media-preview';
            previewContainer.style.cssText = `
                margin: 15px 0;
                padding: 10px;
                border: 2px dashed var(--border-color);
                border-radius: 10px;
                position: relative;
            `;
            
            // Create media element based on type
            let mediaElement;
            if (type === 'image') {
                mediaElement = document.createElement('img');
                mediaElement.src = mediaUrl;
                mediaElement.style.cssText = `
                    max-width: 100%;
                    max-height: 300px;
                    border-radius: 8px;
                    display: block;
                    margin: 0 auto;
                `;
            } else {
                mediaElement = document.createElement('video');
                mediaElement.src = mediaUrl;
                mediaElement.controls = true;
                mediaElement.style.cssText = `
                    max-width: 100%;
                    max-height: 300px;
                    border-radius: 8px;
                    display: block;
                    margin: 0 auto;
                `;
            }
            
            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '<i class="fas fa-times"></i>';
            removeBtn.style.cssText = `
                position: absolute;
                top: 5px;
                right: 5px;
                background: var(--danger-color);
                color: white;
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            removeBtn.addEventListener('click', function() {
                previewContainer.remove();
                // Clear the file input
                if (type === 'image') {
                    photoInput.value = '';
                } else {
                    videoInput.value = '';
                }
            });
            
            // Add elements to preview container
            previewContainer.appendChild(mediaElement);
            previewContainer.appendChild(removeBtn);
            
            // Check if preview already exists and replace it
            const existingPreview = document.querySelector('.media-preview');
            if (existingPreview) {
                existingPreview.replaceWith(previewContainer);
            } else {
                // Insert preview after post input
                const postInput = document.querySelector('.post-input');
                postInput.parentNode.insertBefore(previewContainer, postInput.nextSibling);
            }
            
            // Show success message
            showNotification(`${type === 'image' ? 'Photo' : 'Video'} selected successfully!`, 'success');
        };
        
        reader.onerror = function() {
            showNotification('Error reading file. Please try again.', 'error');
        };
        
        reader.readAsDataURL(file);
    }
    
    // Function to show notifications
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: var(--shadow);
        `;
        
        if (type === 'success') {
            notification.style.backgroundColor = 'var(--success-color)';
        } else {
            notification.style.backgroundColor = 'var(--danger-color)';
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .media-preview {
            transition: all 0.3s ease;
        }
        
        .media-preview img,
        .media-preview video {
            transition: transform 0.3s ease;
        }
        
        .media-preview:hover img,
        .media-preview:hover video {
            transform: scale(1.02);
        }
    `;
    document.head.appendChild(style);
    
    // Enhanced post creation to handle media
    const originalPostBtn = document.querySelector('.post-btn');
    const originalPostHandler = originalPostBtn.onclick;
    
    originalPostBtn.addEventListener('click', function(e) {
        const postInput = document.querySelector('.post-input');
        const content = postInput.value.trim();
        const mediaPreview = document.querySelector('.media-preview');
        
        if (!content && !mediaPreview) {
            showNotification('Please write something or add media to post!', 'error');
            return;
        }
        
        // Get media data if exists
        let mediaData = null;
        if (mediaPreview) {
            const mediaElement = mediaPreview.querySelector('img, video');
            if (mediaElement) {
                mediaData = {
                    type: mediaElement.tagName.toLowerCase(),
                    src: mediaElement.src
                };
            }
        }
        
        // Create new post with media
        const newPost = {
            id: posts.length + 1,
            username: "You",
            content: content,
            time: "Just now",
            likes: 0,
            comments: 0,
            shares: 0,
            liked: false,
            media: mediaData
        };
        
        posts.unshift(newPost);
        renderPosts();
        
        // Clear inputs and preview
        postInput.value = '';
        if (mediaPreview) {
            mediaPreview.remove();
        }
        photoInput.value = '';
        videoInput.value = '';
        
        showNotification('Post published successfully!', 'success');
    });
    
    // Update renderPosts function to handle media
    const originalRenderPosts = renderPosts;
    renderPosts = function() {
        postsContainer.innerHTML = '';
        
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            
            let mediaHTML = '';
            if (post.media) {
                if (post.media.type === 'img') {
                    mediaHTML = `<img src="${post.media.src}" class="post-image" alt="Post image">`;
                } else if (post.media.type === 'video') {
                    mediaHTML = `<video src="${post.media.src}" class="post-image" controls></video>`;
                }
            }
            
            postElement.innerHTML = `
                <div class="post-header">
                    <div class="user-avatar">${post.username.charAt(0)}</div>
                    <div class="user-info">
                        <div class="username">${post.username}</div>
                        <div class="post-time">${post.time}</div>
                    </div>
                    <div class="post-options">
                        <button class="options-btn"><i class="fas fa-ellipsis-h"></i></button>
                        <div class="options-menu">
                            <button class="save-btn"><i class="far fa-bookmark"></i> Save Post</button>
                            ${post.username === "You" ? '<button class="delete-btn" data-id="' + post.id + '"><i class="far fa-trash-alt"></i> Delete</button>' : ''}
                        </div>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                </div>
                ${mediaHTML}
                <div class="post-stats">
                    <div class="likes-count">${post.likes} likes</div>
                    <div class="comments-count">${post.comments} comments</div>
                </div>
                <div class="post-actions-bottom">
                    <button class="action-bottom like-btn ${post.liked ? 'liked' : ''}" data-id="${post.id}">
                        <i class="${post.liked ? 'fas' : 'far'} fa-heart"></i> Like
                    </button>
                    <button class="action-bottom comment-btn" data-id="${post.id}">
                        <i class="far fa-comment"></i> Comment
                    </button>
                    <button class="action-bottom share-btn" data-id="${post.id}">
                        <i class="far fa-share-square"></i> Share
                    </button>
                </div>
            `;
            
            postsContainer.appendChild(postElement);
        });
        
        // Reattach event listeners
        attachPostEventListeners();
    };
    
    // Function to attach event listeners to posts
    function attachPostEventListeners() {
        // Like buttons
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = parseInt(e.currentTarget.getAttribute('data-id'));
                const post = posts.find(p => p.id === postId);
                
                if (post) {
                    if (post.liked) {
                        post.likes--;
                        post.liked = false;
                    } else {
                        post.likes++;
                        post.liked = true;
                        
                        e.currentTarget.classList.add('like-animation');
                        setTimeout(() => {
                            e.currentTarget.classList.remove('like-animation');
                        }, 300);
                    }
                    
                    renderPosts();
                }
            });
        });
        
        // Options buttons
        document.querySelectorAll('.options-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const menu = e.currentTarget.nextElementSibling;
                menu.classList.toggle('show');
                
                document.querySelectorAll('.options-menu').forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.classList.remove('show');
                    }
                });
            });
        });
        
        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = parseInt(e.currentTarget.getAttribute('data-id'));
                if (confirm('Are you sure you want to delete this post?')) {
                    const index = posts.findIndex(p => p.id === postId);
                    if (index !== -1) {
                        posts.splice(index, 1);
                        renderPosts();
                        showNotification('Post deleted successfully!', 'success');
                    }
                }
            });
        });
    }
    
    // Initial render
    renderPosts();
});
// Add this to your existing script.js file

// Sidebar Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all sidebar menu items
    const sidebarItems = document.querySelectorAll('.sidebar-menu a');
    
    // Add click event listeners to each menu item
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle different menu items
            const menuText = this.querySelector('span') ? this.querySelector('span').textContent : this.textContent;
            handleMenuClick(menuText.trim());
        });
    });
    
    // Function to handle menu clicks
    function handleMenuClick(menuName) {
        const postsContainer = document.getElementById('postsContainer');
        const postCreation = document.querySelector('.post-creation');
        const sortOptions = document.querySelector('.sort-options');
        
        // Hide all sections first
        hideAllSections();
        
        switch(menuName) {
            case 'Home':
                showHomeSection();
                showNotification('Home feed loaded', 'success');
                break;
                
            case 'Friends':
                showFriendsSection();
                showNotification('Friends page loaded', 'success');
                break;
                
            case 'Groups':
                showGroupsSection();
                showNotification('Groups page loaded', 'success');
                break;
                
            case 'Events':
                showEventsSection();
                showNotification('Events page loaded', 'success');
                break;
                
            case 'Saved':
                showSavedSection();
                showNotification('Saved posts loaded', 'success');
                break;
                
            case 'Settings':
                showSettingsSection();
                showNotification('Settings page loaded', 'success');
                break;
                
            default:
                showHomeSection();
                break;
        }
    }
    
    // Function to hide all sections
    function hideAllSections() {
        const sections = document.querySelectorAll('.dynamic-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Hide default feed elements
        const postCreation = document.querySelector('.post-creation');
        const sortOptions = document.querySelector('.sort-options');
        const postsContainer = document.getElementById('postsContainer');
        
        if (postCreation) postCreation.style.display = 'none';
        if (sortOptions) sortOptions.style.display = 'none';
        if (postsContainer) postsContainer.style.display = 'none';
    }
    
    // Home Section
    function showHomeSection() {
        const postCreation = document.querySelector('.post-creation');
        const sortOptions = document.querySelector('.sort-options');
        const postsContainer = document.getElementById('postsContainer');
        
        if (postCreation) postCreation.style.display = 'block';
        if (sortOptions) sortOptions.style.display = 'flex';
        if (postsContainer) {
            postsContainer.style.display = 'block';
            renderPosts();
        }
    }
    
    // Friends Section
    function showFriendsSection() {
        const feed = document.querySelector('.feed');
        let friendsSection = document.getElementById('friendsSection');
        
        if (!friendsSection) {
            friendsSection = document.createElement('div');
            friendsSection.id = 'friendsSection';
            friendsSection.className = 'dynamic-section';
            friendsSection.innerHTML = `
                <div class="section-header">
                    <h2><i class="fas fa-user-friends"></i> Friends</h2>
                    <div class="search-friends">
                        <input type="text" placeholder="Search friends..." class="search-input">
                    </div>
                </div>
                <div class="friends-grid">
                    <div class="friend-card">
                        <div class="friend-avatar">AJ</div>
                        <div class="friend-info">
                            <h3>Alex Johnson</h3>
                            <p>12 mutual friends</p>
                            <div class="friend-actions">
                                <button class="btn-primary">Message</button>
                                <button class="btn-secondary">Unfriend</button>
                            </div>
                        </div>
                    </div>
                    <div class="friend-card">
                        <div class="friend-avatar">SM</div>
                        <div class="friend-info">
                            <h3>Sarah Miller</h3>
                            <p>8 mutual friends</p>
                            <div class="friend-actions">
                                <button class="btn-primary">Message</button>
                                <button class="btn-secondary">Unfriend</button>
                            </div>
                        </div>
                    </div>
                    <div class="friend-card">
                        <div class="friend-avatar">MC</div>
                        <div class="friend-info">
                            <h3>Mike Chen</h3>
                            <p>15 mutual friends</p>
                            <div class="friend-actions">
                                <button class="btn-primary">Message</button>
                                <button class="btn-secondary">Unfriend</button>
                            </div>
                        </div>
                    </div>
                    <div class="friend-card">
                        <div class="friend-avatar">EP</div>
                        <div class="friend-info">
                            <h3>Emma Parker</h3>
                            <p>5 mutual friends</p>
                            <div class="friend-actions">
                                <button class="btn-primary">Message</button>
                                <button class="btn-secondary">Unfriend</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            feed.appendChild(friendsSection);
            
            // Add CSS for friends section
            addFriendsCSS();
        }
        
        friendsSection.style.display = 'block';
    }
    
    // Groups Section
    function showGroupsSection() {
        const feed = document.querySelector('.feed');
        let groupsSection = document.getElementById('groupsSection');
        
        if (!groupsSection) {
            groupsSection = document.createElement('div');
            groupsSection.id = 'groupsSection';
            groupsSection.className = 'dynamic-section';
            groupsSection.innerHTML = `
                <div class="section-header">
                    <h2><i class="fas fa-users"></i> Groups</h2>
                    <button class="btn-primary">Create Group</button>
                </div>
                <div class="groups-grid">
                    <div class="group-card">
                        <div class="group-icon"><i class="fas fa-hiking"></i></div>
                        <div class="group-info">
                            <h3>Nature Lovers</h3>
                            <p>45K members • Public</p>
                            <p>Share your love for nature and outdoor activities</p>
                        </div>
                        <button class="btn-secondary">Leave Group</button>
                    </div>
                    <div class="group-card">
                        <div class="group-icon"><i class="fas fa-laptop-code"></i></div>
                        <div class="group-info">
                            <h3>Tech Enthusiasts</h3>
                            <p>120K members • Public</p>
                            <p>Discuss the latest in technology and innovation</p>
                        </div>
                        <button class="btn-secondary">Leave Group</button>
                    </div>
                    <div class="group-card">
                        <div class="group-icon"><i class="fas fa-utensils"></i></div>
                        <div class="group-info">
                            <h3>Foodie Paradise</h3>
                            <p>89K members • Public</p>
                            <p>Share recipes and restaurant recommendations</p>
                        </div>
                        <button class="btn-secondary">Leave Group</button>
                    </div>
                </div>
            `;
            feed.appendChild(groupsSection);
            
            // Add CSS for groups section
            addGroupsCSS();
        }
        
        groupsSection.style.display = 'block';
    }
    
    // Events Section
    function showEventsSection() {
        const feed = document.querySelector('.feed');
        let eventsSection = document.getElementById('eventsSection');
        
        if (!eventsSection) {
            eventsSection = document.createElement('div');
            eventsSection.id = 'eventsSection';
            eventsSection.className = 'dynamic-section';
            eventsSection.innerHTML = `
                <div class="section-header">
                    <h2><i class="fas fa-calendar-alt"></i> Events</h2>
                    <button class="btn-primary">Create Event</button>
                </div>
                <div class="events-list">
                    <div class="event-card">
                        <div class="event-date">
                            <span class="day">15</span>
                            <span class="month">DEC</span>
                        </div>
                        <div class="event-info">
                            <h3>Tech Conference 2024</h3>
                            <p><i class="fas fa-map-marker-alt"></i> Convention Center</p>
                            <p><i class="fas fa-clock"></i> 9:00 AM - 6:00 PM</p>
                            <p>Annual technology conference featuring industry leaders</p>
                        </div>
                        <button class="btn-primary">Attend</button>
                    </div>
                    <div class="event-card">
                        <div class="event-date">
                            <span class="day">22</span>
                            <span class="month">DEC</span>
                        </div>
                        <div class="event-info">
                            <h3>Christmas Party</h3>
                            <p><i class="fas fa-map-marker-alt"></i> Central Park</p>
                            <p><i class="fas fa-clock"></i> 6:00 PM - 11:00 PM</p>
                            <p>Community Christmas celebration with food and music</p>
                        </div>
                        <button class="btn-primary">Attend</button>
                    </div>
                </div>
            `;
            feed.appendChild(eventsSection);
            
            // Add CSS for events section
            addEventsCSS();
        }
        
        eventsSection.style.display = 'block';
    }
    
    // Saved Section
    function showSavedSection() {
        const feed = document.querySelector('.feed');
        let savedSection = document.getElementById('savedSection');
        
        if (!savedSection) {
            savedSection = document.createElement('div');
            savedSection.id = 'savedSection';
            savedSection.className = 'dynamic-section';
            savedSection.innerHTML = `
                <div class="section-header">
                    <h2><i class="fas fa-bookmark"></i> Saved Posts</h2>
                </div>
                <div class="saved-posts">
                    <p>You haven't saved any posts yet.</p>
                    <p>Click the bookmark icon on any post to save it here.</p>
                </div>
            `;
            feed.appendChild(savedSection);
        }
        
        savedSection.style.display = 'block';
    }
    
    // Settings Section
    function showSettingsSection() {
        const feed = document.querySelector('.feed');
        let settingsSection = document.getElementById('settingsSection');
        
        if (!settingsSection) {
            settingsSection = document.createElement('div');
            settingsSection.id = 'settingsSection';
            settingsSection.className = 'dynamic-section';
            settingsSection.innerHTML = `
                <div class="section-header">
                    <h2><i class="fas fa-cog"></i> Settings</h2>
                </div>
                <div class="settings-content">
                    <div class="setting-item">
                        <h3>Account Settings</h3>
                        <button class="btn-secondary">Edit Profile</button>
                        <button class="btn-secondary">Change Password</button>
                        <button class="btn-secondary">Privacy Settings</button>
                    </div>
                    <div class="setting-item">
                        <h3>Notifications</h3>
                        <label class="switch">
                            <input type="checkbox" checked>
                            <span class="slider"></span>
                            <span>Push Notifications</span>
                        </label>
                        <label class="switch">
                            <input type="checkbox" checked>
                            <span class="slider"></span>
                            <span>Email Notifications</span>
                        </label>
                    </div>
                    <div class="setting-item">
                        <h3>Appearance</h3>
                        <button class="btn-secondary" id="themeToggleSettings">Toggle Dark Mode</button>
                    </div>
                </div>
            `;
            feed.appendChild(settingsSection);
            
            // Add theme toggle functionality in settings
            const themeToggleSettings = document.getElementById('themeToggleSettings');
            if (themeToggleSettings) {
                themeToggleSettings.addEventListener('click', function() {
                    document.body.classList.toggle('dark-theme');
                    const icon = document.querySelector('.theme-toggle i');
                    if (document.body.classList.contains('dark-theme')) {
                        icon.classList.remove('fa-moon');
                        icon.classList.add('fa-sun');
                    } else {
                        icon.classList.remove('fa-sun');
                        icon.classList.add('fa-moon');
                    }
                    showNotification('Theme updated', 'success');
                });
            }
            
            // Add CSS for settings section
            addSettingsCSS();
        }
        
        settingsSection.style.display = 'block';
    }
    
    // CSS for different sections
    function addFriendsCSS() {
        if (!document.getElementById('friendsCSS')) {
            const style = document.createElement('style');
            style.id = 'friendsCSS';
            style.textContent = `
                .friends-grid {
                    display: grid;
                    gap: 20px;
                    margin-top: 20px;
                }
                
                .friend-card {
                    display: flex;
                    align-items: center;
                    background: var(--card-bg);
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: var(--shadow);
                    gap: 15px;
                }
                
                .friend-avatar {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: var(--accent-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 1.2rem;
                }
                
                .friend-info {
                    flex: 1;
                }
                
                .friend-info h3 {
                    margin-bottom: 5px;
                }
                
                .friend-info p {
                    color: var(--text-color);
                    opacity: 0.7;
                    margin-bottom: 10px;
                }
                
                .friend-actions {
                    display: flex;
                    gap: 10px;
                }
                
                .btn-primary, .btn-secondary {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                }
                
                .btn-primary {
                    background: var(--primary-color);
                    color: white;
                }
                
                .btn-secondary {
                    background: var(--bg-color);
                    color: var(--text-color);
                    border: 1px solid var(--border-color);
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function addGroupsCSS() {
        if (!document.getElementById('groupsCSS')) {
            const style = document.createElement('style');
            style.id = 'groupsCSS';
            style.textContent = `
                .groups-grid {
                    display: grid;
                    gap: 20px;
                    margin-top: 20px;
                }
                
                .group-card {
                    display: flex;
                    align-items: center;
                    background: var(--card-bg);
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: var(--shadow);
                    gap: 15px;
                }
                
                .group-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: var(--primary-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.5rem;
                }
                
                .group-info {
                    flex: 1;
                }
                
                .group-info h3 {
                    margin-bottom: 5px;
                }
                
                .group-info p {
                    color: var(--text-color);
                    opacity: 0.7;
                    margin-bottom: 5px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function addEventsCSS() {
        if (!document.getElementById('eventsCSS')) {
            const style = document.createElement('style');
            style.id = 'eventsCSS';
            style.textContent = `
                .events-list {
                    display: grid;
                    gap: 20px;
                    margin-top: 20px;
                }
                
                .event-card {
                    display: flex;
                    align-items: center;
                    background: var(--card-bg);
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: var(--shadow);
                    gap: 20px;
                }
                
                .event-date {
                    text-align: center;
                    background: var(--primary-color);
                    color: white;
                    padding: 15px;
                    border-radius: 8px;
                    min-width: 70px;
                }
                
                .event-date .day {
                    font-size: 1.5rem;
                    font-weight: bold;
                    display: block;
                }
                
                .event-date .month {
                    font-size: 0.9rem;
                    display: block;
                }
                
                .event-info {
                    flex: 1;
                }
                
                .event-info h3 {
                    margin-bottom: 10px;
                }
                
                .event-info p {
                    color: var(--text-color);
                    opacity: 0.7;
                    margin-bottom: 5px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function addSettingsCSS() {
        if (!document.getElementById('settingsCSS')) {
            const style = document.createElement('style');
            style.id = 'settingsCSS';
            style.textContent = `
                .settings-content {
                    margin-top: 20px;
                }
                
                .setting-item {
                    background: var(--card-bg);
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: var(--shadow);
                    margin-bottom: 20px;
                }
                
                .setting-item h3 {
                    margin-bottom: 15px;
                    color: var(--primary-color);
                }
                
                .switch {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                    gap: 10px;
                    cursor: pointer;
                }
                
                .switch input {
                    display: none;
                }
                
                .slider {
                    width: 50px;
                    height: 25px;
                    background: var(--border-color);
                    border-radius: 25px;
                    position: relative;
                    transition: 0.3s;
                }
                
                .slider:before {
                    content: "";
                    position: absolute;
                    width: 21px;
                    height: 21px;
                    border-radius: 50%;
                    background: white;
                    top: 2px;
                    left: 2px;
                    transition: 0.3s;
                }
                
                input:checked + .slider {
                    background: var(--primary-color);
                }
                
                input:checked + .slider:before {
                    transform: translateX(25px);
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Common section header CSS
    if (!document.getElementById('sectionHeaderCSS')) {
        const style = document.createElement('style');
        style.id = 'sectionHeaderCSS';
        style.textContent = `
            .section-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding: 20px;
                background: var(--card-bg);
                border-radius: 10px;
                box-shadow: var(--shadow);
            }
            
            .section-header h2 {
                color: var(--primary-color);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .search-input {
                padding: 10px 15px;
                border: 1px solid var(--border-color);
                border-radius: 20px;
                background: var(--bg-color);
                color: var(--text-color);
                width: 250px;
            }
            
            .dynamic-section {
                animation: fadeIn 0.5s ease;
            }
        `;
        document.head.appendChild(style);
    }
});

// Notification function (reuse from previous code)
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: var(--shadow);
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = 'var(--success-color)';
    } else {
        notification.style.backgroundColor = 'var(--danger-color)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
// Add this to your existing script.js file

// Comment and Share Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Comment System
    function setupCommentSystem() {
        // Add comment button event listeners
        document.addEventListener('click', function(e) {
            if (e.target.closest('.comment-btn')) {
                const postId = e.target.closest('.comment-btn').getAttribute('data-id');
                openCommentModal(postId);
            }
        });
        
        // Add comment submission
        document.addEventListener('submit', function(e) {
            if (e.target.classList.contains('comment-form')) {
                e.preventDefault();
                const postId = e.target.getAttribute('data-post-id');
                const commentInput = e.target.querySelector('.comment-input');
                const commentText = commentInput.value.trim();
                
                if (commentText) {
                    addComment(postId, commentText);
                    commentInput.value = '';
                    showNotification('Comment added successfully!', 'success');
                }
            }
        });
    }
    
    // Open Comment Modal
    function openCommentModal(postId) {
        const post = posts.find(p => p.id === parseInt(postId));
        if (!post) return;
        
        // Create comment modal
        const commentModal = document.createElement('div');
        commentModal.className = 'modal show';
        commentModal.innerHTML = `
            <div class="modal-content comment-modal">
                <div class="modal-header">
                    <h2 class="modal-title">Comments</h2>
                    <button class="close-btn close-comment-modal">&times;</button>
                </div>
                <div class="comments-container">
                    ${renderComments(post.comments || [])}
                </div>
                <form class="comment-form" data-post-id="${postId}">
                    <div class="comment-input-container">
                        <input type="text" class="comment-input" placeholder="Write a comment..." required>
                        <button type="submit" class="comment-submit-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(commentModal);
        
        // Close modal events
        const closeBtn = commentModal.querySelector('.close-comment-modal');
        closeBtn.addEventListener('click', () => {
            commentModal.remove();
        });
        
        commentModal.addEventListener('click', (e) => {
            if (e.target === commentModal) {
                commentModal.remove();
            }
        });
        
        // Add CSS for comments
        addCommentCSS();
    }
    
    // Render Comments
    function renderComments(comments) {
        if (!comments || comments.length === 0) {
            return '<div class="no-comments">No comments yet. Be the first to comment!</div>';
        }
        
        return comments.map(comment => `
            <div class="comment-item">
                <div class="comment-avatar">${comment.user.charAt(0)}</div>
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-user">${comment.user}</span>
                        <span class="comment-time">${comment.time}</span>
                    </div>
                    <div class="comment-text">${comment.text}</div>
                    <div class="comment-actions">
                        <button class="comment-like-btn ${comment.liked ? 'liked' : ''}" data-comment-id="${comment.id}">
                            <i class="${comment.liked ? 'fas' : 'far'} fa-heart"></i>
                            <span>${comment.likes || 0}</span>
                        </button>
                        <button class="comment-reply-btn">Reply</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Add Comment
    function addComment(postId, commentText) {
        const post = posts.find(p => p.id === parseInt(postId));
        if (!post) return;
        
        if (!post.comments) {
            post.comments = [];
        }
        
        const newComment = {
            id: Date.now(),
            user: "You",
            text: commentText,
            time: "Just now",
            likes: 0,
            liked: false
        };
        
        post.comments.unshift(newComment);
        post.comments = (post.comments || 0) + 1;
        
        // Update comment modal if open
        const commentModal = document.querySelector('.comment-modal');
        if (commentModal) {
            const commentsContainer = commentModal.querySelector('.comments-container');
            commentsContainer.innerHTML = renderComments(post.comments);
            
            // Reattach event listeners for new comments
            attachCommentEventListeners();
        }
        
        // Update post stats
        renderPosts();
    }
    
    // Share System
    function setupShareSystem() {
        document.addEventListener('click', function(e) {
            if (e.target.closest('.share-btn')) {
                const postId = e.target.closest('.share-btn').getAttribute('data-id');
                openShareModal(postId);
            }
        });
    }
    
    // Open Share Modal
    function openShareModal(postId) {
        const post = posts.find(p => p.id === parseInt(postId));
        if (!post) return;
        
        const shareModal = document.createElement('div');
        shareModal.className = 'modal show';
        shareModal.innerHTML = `
            <div class="modal-content share-modal">
                <div class="modal-header">
                    <h2 class="modal-title">Share Post</h2>
                    <button class="close-btn close-share-modal">&times;</button>
                </div>
                <div class="share-options">
                    <div class="share-option" data-method="copy">
                        <i class="fas fa-copy"></i>
                        <span>Copy Link</span>
                    </div>
                    <div class="share-option" data-method="message">
                        <i class="fas fa-comment"></i>
                        <span>Send in Message</span>
                    </div>
                    <div class="share-option" data-method="friends">
                        <i class="fas fa-user-friends"></i>
                        <span>Share with Friends</span>
                    </div>
                    <div class="share-option" data-method="groups">
                        <i class="fas fa-users"></i>
                        <span>Share in Group</span>
                    </div>
                </div>
                <div class="share-preview">
                    <div class="post-preview">
                        <div class="preview-header">
                            <div class="preview-avatar">${post.username.charAt(0)}</div>
                            <div class="preview-info">
                                <div class="preview-username">${post.username}</div>
                                <div class="preview-time">${post.time}</div>
                            </div>
                        </div>
                        <div class="preview-content">
                            ${post.content}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(shareModal);
        
        // Close modal events
        const closeBtn = shareModal.querySelector('.close-share-modal');
        closeBtn.addEventListener('click', () => {
            shareModal.remove();
        });
        
        shareModal.addEventListener('click', (e) => {
            if (e.target === shareModal) {
                shareModal.remove();
            }
        });
        
        // Share option clicks
        const shareOptions = shareModal.querySelectorAll('.share-option');
        shareOptions.forEach(option => {
            option.addEventListener('click', () => {
                const method = option.getAttribute('data-method');
                handleShare(method, postId);
            });
        });
        
        // Add CSS for share modal
        addShareCSS();
    }
    
    // Handle Share
    function handleShare(method, postId) {
        const post = posts.find(p => p.id === parseInt(postId));
        if (!post) return;
        
        switch(method) {
            case 'copy':
                navigator.clipboard.writeText(`https://vibenest.com/post/${postId}`)
                    .then(() => {
                        showNotification('Link copied to clipboard!', 'success');
                    })
                    .catch(() => {
                        showNotification('Failed to copy link', 'error');
                    });
                break;
                
            case 'message':
                showNotification('Open messages to share this post', 'success');
                // In real app, this would open messaging interface
                break;
                
            case 'friends':
                openFriendShareModal(postId);
                break;
                
            case 'groups':
                openGroupShareModal(postId);
                break;
        }
        
        // Close share modal
        const shareModal = document.querySelector('.share-modal');
        if (shareModal) {
            shareModal.closest('.modal').remove();
        }
        
        // Update share count
        post.shares = (post.shares || 0) + 1;
        renderPosts();
    }
    
    // Share with Friends Modal
    function openFriendShareModal(postId) {
        const friends = [
            { id: 1, name: "Alex Johnson", avatar: "AJ" },
            { id: 2, name: "Sarah Miller", avatar: "SM" },
            { id: 3, name: "Mike Chen", avatar: "MC" },
            { id: 4, name: "Emma Parker", avatar: "EP" }
        ];
        
        const friendModal = document.createElement('div');
        friendModal.className = 'modal show';
        friendModal.innerHTML = `
            <div class="modal-content friend-share-modal">
                <div class="modal-header">
                    <h2 class="modal-title">Share with Friends</h2>
                    <button class="close-btn close-friend-modal">&times;</button>
                </div>
                <div class="friends-list">
                    ${friends.map(friend => `
                        <div class="friend-share-item" data-friend-id="${friend.id}">
                            <div class="friend-share-avatar">${friend.avatar}</div>
                            <div class="friend-share-name">${friend.name}</div>
                            <input type="checkbox" class="friend-checkbox">
                        </div>
                    `).join('')}
                </div>
                <div class="share-actions">
                    <button class="btn-secondary cancel-share">Cancel</button>
                    <button class="btn-primary confirm-share">Share</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(friendModal);
        
        // Close events
        const closeBtn = friendModal.querySelector('.close-friend-modal');
        const cancelBtn = friendModal.querySelector('.cancel-share');
        
        [closeBtn, cancelBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                friendModal.remove();
            });
        });
        
        // Confirm share
        const confirmBtn = friendModal.querySelector('.confirm-share');
        confirmBtn.addEventListener('click', () => {
            const selectedFriends = friendModal.querySelectorAll('.friend-checkbox:checked');
            if (selectedFriends.length > 0) {
                showNotification(`Post shared with ${selectedFriends.length} friend(s)!`, 'success');
                friendModal.remove();
            } else {
                showNotification('Please select at least one friend', 'error');
            }
        });
    }
    
    // Share in Groups Modal
    function openGroupShareModal(postId) {
        const groups = [
            { id: 1, name: "Nature Lovers", members: "45K" },
            { id: 2, name: "Tech Enthusiasts", members: "120K" },
            { id: 3, name: "Foodie Paradise", members: "89K" }
        ];
        
        const groupModal = document.createElement('div');
        groupModal.className = 'modal show';
        groupModal.innerHTML = `
            <div class="modal-content group-share-modal">
                <div class="modal-header">
                    <h2 class="modal-title">Share in Group</h2>
                    <button class="close-btn close-group-modal">&times;</button>
                </div>
                <div class="groups-list">
                    ${groups.map(group => `
                        <div class="group-share-item" data-group-id="${group.id}">
                            <div class="group-share-info">
                                <div class="group-share-name">${group.name}</div>
                                <div class="group-share-members">${group.members} members</div>
                            </div>
                            <input type="radio" name="group-share" class="group-radio">
                        </div>
                    `).join('')}
                </div>
                <div class="share-actions">
                    <button class="btn-secondary cancel-group-share">Cancel</button>
                    <button class="btn-primary confirm-group-share">Share</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(groupModal);
        
        // Close events
        const closeBtn = groupModal.querySelector('.close-group-modal');
        const cancelBtn = groupModal.querySelector('.cancel-group-share');
        
        [closeBtn, cancelBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                groupModal.remove();
            });
        });
        
        // Confirm share
        const confirmBtn = groupModal.querySelector('.confirm-group-share');
        confirmBtn.addEventListener('click', () => {
            const selectedGroup = groupModal.querySelector('.group-radio:checked');
            if (selectedGroup) {
                const groupItem = selectedGroup.closest('.group-share-item');
                const groupName = groupItem.querySelector('.group-share-name').textContent;
                showNotification(`Post shared in ${groupName}!`, 'success');
                groupModal.remove();
            } else {
                showNotification('Please select a group', 'error');
            }
        });
    }
    
    // Add CSS for Comments
    function addCommentCSS() {
        if (!document.getElementById('commentCSS')) {
            const style = document.createElement('style');
            style.id = 'commentCSS';
            style.textContent = `
                .comment-modal {
                    max-width: 600px;
                    max-height: 80vh;
                    display: flex;
                    flex-direction: column;
                }
                
                .comments-container {
                    flex: 1;
                    overflow-y: auto;
                    max-height: 400px;
                    margin-bottom: 20px;
                }
                
                .comment-item {
                    display: flex;
                    gap: 12px;
                    padding: 15px 0;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .comment-avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background: var(--accent-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 0.9rem;
                    flex-shrink: 0;
                }
                
                .comment-content {
                    flex: 1;
                }
                
                .comment-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 5px;
                }
                
                .comment-user {
                    font-weight: 600;
                    color: var(--text-color);
                }
                
                .comment-time {
                    font-size: 0.8rem;
                    color: var(--text-color);
                    opacity: 0.7;
                }
                
                .comment-text {
                    margin-bottom: 8px;
                    line-height: 1.4;
                }
                
                .comment-actions {
                    display: flex;
                    gap: 15px;
                }
                
                .comment-like-btn, .comment-reply-btn {
                    background: none;
                    border: none;
                    color: var(--text-color);
                    font-size: 0.8rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 4px 8px;
                    border-radius: 12px;
                }
                
                .comment-like-btn:hover, .comment-reply-btn:hover {
                    background: var(--bg-color);
                }
                
                .comment-like-btn.liked {
                    color: var(--danger-color);
                }
                
                .comment-input-container {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }
                
                .comment-input {
                    flex: 1;
                    padding: 12px 15px;
                    border: 1px solid var(--border-color);
                    border-radius: 25px;
                    background: var(--bg-color);
                    color: var(--text-color);
                }
                
                .comment-submit-btn {
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .no-comments {
                    text-align: center;
                    padding: 40px 20px;
                    color: var(--text-color);
                    opacity: 0.7;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Add CSS for Share
    function addShareCSS() {
        if (!document.getElementById('shareCSS')) {
            const style = document.createElement('style');
            style.id = 'shareCSS';
            style.textContent = `
                .share-modal {
                    max-width: 500px;
                }
                
                .share-options {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                
                .share-option {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    padding: 20px;
                    border: 2px solid var(--border-color);
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .share-option:hover {
                    border-color: var(--primary-color);
                    background: var(--bg-color);
                    transform: translateY(-2px);
                }
                
                .share-option i {
                    font-size: 1.5rem;
                    color: var(--primary-color);
                }
                
                .share-preview {
                    background: var(--bg-color);
                    padding: 15px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                }
                
                .post-preview {
                    background: var(--card-bg);
                    padding: 15px;
                    border-radius: 8px;
                }
                
                .preview-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 10px;
                }
                
                .preview-avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background: var(--accent-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 0.9rem;
                }
                
                .preview-username {
                    font-weight: 600;
                    font-size: 0.9rem;
                }
                
                .preview-time {
                    font-size: 0.8rem;
                    opacity: 0.7;
                }
                
                .preview-content {
                    font-size: 0.9rem;
                    line-height: 1.4;
                }
                
                /* Friend Share Modal */
                .friend-share-modal, .group-share-modal {
                    max-width: 400px;
                }
                
                .friends-list, .groups-list {
                    max-height: 300px;
                    overflow-y: auto;
                    margin-bottom: 20px;
                }
                
                .friend-share-item, .group-share-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    border-bottom: 1px solid var(--border-color);
                    cursor: pointer;
                }
                
                .friend-share-item:hover, .group-share-item:hover {
                    background: var(--bg-color);
                }
                
                .friend-share-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--accent-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                }
                
                .friend-share-name {
                    flex: 1;
                    font-weight: 600;
                }
                
                .group-share-info {
                    flex: 1;
                }
                
                .group-share-name {
                    font-weight: 600;
                    margin-bottom: 2px;
                }
                
                .group-share-members {
                    font-size: 0.8rem;
                    opacity: 0.7;
                }
                
                .friend-checkbox, .group-radio {
                    width: 18px;
                    height: 18px;
                }
                
                .share-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Attach comment event listeners
    function attachCommentEventListeners() {
        // Comment like buttons
        document.querySelectorAll('.comment-like-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const commentId = this.getAttribute('data-comment-id');
                const isLiked = this.classList.contains('liked');
                
                if (isLiked) {
                    this.classList.remove('liked');
                    this.querySelector('i').classList.replace('fas', 'far');
                    const likesSpan = this.querySelector('span');
                    likesSpan.textContent = parseInt(likesSpan.textContent) - 1;
                } else {
                    this.classList.add('liked');
                    this.querySelector('i').classList.replace('far', 'fas');
                    const likesSpan = this.querySelector('span');
                    likesSpan.textContent = parseInt(likesSpan.textContent) + 1;
                    
                    // Add animation
                    this.classList.add('like-animation');
                    setTimeout(() => {
                        this.classList.remove('like-animation');
                    }, 300);
                }
            });
        });
    }
    
    // Initialize comment and share systems
    setupCommentSystem();
    setupShareSystem();
    
    // Update sample posts to include comments
    if (posts.length > 0 && !posts[0].comments) {
        posts[0].comments = [
            {
                id: 1,
                user: "Sarah Miller",
                text: "Looks amazing! Which trail did you take?",
                time: "1 hour ago",
                likes: 2,
                liked: true
            },
            {
                id: 2,
                user: "Mike Chen",
                text: "Great photo! The colors are beautiful 🍂",
                time: "45 minutes ago",
                likes: 1,
                liked: false
            }
        ];
        posts[0].comments = 2;
        
        posts[1].comments = [
            {
                id: 3,
                user: "Alex Johnson",
                text: "Can't wait to see what you're working on!",
                time: "2 hours ago",
                likes: 0,
                liked: false
            }
        ];
        posts[1].comments = 1;
    }
});
// Replace your existing comment system code with this:

// Fixed Comment System
function setupCommentSystem() {
    // This will be called when posts are rendered
    console.log("Comment system setup");
}

// Open Comment Modal - Fixed version
function openCommentModal(postId) {
    console.log("Opening comment modal for post:", postId);
    
    const post = posts.find(p => p.id === parseInt(postId));
    if (!post) {
        console.log("Post not found");
        return;
    }

    // Create comment modal
    const commentModal = document.createElement('div');
    commentModal.className = 'modal show';
    commentModal.innerHTML = `
        <div class="modal-content comment-modal">
            <div class="modal-header">
                <h2 class="modal-title">Comments</h2>
                <button class="close-btn close-comment-modal">&times;</button>
            </div>
            <div class="comments-container">
                ${renderComments(post.comments || [])}
            </div>
            <form class="comment-form" data-post-id="${postId}">
                <div class="comment-input-container">
                    <input type="text" class="comment-input" placeholder="Write a comment..." required>
                    <button type="submit" class="comment-submit-btn">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(commentModal);

    // Close modal events
    const closeBtn = commentModal.querySelector('.close-comment-modal');
    closeBtn.addEventListener('click', () => {
        commentModal.remove();
    });

    commentModal.addEventListener('click', (e) => {
        if (e.target === commentModal) {
            commentModal.remove();
        }
    });

    // Comment form submission
    const commentForm = commentModal.querySelector('.comment-form');
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const commentInput = this.querySelector('.comment-input');
        const commentText = commentInput.value.trim();
        
        if (commentText) {
            addComment(postId, commentText);
            commentInput.value = '';
            showNotification('Comment added successfully!', 'success');
        }
    });

    // Add event listeners for comment likes
    attachCommentEventListeners();
    
    // Add CSS for comments
    addCommentCSS();
}

// Update your renderPosts function to include this:
function renderPosts() {
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.setAttribute('data-post-id', post.id); // Add this line
        
        let mediaHTML = '';
        if (post.media) {
            if (post.media.type === 'img') {
                mediaHTML = `<img src="${post.media.src}" class="post-image" alt="Post image">`;
            } else if (post.media.type === 'video') {
                mediaHTML = `<video src="${post.media.src}" class="post-image" controls></video>`;
            }
        }
        
        postElement.innerHTML = `
            <div class="post-header">
                <div class="user-avatar">${post.username.charAt(0)}</div>
                <div class="user-info">
                    <div class="username">${post.username}</div>
                    <div class="post-time">${post.time}</div>
                </div>
                <div class="post-options">
                    <button class="options-btn"><i class="fas fa-ellipsis-h"></i></button>
                    <div class="options-menu">
                        <button class="save-btn"><i class="far fa-bookmark"></i> Save Post</button>
                        ${post.username === "You" ? '<button class="delete-btn" data-id="' + post.id + '"><i class="far fa-trash-alt"></i> Delete</button>' : ''}
                    </div>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
            </div>
            ${mediaHTML}
            <div class="post-stats">
                <div class="likes-count">${post.likes} likes</div>
                <div class="comments-count">${post.commentsCount || 0} comments</div>
            </div>
            <div class="post-actions-bottom">
                <button class="action-bottom like-btn ${post.liked ? 'liked' : ''}" data-id="${post.id}">
                    <i class="${post.liked ? 'fas' : 'far'} fa-heart"></i> Like
                </button>
                <button class="action-bottom comment-btn" data-id="${post.id}">
                    <i class="far fa-comment"></i> Comment
                </button>
                <button class="action-bottom share-btn" data-id="${post.id}">
                    <i class="far fa-share-square"></i> Share
                </button>
            </div>
        `;
        
        postsContainer.appendChild(postElement);
    });
    
    // Add comment button event listeners AFTER posts are rendered
    attachCommentButtonListeners();
    
    // Add other event listeners
    attachPostEventListeners();
}

// Add this new function to attach comment button listeners
function attachCommentButtonListeners() {
    console.log("Attaching comment button listeners");
    
    const commentButtons = document.querySelectorAll('.comment-btn');
    console.log("Found comment buttons:", commentButtons.length);
    
    commentButtons.forEach(btn => {
        // Remove existing listeners first
        btn.replaceWith(btn.cloneNode(true));
    });
    
    // Re-attach listeners
    document.querySelectorAll('.comment-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const postId = this.getAttribute('data-id');
            console.log("Comment button clicked for post:", postId);
            openCommentModal(postId);
        });
    });
}

// Update your existing attachPostEventListeners function:
function attachPostEventListeners() {
    // Like buttons
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const postId = parseInt(e.currentTarget.getAttribute('data-id'));
            const post = posts.find(p => p.id === postId);
            
            if (post) {
                if (post.liked) {
                    post.likes--;
                    post.liked = false;
                } else {
                    post.likes++;
                    post.liked = true;
                    
                    e.currentTarget.classList.add('like-animation');
                    setTimeout(() => {
                        e.currentTarget.classList.remove('like-animation');
                    }, 300);
                }
                
                renderPosts();
            }
        });
    });
    
    // Options buttons
    document.querySelectorAll('.options-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const menu = e.currentTarget.nextElementSibling;
            menu.classList.toggle('show');
            
            document.querySelectorAll('.options-menu').forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove('show');
                }
            });
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const postId = parseInt(e.currentTarget.getAttribute('data-id'));
            if (confirm('Are you sure you want to delete this post?')) {
                const index = posts.findIndex(p => p.id === postId);
                if (index !== -1) {
                    posts.splice(index, 1);
                    renderPosts();
                    showNotification('Post deleted successfully!', 'success');
                }
            }
        });
    });
    
    // Share buttons
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const postId = e.currentTarget.getAttribute('data-id');
            openShareModal(postId);
        });
    });
}

// Make sure this is called when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - initializing comment system");
    
    // Initialize comment and share systems
    setupCommentSystem();
    setupShareSystem();
    
    // Update sample posts to include comments
    if (posts.length > 0 && !posts[0].comments) {
        posts[0].comments = [
            {
                id: 1,
                user: "Sarah Miller",
                text: "Looks amazing! Which trail did you take?",
                time: "1 hour ago",
                likes: 2,
                liked: true
            },
            {
                id: 2,
                user: "Mike Chen",
                text: "Great photo! The colors are beautiful 🍂",
                time: "45 minutes ago",
                likes: 1,
                liked: false
            }
        ];
        posts[0].commentsCount = 2;
        
        posts[1].comments = [
            {
                id: 3,
                user: "Alex Johnson",
                text: "Can't wait to see what you're working on!",
                time: "2 hours ago",
                likes: 0,
                liked: false
            }
        ];
        posts[1].commentsCount = 1;
    }
    
    // Initial render
    renderPosts();
});
// Test if comment buttons exist
console.log("Comment buttons:", document.querySelectorAll('.comment-btn').length);

// Test if click works
document.querySelector('.comment-btn').addEventListener('click', function() {
    console.log("Comment button clicked!");
});

const friends = [
    { id: 1, name: "Alex Johnson", mutual: 5, added: true },
    { id: 2, name: "Sarah Miller", mutual: 2, added: false },
    { id: 3, name: "Mike Chen", mutual: 8, added: true },
    { id: 4, name: "Emily Davis", mutual: 1, added: false }
];

function renderFriends() {
    const container = document.getElementById("friendsContainer");
    if (!container) return;

    container.innerHTML = friends.map(f => `
        <div class="friend-card">
            <div class="friend-avatar">${f.name.charAt(0)}</div>
            <div class="friend-info">
                <h4>${f.name}</h4>
                <p>${f.mutual} mutual friends</p>
            </div>
            <button class="friend-btn" data-id="${f.id}">
                ${f.added ? "Remove" : "Add Friend"}
            </button>
        </div>
    `).join("");

    // Add/Remove Events
    document.querySelectorAll(".friend-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            const f = friends.find(x => x.id === id);
            f.added = !f.added;
            renderFriends();
        });
    });
}
const groups = [
    { id: 1, name: "Developers Hub", members: 1200, joined: true },
    { id: 2, name: "UI/UX Designers", members: 800, joined: false },
    { id: 3, name: "Fitness Community", members: 540, joined: false }
];
function renderGroups() {
    const container = document.getElementById("groupsContainer");
    if (!container) return;

    container.innerHTML = groups.map(g => `
        <div class="group-card">
            <div class="group-icon"><i class="fas fa-users"></i></div>
            <div class="group-info">
                <h4>${g.name}</h4>
                <p>${g.members} members</p>
            </div>
            <button class="group-btn" data-id="${g.id}">
                ${g.joined ? "Leave" : "Join"}
            </button>
        </div>
    `).join("");

    document.querySelectorAll(".group-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            const g = groups.find(x => x.id === id);
            g.joined = !g.joined;
            renderGroups();
        });
    });
}
const events = [
    { id: 1, title: "Hackathon 2025", date: "Dec 20", status: "interested" },
    { id: 2, title: "Design Meetup", date: "Dec 28", status: "none" },
    { id: 3, title: "AI Bootcamp", date: "Jan 5", status: "going" }
];
const settings = {
    darkMode: false,
    privacy: "Public",
};
function renderSettings() {
    const container = document.getElementById("settingsContainer");
    if (!container) return;

    container.innerHTML = `
        <div class="setting-item">
            <label>Dark Mode</label>
            <input type="checkbox" id="toggleDark" ${settings.darkMode ? "checked" : ""}>
        </div>

        <div class="setting-item">
            <label>Privacy</label>
            <select id="privacySelect">
                <option ${settings.privacy === "Public" ? "selected" : ""}>Public</option>
                <option ${settings.privacy === "Friends" ? "selected" : ""}>Friends</option>
                <option ${settings.privacy === "Only Me" ? "selected" : ""}>Only Me</option>
            </select>
        </div>

        <button id="logoutBtn" class="logout-btn">Logout</button>
    `;

    document.getElementById("toggleDark").addEventListener("change", e => {
        settings.darkMode = e.target.checked;
        document.body.classList.toggle("dark-theme", settings.darkMode);
    });

    document.getElementById("privacySelect").addEventListener("change", e => {
        settings.privacy = e.target.value;
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
        alert("Logged out!");
    });
}
document.getElementById("friendsTab").addEventListener("click", renderFriends);
document.getElementById("groupsTab").addEventListener("click", renderGroups);
document.getElementById("eventsTab").addEventListener("click", renderEvents);
document.getElementById("settingsTab").addEventListener("click", renderSettings);