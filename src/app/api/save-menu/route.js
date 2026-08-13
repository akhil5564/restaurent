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
    
    fs.writeFileSync(filePath, content, 'utf8');
    return NextResponse.json({ success: true, message: 'menuData.js updated successfully!' });
  } catch (error) {
    console.error('Error saving menuData:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
