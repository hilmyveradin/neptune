/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import type { BooksDataTypes } from '~/customHooks/types';
import { firestore } from '~/lib/utils/firebaseClient';

const useDonateBooks = (userID: string) => {
  const [donateBooks, setDonateBooks] = useState<BooksDataTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore
          .collection('BookDonations')
          .where('userID', '!=', userID)
          .get();

        const booksArray = snapshot.docs.map((doc) => {
          return { ...doc.data() } as BooksDataTypes;
        });

        setDonateBooks(booksArray);
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [userID]);

  return { donateBooks, loading };
};

export default useDonateBooks;
