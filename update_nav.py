import os
import glob

# Find all html files
html_files = glob.glob('*.html')

link_to_add = '            <a href="why-promethee.html" class="nav-link" data-i18n="header.why">Pourquoi Promethee</a>\n        </nav>'

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already added
    if 'why-promethee.html' not in content or file_path == 'why-promethee.html':
        if 'why-promethee.html' not in content:
            # Insert before closing nav tag
            content = content.replace('        </nav>', link_to_add)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {file_path}")
    else:
        print(f"Skipped {file_path} (already updated)")
