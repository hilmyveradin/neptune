/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import type { BooksDataTypes } from '~/customHooks/types';
import { firestore } from '~/lib/utils/firebaseClient';

const useDashboardBooks = (userID: string) => {
  const [receiveBooks, setReceiveBooks] = useState<BooksDataTypes[]>([]);
  const [donateBooks, setDonateBooks] = useState<BooksDataTypes[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestSnapshot = await firestore
          .collection('BookRequests')
          .where('userID', '==', userID)
          .get();

        const receiveBooksArray = requestSnapshot.docs.map((doc) => {
          return { ...doc.data() } as BooksDataTypes;
        });

        const donateSnapshot = await firestore
          .collection('BookDonations')
          .where('userID', '==', userID)
          .get();

        const donateBooksArray = donateSnapshot.docs.map((doc) => {
          return { ...doc.data() } as BooksDataTypes;
        });

        setReceiveBooks(receiveBooksArray);
        setDonateBooks(donateBooksArray);
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [userID]);

  return { receiveBooks, loading, donateBooks };
};

export default useDashboardBooks;
