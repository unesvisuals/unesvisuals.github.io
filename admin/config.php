
<?php
// Database configuration
$db_config = [
    'host' => 'localhost',
    'dbname' => 'portfolio_cms',
    'username' => 'root',
    'password' => ''
];

// Admin credentials
$admin_credentials = [
    'username' => 'admin',
    'password' => password_hash('your_admin_password', PASSWORD_DEFAULT)
];

// Create database connection
try {
    $pdo = new PDO(
        "mysql:host={$db_config['host']};dbname={$db_config['dbname']}", 
        $db_config['username'], 
        $db_config['password']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // Fallback to SQLite for Replit
    try {
        $pdo = new PDO('sqlite:portfolio.db');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Create tables if they don't exist
        $pdo->exec("CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            category TEXT,
            client TEXT,
            year TEXT,
            tools TEXT,
            images TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
        
        $pdo->exec("CREATE TABLE IF NOT EXISTS content (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            section TEXT NOT NULL,
            title TEXT,
            content TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
        
    } catch(PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
}
?>
