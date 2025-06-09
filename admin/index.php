
<?php
session_start();
require_once 'config.php';

// Handle login
if (isset($_POST['login'])) {
    if ($_POST['username'] === 'admin' && password_verify($_POST['password'], $admin_credentials['password'])) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: index.php');
        exit;
    } else {
        $error = 'Invalid credentials';
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// Check if logged in
if (!isset($_SESSION['admin_logged_in'])) {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Portfolio Admin - Login</title>
        <link href="../style.css" rel="stylesheet">
        <style>
            .login-container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: #0a0a0a;
            }
            .login-form {
                background: rgba(255,255,255,0.1);
                padding: 40px;
                border-radius: 20px;
                border: 1px solid rgba(0,255,255,0.2);
                backdrop-filter: blur(10px);
                width: 100%;
                max-width: 400px;
            }
            .login-form h2 {
                color: #00ffff;
                text-align: center;
                margin-bottom: 30px;
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-group input {
                width: 100%;
                padding: 15px;
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(0,255,255,0.2);
                border-radius: 10px;
                color: white;
                font-size: 16px;
            }
            .form-group input::placeholder {
                color: rgba(255,255,255,0.6);
            }
            .login-btn {
                width: 100%;
                background: linear-gradient(45deg, #00ffff, #0080ff);
                border: none;
                padding: 15px;
                border-radius: 10px;
                color: white;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            .login-btn:hover {
                transform: translateY(-2px);
            }
            .error {
                color: #ff6b6b;
                text-align: center;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="login-container">
            <form method="post" class="login-form">
                <h2>Portfolio Admin</h2>
                <?php if (isset($error)): ?>
                    <div class="error"><?php echo $error; ?></div>
                <?php endif; ?>
                <div class="form-group">
                    <input type="text" name="username" placeholder="Username" required>
                </div>
                <div class="form-group">
                    <input type="password" name="password" placeholder="Password" required>
                </div>
                <button type="submit" name="login" class="login-btn">Login</button>
            </form>
        </div>
    </body>
    </html>
    <?php
    exit;
}

// Handle form submissions
if ($_POST) {
    if (isset($_POST['add_project'])) {
        $stmt = $pdo->prepare("INSERT INTO projects (title, description, category, client, year, tools, images) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $tools = json_encode($_POST['tools'] ? explode(',', $_POST['tools']) : []);
        $images = [];
        
        // Handle file uploads
        if (isset($_FILES['images'])) {
            foreach ($_FILES['images']['name'] as $key => $name) {
                if ($_FILES['images']['error'][$key] === UPLOAD_ERR_OK) {
                    $upload_dir = '../projects/project-' . uniqid() . '/images/';
                    if (!is_dir($upload_dir)) {
                        mkdir($upload_dir, 0777, true);
                    }
                    $filename = $upload_dir . basename($name);
                    if (move_uploaded_file($_FILES['images']['tmp_name'][$key], $filename)) {
                        $images[] = $filename;
                    }
                }
            }
        }
        
        $stmt->execute([
            $_POST['title'],
            $_POST['description'],
            $_POST['category'],
            $_POST['client'],
            $_POST['year'],
            $tools,
            json_encode($images)
        ]);
        $success = 'Project added successfully!';
    }
    
    if (isset($_POST['update_content'])) {
        $stmt = $pdo->prepare("INSERT OR REPLACE INTO content (section, title, content) VALUES (?, ?, ?)");
        $stmt->execute([$_POST['section'], $_POST['title'], $_POST['content']]);
        $success = 'Content updated successfully!';
    }
}

// Fetch existing projects
$projects = $pdo->query("SELECT * FROM projects ORDER BY created_at DESC")->fetchAll();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Portfolio Admin Dashboard</title>
    <link href="../style.css" rel="stylesheet">
    <style>
        .admin-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #0a0a0a;
            min-height: 100vh;
            color: white;
        }
        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(0,255,255,0.2);
        }
        .admin-title {
            color: #00ffff;
            font-size: 2rem;
            margin: 0;
        }
        .logout-btn {
            background: #ff6b6b;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            transition: background 0.3s ease;
        }
        .logout-btn:hover {
            background: #ff5252;
        }
        .admin-tabs {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .tab-btn {
            background: none;
            border: none;
            color: #cccccc;
            padding: 15px 20px;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.3s ease;
        }
        .tab-btn.active {
            color: #00ffff;
            border-bottom-color: #00ffff;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
        .admin-form {
            background: rgba(255,255,255,0.05);
            padding: 30px;
            border-radius: 15px;
            border: 1px solid rgba(0,255,255,0.1);
            margin-bottom: 30px;
        }
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            color: #00ffff;
            margin-bottom: 8px;
            font-weight: 600;
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 12px 15px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(0,255,255,0.2);
            border-radius: 8px;
            color: white;
            font-family: inherit;
        }
        .form-group input::placeholder,
        .form-group textarea::placeholder {
            color: rgba(255,255,255,0.6);
        }
        .form-group textarea {
            resize: vertical;
            min-height: 120px;
        }
        .admin-btn {
            background: linear-gradient(45deg, #00ffff, #0080ff);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.3s ease;
        }
        .admin-btn:hover {
            transform: translateY(-2px);
        }
        .projects-grid {
            display: grid;
            gap: 20px;
        }
        .project-card {
            background: rgba(255,255,255,0.05);
            padding: 20px;
            border-radius: 10px;
            border: 1px solid rgba(0,255,255,0.1);
        }
        .project-card h3 {
            color: #00ffff;
            margin-bottom: 10px;
        }
        .project-meta {
            display: flex;
            gap: 20px;
            margin-bottom: 10px;
            font-size: 0.9rem;
            color: #cccccc;
        }
        .success {
            background: rgba(76, 175, 80, 0.2);
            color: #4caf50;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid rgba(76, 175, 80, 0.3);
        }
        .preview-link {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #00ffff;
            color: #000;
            padding: 10px 20px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            z-index: 1000;
        }
    </style>
</head>
<body>
    <a href="../index.html" target="_blank" class="preview-link">View Site</a>
    
    <div class="admin-container">
        <div class="admin-header">
            <h1 class="admin-title">Portfolio Admin Dashboard</h1>
            <a href="?logout=1" class="logout-btn">Logout</a>
        </div>

        <?php if (isset($success)): ?>
            <div class="success"><?php echo $success; ?></div>
        <?php endif; ?>

        <div class="admin-tabs">
            <button class="tab-btn active" onclick="showTab('projects')">Projects</button>
            <button class="tab-btn" onclick="showTab('content')">Content</button>
            <button class="tab-btn" onclick="showTab('settings')">Settings</button>
        </div>

        <div id="projects" class="tab-content active">
            <div class="admin-form">
                <h3 style="color: #00ffff; margin-bottom: 20px;">Add New Project</h3>
                <form method="post" enctype="multipart/form-data">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Project Title</label>
                            <input type="text" name="title" required>
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select name="category" required>
                                <option value="branding">Branding</option>
                                <option value="poster">Poster Design</option>
                                <option value="digital-art">Digital Art</option>
                                <option value="social-media">Social Media</option>
                                <option value="print">Print Design</option>
                                <option value="ui-ux">UI/UX Design</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Client</label>
                            <input type="text" name="client">
                        </div>
                        <div class="form-group">
                            <label>Year</label>
                            <input type="text" name="year" value="2024">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea name="description" placeholder="Describe your project..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Tools Used (comma separated)</label>
                        <input type="text" name="tools" placeholder="Adobe Photoshop, Illustrator, InDesign">
                    </div>
                    <div class="form-group">
                        <label>Project Images</label>
                        <input type="file" name="images[]" multiple accept="image/*">
                    </div>
                    <button type="submit" name="add_project" class="admin-btn">Add Project</button>
                </form>
            </div>

            <div class="projects-grid">
                <h3 style="color: #00ffff;">Existing Projects</h3>
                <?php foreach ($projects as $project): ?>
                    <div class="project-card">
                        <h3><?php echo htmlspecialchars($project['title']); ?></h3>
                        <div class="project-meta">
                            <span>Category: <?php echo htmlspecialchars($project['category']); ?></span>
                            <span>Client: <?php echo htmlspecialchars($project['client']); ?></span>
                            <span>Year: <?php echo htmlspecialchars($project['year']); ?></span>
                        </div>
                        <p><?php echo htmlspecialchars(substr($project['description'], 0, 150)); ?>...</p>
                        <button class="admin-btn" onclick="editProject(<?php echo $project['id']; ?>)">Edit</button>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <div id="content" class="tab-content">
            <div class="admin-form">
                <h3 style="color: #00ffff; margin-bottom: 20px;">Edit Site Content</h3>
                <form method="post">
                    <div class="form-group">
                        <label>Section</label>
                        <select name="section" required>
                            <option value="hero">Hero Section</option>
                            <option value="about">About Section</option>
                            <option value="services">Services</option>
                            <option value="contact">Contact Info</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" name="title">
                    </div>
                    <div class="form-group">
                        <label>Content</label>
                        <textarea name="content" rows="6"></textarea>
                    </div>
                    <button type="submit" name="update_content" class="admin-btn">Update Content</button>
                </form>
            </div>
        </div>

        <div id="settings" class="tab-content">
            <div class="admin-form">
                <h3 style="color: #00ffff; margin-bottom: 20px;">Site Settings</h3>
                <div class="form-group">
                    <label>Site Title</label>
                    <input type="text" value="Unes Visuals - Creative Graphic Designer">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" value="spondonrebeiro79@gmail.com">
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" value="+(880) 1638521639">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" value="Dhaka, Bangladesh-1340">
                </div>
                <button class="admin-btn">Save Settings</button>
            </div>
        </div>
    </div>

    <script>
        function showTab(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            
            // Add active class to clicked tab
            event.target.classList.add('active');
        }

        function editProject(id) {
            // Add edit functionality here
            alert('Edit functionality will be implemented');
        }
    </script>
</body>
</html>
