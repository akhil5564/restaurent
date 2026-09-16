import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { menuData } = await request.json();
    if (!menuData) {
      return NextResponse.json({ success: false, error: 'No menuData provided' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'menuData.js');
    const content = 'export const menuData = ' + JSON.stringify(menuData, null, 2) + ';\n';
    
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      return NextResponse.json({ success: true, isReadOnly: false, message: 'menuData.js updated successfully!' });
    } catch (fsError) {
      // If deployed on read-only serverless environments (e.g., Vercel / DigitalOcean / AWS Lambda)
      if (fsError.code === 'EROFS' || (fsError.message && fsError.message.includes('read-only'))) {
        return NextResponse.json({ 
          success: true, 
          isReadOnly: true, 
          message: 'Menu updated in active session (Read-only cloud environment)' 
        });
      }
      throw fsError;
    }
  } catch (error) {
    console.error('Error saving menuData:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
