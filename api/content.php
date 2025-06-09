
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../admin/config.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['section'])) {
            // Get content for specific section
            $stmt = $pdo->prepare("SELECT * FROM content WHERE section = ?");
            $stmt->execute([$_GET['section']]);
            $content = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($content) {
                echo json_encode($content);
            } else {
                echo json_encode(['section' => $_GET['section'], 'title' => '', 'content' => '']);
            }
        } else {
            // Get all content
            $content = $pdo->query("SELECT * FROM content")->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($content);
        }
        break;
        
    case 'POST':
        // Update content
        $data = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $pdo->prepare("INSERT OR REPLACE INTO content (section, title, content) VALUES (?, ?, ?)");
        $stmt->execute([
            $data['section'],
            $data['title'],
            $data['content']
        ]);
        
        echo json_encode(['success' => true]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>
