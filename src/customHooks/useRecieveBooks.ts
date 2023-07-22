/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import type { BooksDataTypes } from '~/customHooks/types';
import { firestore } from '~/lib/utils/firebaseClient';

const useReceiveBooks = () => {
  const [receiveBooks, setReceiveBooks] = useState<BooksDataTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore.collection('BookRequests').get();

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
  }, []);

  return { receiveBooks, loading };
};

export default useReceiveBooks;
