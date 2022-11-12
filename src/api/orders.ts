import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { Cart } from '../components/ProductProvider';
import { db } from '../firebase';

export interface Order {
  cart: Cart[];
  uid: string;
  name: string | null;
  email: string | null;
  totalPrice: number;
  createdAt: Timestamp;
}

export async function setOrder(
  user: User,
  cart: Cart[],
  totalPrice: number,
  callback?: () => void,
) {
  const order: Order = {
    cart,
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    totalPrice,
    createdAt: Timestamp.now(),
  };
  try {
    const dbRef = collection(db, 'orders');
    await addDoc(dbRef, order);
    alert('購買完成');
    callback && callback();
  } catch (error) {
    console.log(error);
  }
}

export async function getOrders(uid: string) {
  const dbRef = collection(db, 'orders');
  const queryResult = query(dbRef, where('uid', '==', uid));
  const ordersRef = await getDocs(queryResult);
  const orders: Order[] = ordersRef.docs.map((item) => ({
    ...(item.data() as Order),
    docId: item.id,
  }));
  return orders;
}
