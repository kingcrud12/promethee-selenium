import os
import glob

# Find all html files
html_files = glob.glob('*.html')

script_to_inject = """    <script>
        (function() {
            var savedTheme = localStorage.getItem('promethee-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
            if (savedTheme === 'light') {
                document.documentElement.classList.add('light-theme');
            }
        })();
    </script>
</head>"""

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "localStorage.getItem('promethee-theme')" not in content[:content.find('</head>')]:
        content = content.replace('</head>', script_to_inject)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")
    else:
        print(f"Skipped {file_path} (already updated)")
