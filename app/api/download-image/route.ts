import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
  }

  try {
    // Optional: Add a more specific validation for the S3 URL if needed
    if (!imageUrl.startsWith('https://sdbooth2-production.s3.amazonaws.com/')) {
        console.warn(`[Proxy] Attempt to access non-S3 URL: ${imageUrl}`);
        return NextResponse.json({ error: 'Invalid image URL provided' }, { status: 400 });
    }

    console.log(`[Proxy] Fetching image from S3: ${imageUrl}`);
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      console.error(`[Proxy] Failed to fetch image from S3. Status: ${imageResponse.status}, URL: ${imageUrl}`);
      return NextResponse.json(
        { error: `Failed to fetch image from S3: ${imageResponse.statusText}` },
        { status: imageResponse.status }
      );
    }

    const imageBlob = await imageResponse.blob();
    
    const headers = new Headers();
    headers.set('Content-Type', imageBlob.type || 'application/octet-stream');
    // If you want to suggest a filename to the browser when the image is directly opened (not strictly necessary for zipping)
    // const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1) || 'downloaded-image';
    // headers.set('Content-Disposition', `inline; filename="${filename}"`);

    console.log(`[Proxy] Successfully fetched image. Type: ${imageBlob.type}, Size: ${imageBlob.size}`);
    return new NextResponse(imageBlob, { status: 200, headers });

  } catch (error) {
    console.error('[Proxy] Error proxying image:', error);
    return NextResponse.json({ error: 'Internal server error while fetching image' }, { status: 500 });
  }
}