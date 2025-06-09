
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../admin/config.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single project
            $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            $project = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($project) {
                $project['tools'] = json_decode($project['tools'], true);
                $project['images'] = json_decode($project['images'], true);
                echo json_encode($project);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Project not found']);
            }
        } else {
            // Get all projects
            $projects = $pdo->query("SELECT * FROM projects ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($projects as &$project) {
                $project['tools'] = json_decode($project['tools'], true);
                $project['images'] = json_decode($project['images'], true);
            }
            
            echo json_encode($projects);
        }
        break;
        
    case 'POST':
        // Add new project (for API usage)
        $data = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $pdo->prepare("INSERT INTO projects (title, description, category, client, year, tools, images) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['title'],
            $data['description'],
            $data['category'],
            $data['client'],
            $data['year'],
            json_encode($data['tools']),
            json_encode($data['images'])
        ]);
        
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>
