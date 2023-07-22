import { NextResponse } from 'next/server';

import type { BooksDataTypes } from '~/customHooks/types';
import { firestore } from '~/lib/utils/firebaseClient';
/*
  title: string;
  description: string;
  image: string | null;
  contact: string;
*/

export async function POST(request: Request) {
  const data: BooksDataTypes = await request.json();

  // const { title, description, image, contact } = data;

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const bookData: { [key: string]: any } = {
  //   title,
  //   description,
  //   contact,
  //   image
  // };

  // if (image !== null) {
  //   bookData.image = image;
  // }

  try {
    await firestore.collection('BookDonations').add(data);
    return NextResponse.json({ success: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { error } }, { status: 500 });
  }
}
