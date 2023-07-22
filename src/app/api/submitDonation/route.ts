import { NextResponse } from 'next/server';

import type { BooksDataTypes } from '~/customHooks/types';
import { firestore } from '~/lib/utils/firebaseClient';

export async function POST(request: Request) {
  const data: BooksDataTypes = await request.json();

  try {
    await firestore.collection('BookDonations').add(data);
    return NextResponse.json({ success: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}
