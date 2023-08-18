import React from 'react'
import styles from "./Checkout.module.css";
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import {getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import db from '../../../db/Firebase-Config';


const Checkout = () => {
const {cart, sumTotalCart}=useContext(CartContext);


    const createOrder=async()=>{
      
        const orderCollection=collection(db,"orders");
        const orderCreated=await addDoc(orderCollection,order);
        return {id:orderCreated.id}
  }

  const onHandleOrder=async()=>{
    const newOrder= {
      buyer:{
        name:"Maria Perez",
        email: "mariaperez@gmail.com",
        phone: "12345678"
      },

      items: cart.map((product)=>{
        <div key={product.id}>
          <h3>{product.title}</h3>
          <h3>{product.quantity}</h3>
          <h3>{product.price}</h3>

        </div>
      }),
      date: serverTimestamp,
      total: sumTotalCart,
    }
const order=await createOrder(newOrder)


  return (
    <div className={styles.checkoutContainer}>
      <h1>Checkout</h1>
      <form className={styles.checkoutForm}>
        <input className={styles.inputName}
        placeholder='Name'
        id='name'
        name='name'
        required={true}
        label='Name'
        
        
        />
        <input className={styles.inputPhone}
        placeholder='Phone Number'
        id='phone'
        name='phone'
        required={true}
        label='Phone'

        
        />
        <input className={styles.inputemail}
        placeholder='Email address'
        id='email'
        name='email'
        required={true}
        label='Email'
        
        />    
      </form>

      <button onClick={onHandleOrder}>Submitt</button>
    </div>
  )
}
}
export default Checkout;