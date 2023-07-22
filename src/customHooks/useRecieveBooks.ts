/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import type { BooksDataTypes } from '~/customHooks/types';
import { firestore } from '~/lib/utils/firebaseClient';

const useReceiveBooks = (userID: string) => {
  const [receiveBooks, setReceiveBooks] = useState<BooksDataTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore
          .collection('BookRequests')
          .where('userID', '!=', userID)
          .get();

        const booksArray = snapshot.docs.map((doc) => {
          return { ...doc.data() } as BooksDataTypes;
        });

        setReceiveBooks(booksArray);
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [userID]);

  return { receiveBooks, loading };
};

export default useReceiveBooks;
