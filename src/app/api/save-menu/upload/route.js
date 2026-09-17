import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BACKEND_URL = process.env.BACKEND_URL || 'https://kanary-backend.onrender.com';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No image file provided' }, { status: 400 });
    }

    // 1. Try forwarding to backend Express server first
    try {
      const backendFormData = new FormData();
      backendFormData.append('image', file);

      const backendRes = await fetch(`${BACKEND_URL}/api/menu/upload`, {
        method: 'POST',
        body: backendFormData,
      });

      if (backendRes.ok) {
        const backendData = await backendRes.json();
        if (backendData.success) {
          return NextResponse.json(backendData);
        }
      }
    } catch (err) {
      console.warn('Backend upload server unreachable, using local public upload:', err.message);
    }

    // 2. Fallback: Save file to public/uploads locally
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.name || 'image.jpg') || '.jpg';
    const cleanName = path.basename(file.name || 'dish', ext).replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `dish_${Date.now()}_${cleanName}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    const imagePath = `/uploads/${filename}`;
    return NextResponse.json({
      success: true,
      imagePath: imagePath,
      filename: filename,
      message: 'Image uploaded locally to public/uploads',
    });
  } catch (error) {
    console.error('Upload route error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
