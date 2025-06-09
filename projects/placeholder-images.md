
# Adding Your Real Project Images

To replace the placeholder images with your actual work:

## Directory Structure
Create folders for each project:
```
projects/
├── project-1/
│   ├── images/
│   │   ├── main.jpg
│   │   ├── logo-variations.jpg
│   │   ├── brand-colors.jpg
│   │   └── business-cards.jpg
│   └── info.json
├── project-2/
│   ├── images/
│   │   ├── main-poster.jpg
│   │   ├── social-media-variants.jpg
│   │   ├── print-materials.jpg
│   │   └── mockups.jpg
│   └── info.json
└── project-3/
    ├── images/
    │   ├── final-artwork.jpg
    │   ├── process-sketches.jpg
    │   ├── color-studies.jpg
    │   └── details.jpg
    └── info.json
```

## Steps to Add Your Images:

1. **Upload your images** to the respective project folders
2. **Update the JavaScript** in `script.js` to use local image paths instead of placeholder URLs
3. **Modify the info.json files** to match your actual project details

## Image Recommendations:
- **Format**: JPG or PNG
- **Size**: 1200x800px or similar aspect ratio
- **Quality**: High resolution for main images, optimized for web
- **Naming**: Use descriptive names (main.jpg, details.jpg, etc.)

## Example Update:
In `script.js`, change:
```javascript
images: [
    'https://via.placeholder.com/800x600/00ffff/ffffff?text=Brand+Logo',
    // ... other placeholder URLs
]
```

To:
```javascript
images: [
    'projects/project-1/images/main.jpg',
    'projects/project-1/images/logo-variations.jpg',
    'projects/project-1/images/brand-colors.jpg',
    'projects/project-1/images/business-cards.jpg'
]
```
