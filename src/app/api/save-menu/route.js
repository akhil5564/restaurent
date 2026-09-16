import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'menuData.js');
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const start = fileContent.indexOf('{');
      const end = fileContent.lastIndexOf('}');
      if (start !== -1 && end !== -1) {
        const jsonStr = fileContent.substring(start, end + 1);
        const menuData = JSON.parse(jsonStr);
        return NextResponse.json({ success: true, menuData });
      }
    }
  } catch (err) {
    console.error('GET menu error:', err);
  }
  return NextResponse.json({ success: false, error: 'Could not read menu file' }, { status: 500 });
}

export async function POST(request) {
  try {
    const { menuData } = await request.json();
    if (!menuData) {
      return NextResponse.json({ success: false, error: 'No menuData provided' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'menuData.js');
    const tempPath = path.join(process.cwd(), 'src', 'data', 'menuData.js.tmp');
    const content = 'export const menuData = ' + JSON.stringify(menuData, null, 2) + ';\n';
    
    try {
      // Atomic write: write to temp file first then atomic rename to avoid race conditions
      fs.writeFileSync(tempPath, content, 'utf8');
      fs.renameSync(tempPath, filePath);
      return NextResponse.json({ success: true, isReadOnly: false, message: 'menuData.js updated successfully!' });
    } catch (fsError) {
      try {
        fs.writeFileSync(filePath, content, 'utf8');
        return NextResponse.json({ success: true, isReadOnly: false, message: 'menuData.js updated successfully!' });
      } catch (err2) {
        if (err2.code === 'EROFS' || (err2.message && err2.message.includes('read-only'))) {
          return NextResponse.json({ 
            success: true, 
            isReadOnly: true, 
            message: 'Menu updated in active session (Read-only cloud environment)' 
          });
        }
        throw err2;
      }
    }
  } catch (error) {
    console.error('Error saving menuData:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
